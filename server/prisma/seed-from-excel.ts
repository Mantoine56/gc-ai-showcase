import { PrismaClient, PrimaryUsers, DevelopedBy, ProjectStatus, ModerationState } from '../generated/prisma';
import XLSX from 'xlsx';
import path from 'path';

const prisma = new PrismaClient();

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
  console.log('🌱 Starting Excel import...');

  // Clear existing data
  await prisma.auditLog.deleteMany();
  await prisma.codeRequest.deleteMany();
  await prisma.project.deleteMany();
  await prisma.organization.deleteMany();
  await prisma.user.deleteMany();

  console.log('✅ Cleared existing data');

  // Read Excel file
  const excelPath = path.join(process.cwd(), 'data.xlsx');
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
  const errors: Array<{ row: number; error: string }> = [];

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

      await prisma.project.create({
        data: {
          name: projectName.substring(0, 200), // Ensure it fits
          organizationId: orgId,
          description: cleanValue(row['Purpose of AI system ']) || 'No description provided',
          primaryUsers: mapPrimaryUsers(row['AI system primary users']),
          developedBy,
          vendorName: developedBy === DevelopedBy.Vendor ? vendorName : undefined,
          status: mapStatus(row['AI system status']),
          statusYear: row['Status date '] ? parseInt(String(row['Status date '])) : undefined,
          capabilities: cleanValue(row['AI system capabilities']),
          isAutomatedDecisionSystem: parseBoolean(row['Automated decision system']),
          openGovAiaId: cleanValue(row['Algorithmic Impact Assessment']),
          dataSources: cleanValue(row['Data sources']),
          involvesPersonalInfo: parseBoolean(row['Involves personal information']),
          personalInformationBanks: cleanValue(row['Personal Information Banks']),
          hasUserNotification: parseBoolean(row['Notification of AI']),
          atipRequestRefs: cleanValue(row['Access to Information request']),
          outcomes: cleanValue(row['AI system results']),
          serviceInventoryId: cleanValue(row['Service Inventory ID ']),
          moderationState: ModerationState.Published,
          featured: false,
        },
      });

      imported++;
      if (imported % 50 === 0) {
        console.log(`  Imported ${imported} projects...`);
      }
    } catch (error) {
      errors.push({ row: i + 2, error: String(error) });
      skipped++;
    }
  }

  console.log(`\n✅ Import completed!`);
  console.log(`
    Summary:
    - ${orgMap.size} organizations created
    - ${imported} projects imported
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
}

main()
  .catch((e) => {
    console.error('❌ Error importing from Excel:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
