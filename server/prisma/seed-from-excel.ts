import { PrismaClient, PrimaryUsers, DevelopedBy, ProjectStatus, ModerationState, ContactRole } from '../generated/prisma';
import XLSX from 'xlsx';
import path from 'path';
import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from parent directory
config({ path: resolve(__dirname, '../../.env') });

const prisma = new PrismaClient();

// Sample names for generating contacts
const firstNames = ['Sarah', 'Michael', 'Jennifer', 'David', 'Lisa', 'James', 'Emily', 'Robert', 'Amanda', 'Christopher', 'Marie', 'Daniel', 'Michelle', 'Matthew', 'Jessica', 'Andrew', 'Stephanie', 'William', 'Laura', 'Thomas'];
const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Tremblay', 'Gagnon', 'Roy', 'Côté', 'Bouchard', 'Gauthier', 'Morin', 'Lavoie', 'Fortin', 'Gagné'];
const titles = [
  'Product Manager',
  'Senior Developer',
  'Lead Data Scientist',
  'AI Research Lead',
  'Director of Innovation',
  'Technical Lead',
  'ML Engineering Lead',
  'Senior Policy Analyst',
  'Chief Technology Officer',
  'Program Manager',
  'Solution Architect',
  'Business Analyst',
  'Senior Researcher'
];

// Generate a random contact person
function generateContact(orgName: string, role: ContactRole): any {
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  const title = titles[Math.floor(Math.random() * titles.length)];

  // Create email-friendly org name
  const orgSlug = orgName
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 20);

  const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${orgSlug}.gc.ca`;

  // Randomly decide if this contact has a phone (60% chance)
  const hasPhone = Math.random() > 0.4;
  const phone = hasPhone ? `613-555-${Math.floor(1000 + Math.random() * 9000)}` : undefined;

  return {
    name: `${firstName} ${lastName}`,
    email,
    role,
    title,
    phone,
  };
}

// Map Excel values to our enum values
function mapPrimaryUsers(value: string): PrimaryUsers {
  const normalized = value?.toLowerCase().trim();
  if (normalized?.includes('employee')) return PrimaryUsers.Employees;
  if (normalized?.includes('public')) return PrimaryUsers.MembersOfPublic;
  if (normalized?.includes('both')) return PrimaryUsers.Both;
  return PrimaryUsers.Neither;
}

function mapDevelopedBy(value: string): DevelopedBy {
  const normalized = value?.toLowerCase().trim();
  if (normalized?.includes('government') || normalized?.includes('gc')) return DevelopedBy.Government;
  if (normalized?.includes('vendor')) return DevelopedBy.Vendor;
  return DevelopedBy.Other;
}

function mapStatus(value: string): ProjectStatus {
  const normalized = value?.toLowerCase().trim();
  if (normalized?.includes('production')) return ProjectStatus.InProduction;
  if (normalized?.includes('development') || normalized?.includes('pilot')) return ProjectStatus.InDevelopment;
  if (normalized?.includes('retire')) return ProjectStatus.Retired;
  return ProjectStatus.InDevelopment;
}

function cleanValue(value: any): string | undefined {
  if (!value) return undefined;
  const str = String(value).trim();
  if (str.toLowerCase() === 'not applicable' || str.toLowerCase() === 'n/a' || str === '') {
    return undefined;
  }
  return str;
}

function parseBoolean(value: any): boolean {
  const normalized = String(value || '').toLowerCase().trim();
  return normalized === 'yes' || normalized === 'true' || normalized === '1';
}

async function main() {
  console.log('🌱 Starting Excel import with contact generation...');

  // Clear existing data
  await prisma.auditLog.deleteMany();
  await prisma.projectContact.deleteMany();
  await prisma.codeRequest.deleteMany();
  await prisma.project.deleteMany();
  await prisma.organization.deleteMany();
  await prisma.user.deleteMany();

  console.log('✅ Cleared existing data');

  // Read Excel file
  const excelPath = path.join(process.cwd(), '..', 'data.xlsx');
  console.log(`📖 Reading Excel file: ${excelPath}`);

  const workbook = XLSX.readFile(excelPath);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const data = XLSX.utils.sheet_to_json(worksheet);

  console.log(`📊 Found ${data.length} rows in Excel`);

  // Extract unique organizations
  const orgNames = new Set<string>();
  data.forEach((row: any) => {
    const orgName = row['Government organization'];
    if (orgName && orgName.trim() && orgName !== 'Government organization') {
      orgNames.add(orgName.trim());
    }
  });

  console.log(`🏢 Found ${orgNames.size} unique organizations`);

  // Create organizations
  const orgMap = new Map<string, string>();
  for (const orgName of Array.from(orgNames).sort()) {
    const org = await prisma.organization.create({
      data: {
        nameEN: orgName,
        nameFR: orgName, // We'll use same name for both for now
        acronym: orgName.split(' ').map(w => w[0]).join('').substring(0, 10).toUpperCase(),
        url: 'https://www.canada.ca',
      },
    });
    orgMap.set(orgName, org.id);
    console.log(`  ✓ Created: ${orgName}`);
  }

  console.log(`✅ Created ${orgMap.size} organizations`);

  // Import projects
  let imported = 0;
  let skipped = 0;
  let contactsCreated = 0;
  let featuredCount = 0;
  const errors: Array<{ row: number; error: string }> = [];
  const productionProjects: string[] = [];
  const eligibleForOpenSource: string[] = [];

  for (let i = 0; i < data.length; i++) {
    const row: any = data[i];

    // Skip header row or empty rows
    const projectName = row['Name of AI system '];
    if (!projectName || projectName.includes('Max 50 characters') || projectName.trim() === '') {
      skipped++;
      continue;
    }

    const orgName = row['Government organization'];
    const orgId = orgMap.get(orgName?.trim());

    if (!orgId) {
      errors.push({ row: i + 2, error: `Organization not found: ${orgName}` });
      skipped++;
      continue;
    }

    try {
      const vendorName = cleanValue(row['Vendor name ']);
      const developedBy = mapDevelopedBy(row['Developed by']);
      const status = mapStatus(row['AI system status']);
      const description = cleanValue(row['Purpose of AI system ']) || 'No description provided';

      const project = await prisma.project.create({
        data: {
          nameEN: projectName.substring(0, 200),
          nameFR: projectName.substring(0, 200), // Use same for now
          organizationId: orgId,
          descriptionEN: description.substring(0, 1000),
          descriptionFR: description.substring(0, 1000), // Use same for now
          primaryUsers: mapPrimaryUsers(row['AI system primary users']),
          developedBy,
          vendorName: developedBy === DevelopedBy.Vendor ? vendorName : undefined,
          status,
          statusYear: row['Status date '] ? parseInt(String(row['Status date '])) : undefined,
          capabilitiesEN: cleanValue(row['AI system capabilities'])?.substring(0, 300),
          capabilitiesFR: cleanValue(row['AI system capabilities'])?.substring(0, 300),
          isAutomatedDecisionSystem: parseBoolean(row['Automated decision system']),
          openGovAiaId: cleanValue(row['Algorithmic Impact Assessment']),
          dataSourcesEN: cleanValue(row['Data sources']),
          dataSourcesFR: cleanValue(row['Data sources']),
          involvesPersonalInfo: parseBoolean(row['Involves personal information']),
          personalInformationBanksEN: cleanValue(row['Personal Information Banks']),
          personalInformationBanksFR: cleanValue(row['Personal Information Banks']),
          hasUserNotification: parseBoolean(row['Notification of AI']),
          atipRequestRefsEN: cleanValue(row['Access to Information request']),
          atipRequestRefsFR: cleanValue(row['Access to Information request']),
          outcomesEN: cleanValue(row['AI system results'])?.substring(0, 500),
          outcomesFR: cleanValue(row['AI system results'])?.substring(0, 500),
          serviceInventoryId: cleanValue(row['Service Inventory ID ']),
          moderationState: ModerationState.Published,
          featured: false, // Will update later
        },
      });

      // Track production projects for featuring later
      if (status === ProjectStatus.InProduction) {
        productionProjects.push(project.id);
      }

      // Track projects eligible for open source (government-developed, in production or development)
      if (
        developedBy === DevelopedBy.Government &&
        (status === ProjectStatus.InProduction || status === ProjectStatus.InDevelopment)
      ) {
        eligibleForOpenSource.push(project.id);
      }

      // Generate 1-3 contacts per project
      const numContacts = Math.floor(Math.random() * 3) + 1; // 1, 2, or 3 contacts
      const contactRoles: ContactRole[] = [ContactRole.Primary];

      if (numContacts >= 2) contactRoles.push(ContactRole.Technical);
      if (numContacts === 3) contactRoles.push(ContactRole.Business);

      for (const role of contactRoles) {
        await prisma.projectContact.create({
          data: {
            ...generateContact(orgName, role),
            projectId: project.id,
          },
        });
        contactsCreated++;
      }

      imported++;
      if (imported % 50 === 0) {
        console.log(`  Imported ${imported} projects with contacts...`);
      }
    } catch (error) {
      errors.push({ row: i + 2, error: String(error) });
      skipped++;
    }
  }

  // Mark 9 random production projects as featured
  const numToFeature = Math.min(9, productionProjects.length);
  if (numToFeature > 0) {
    // Shuffle and take first N
    const shuffled = productionProjects.sort(() => Math.random() - 0.5);
    const featured = shuffled.slice(0, numToFeature);

    for (const projectId of featured) {
      await prisma.project.update({
        where: { id: projectId },
        data: { featured: true },
      });
      featuredCount++;
    }
    console.log(`⭐ Marked ${featuredCount} production projects as featured`);
  }

  // Mark ~20 random eligible projects as open source with generated GitHub URLs
  let openSourceCount = 0;
  const numToMarkOpenSource = Math.min(20, eligibleForOpenSource.length);
  if (numToMarkOpenSource > 0) {
    // Generate some realistic GitHub organization names
    const githubOrgs = [
      'canada-ca',
      'cds-snc',
      'digital-canada',
      'gc-proto',
      'wet-boew',
      'federal-geospatial-platform',
      'open-data',
      'statcan',
      'tc-ca',
      'nrcan',
    ];

    // Shuffle and take first N
    const shuffled = eligibleForOpenSource.sort(() => Math.random() - 0.5);
    const openSource = shuffled.slice(0, numToMarkOpenSource);

    for (const projectId of openSource) {
      // Get the project to create a repo name
      const proj = await prisma.project.findUnique({ where: { id: projectId } });
      if (proj) {
        // Create a slug from the project name
        const repoName = proj.nameEN
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, '')
          .substring(0, 50);

        // Pick a random GitHub org
        const org = githubOrgs[Math.floor(Math.random() * githubOrgs.length)];
        const githubUrl = `https://github.com/${org}/${repoName}`;

        await prisma.project.update({
          where: { id: projectId },
          data: {
            isOpenSource: true,
            githubUrl,
          },
        });
        openSourceCount++;
      }
    }
    console.log(`🔓 Marked ${openSourceCount} projects as open source with GitHub URLs`);
  }

  console.log(`\n✅ Import completed!`);
  console.log(`
    Summary:
    - ${orgMap.size} organizations created
    - ${imported} projects imported
    - ${contactsCreated} contacts generated
    - ${featuredCount} projects marked as featured
    - ${openSourceCount} projects marked as open source
    - ${skipped} rows skipped
    - ${errors.length} errors
  `);

  if (errors.length > 0 && errors.length <= 10) {
    console.log('\n❌ Errors:');
    errors.forEach(e => console.log(`  Row ${e.row}: ${e.error}`));
  } else if (errors.length > 10) {
    console.log(`\n❌ ${errors.length} errors occurred (showing first 10):`);
    errors.slice(0, 10).forEach(e => console.log(`  Row ${e.row}: ${e.error}`));
  }

  console.log(`\n🎉 Database now contains:`);
  console.log(`   - ${await prisma.organization.count()} organizations`);
  console.log(`   - ${await prisma.project.count()} projects`);
  console.log(`   - ${await prisma.projectContact.count()} contacts`);
  console.log(`   - ${await prisma.project.count({ where: { featured: true } })} featured projects`);
  console.log(`   - ${await prisma.project.count({ where: { isOpenSource: true } })} open source projects`);
}

main()
  .catch((e) => {
    console.error('❌ Error importing from Excel:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
