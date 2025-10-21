import { PrismaClient, PrimaryUsers, DevelopedBy, ProjectStatus, ModerationState } from '../generated/prisma';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Clear existing data
  await prisma.auditLog.deleteMany();
  await prisma.codeRequest.deleteMany();
  await prisma.project.deleteMany();
  await prisma.organization.deleteMany();
  await prisma.user.deleteMany();

  console.log('✅ Cleared existing data');

  // Create Organizations
  const serviceCanada = await prisma.organization.create({
    data: {
      nameEN: 'Service Canada',
      nameFR: 'Service Canada',
      acronym: 'SC',
      url: 'https://www.canada.ca/en/employment-social-development/corporate/portfolio/service-canada.html',
    },
  });

  const cra = await prisma.organization.create({
    data: {
      nameEN: 'Canada Revenue Agency',
      nameFR: 'Agence du revenu du Canada',
      acronym: 'CRA',
      url: 'https://www.canada.ca/en/revenue-agency.html',
    },
  });

  const canadianHeritage = await prisma.organization.create({
    data: {
      nameEN: 'Canadian Heritage',
      nameFR: 'Patrimoine canadien',
      acronym: 'PCH',
      url: 'https://www.canada.ca/en/canadian-heritage.html',
    },
  });

  const publicSafety = await prisma.organization.create({
    data: {
      nameEN: 'Public Safety Canada',
      nameFR: 'Sécurité publique Canada',
      acronym: 'PS',
      url: 'https://www.publicsafety.gc.ca',
    },
  });

  const pco = await prisma.organization.create({
    data: {
      nameEN: 'Privy Council Office',
      nameFR: 'Bureau du Conseil privé',
      acronym: 'PCO',
      url: 'https://www.canada.ca/en/privy-council.html',
    },
  });

  const tbs = await prisma.organization.create({
    data: {
      nameEN: 'Treasury Board Secretariat',
      nameFR: 'Secrétariat du Conseil du Trésor',
      acronym: 'TBS',
      url: 'https://www.canada.ca/en/treasury-board-secretariat.html',
    },
  });

  console.log('✅ Created organizations');

  // Create Projects
  await prisma.project.create({
    data: {
      name: 'Citizen Service Chatbot',
      organizationId: serviceCanada.id,
      description: 'AI-powered chatbot helping citizens navigate government services and answer common questions about benefits, immigration, and taxes.',
      primaryUsers: PrimaryUsers.MembersOfPublic,
      developedBy: DevelopedBy.Government,
      status: ProjectStatus.InProduction,
      statusYear: 2024,
      capabilities: 'Natural Language Processing, Question Answering, Multi-language support (EN/FR)',
      isAutomatedDecisionSystem: false,
      openGovAiaId: 'AIA-2024-SC-001',
      dataSources: 'Government of Canada service catalogue, benefits information, immigration guidelines',
      involvesPersonalInfo: false,
      hasUserNotification: true,
      outcomes: 'Improved citizen service accessibility, reduced call center volume by 30%, available 24/7',
      moderationState: ModerationState.Published,
      featured: true,
    },
  });

  await prisma.project.create({
    data: {
      name: 'Document Intelligence System',
      organizationId: cra.id,
      description: 'Automated document classification and information extraction from tax forms and financial documents using computer vision.',
      primaryUsers: PrimaryUsers.Employees,
      developedBy: DevelopedBy.Vendor,
      vendorName: 'Tech Solutions Inc.',
      status: ProjectStatus.InProduction,
      statusYear: 2023,
      capabilities: 'Optical Character Recognition, Document Classification, Data Extraction, Form Processing',
      isAutomatedDecisionSystem: false,
      openGovAiaId: 'AIA-2023-CRA-045',
      dataSources: 'Tax forms (T1, T2, T4), receipts, financial statements',
      involvesPersonalInfo: true,
      personalInformationBanks: 'CRA PPU 005, CRA PPU 047',
      hasUserNotification: false,
      atipRequestRefs: 'A-2023-00156',
      outcomes: 'Processing time reduced by 60%, accuracy improved to 98.5%, cost savings of $2M annually',
      moderationState: ModerationState.Published,
      featured: true,
    },
  });

  await prisma.project.create({
    data: {
      name: 'Real-time Translation Service',
      organizationId: canadianHeritage.id,
      description: 'Real-time translation service supporting English and French for government communications and citizen interactions.',
      primaryUsers: PrimaryUsers.Both,
      developedBy: DevelopedBy.Government,
      status: ProjectStatus.InProduction,
      statusYear: 2024,
      capabilities: 'Neural Machine Translation, Real-time Translation API, Context-aware translation',
      isAutomatedDecisionSystem: false,
      openGovAiaId: 'Not applicable',
      dataSources: 'Government bilingual corpus, official translation memories, Canadian terminology databases',
      involvesPersonalInfo: false,
      hasUserNotification: false,
      outcomes: 'Enabled real-time bilingual communication, reduced translation costs by 40%',
      moderationState: ModerationState.Published,
      featured: false,
    },
  });

  await prisma.project.create({
    data: {
      name: 'Fraud Detection Engine',
      organizationId: publicSafety.id,
      description: 'Machine learning system for detecting fraudulent activities in government benefit applications and financial transactions.',
      primaryUsers: PrimaryUsers.Employees,
      developedBy: DevelopedBy.Government,
      status: ProjectStatus.InDevelopment,
      statusYear: 2024,
      capabilities: 'Anomaly Detection, Pattern Recognition, Risk Scoring, Real-time Monitoring',
      isAutomatedDecisionSystem: true,
      openGovAiaId: 'AIA-2024-PS-012',
      dataSources: 'Benefit application data, transaction records, historical fraud cases',
      involvesPersonalInfo: true,
      personalInformationBanks: 'PS PPU 023, PS PPU 056',
      hasUserNotification: true,
      atipRequestRefs: 'A-2024-00089',
      outcomes: 'Pilot phase: 85% fraud detection rate, 50% reduction in false positives',
      moderationState: ModerationState.Published,
      featured: true,
    },
  });

  await prisma.project.create({
    data: {
      name: 'Policy Impact Analyzer',
      organizationId: pco.id,
      description: 'AI tool for analyzing potential impacts of policy changes using historical data and predictive modeling.',
      primaryUsers: PrimaryUsers.Employees,
      developedBy: DevelopedBy.Other,
      status: ProjectStatus.InDevelopment,
      statusYear: 2023,
      capabilities: 'Predictive Analytics, Data Visualization, Scenario Modeling, Impact Assessment',
      isAutomatedDecisionSystem: false,
      openGovAiaId: 'AIA-2023-PCO-008',
      dataSources: 'Historical policy data, economic indicators, demographic statistics, government reports',
      involvesPersonalInfo: false,
      hasUserNotification: false,
      outcomes: 'Research phase: improved policy analysis accuracy, faster impact assessments',
      moderationState: ModerationState.Published,
      featured: false,
    },
  });

  await prisma.project.create({
    data: {
      name: 'Web Accessibility Validator',
      organizationId: tbs.id,
      description: 'Automated accessibility testing tool ensuring government websites meet WCAG 2.1 AA standards.',
      primaryUsers: PrimaryUsers.Employees,
      developedBy: DevelopedBy.Government,
      status: ProjectStatus.InProduction,
      statusYear: 2023,
      capabilities: 'Automated testing, WCAG compliance checking, accessibility reporting, remediation suggestions',
      isAutomatedDecisionSystem: false,
      openGovAiaId: 'Not applicable',
      dataSources: 'GC websites, WCAG guidelines, accessibility best practices',
      involvesPersonalInfo: false,
      hasUserNotification: false,
      outcomes: 'All TBS websites now WCAG 2.1 AA compliant, 95% automated testing coverage',
      moderationState: ModerationState.Published,
      featured: false,
    },
  });

  console.log('✅ Created projects');

  console.log('🎉 Database seeded successfully!');
  console.log(`
    Summary:
    - ${await prisma.organization.count()} organizations
    - ${await prisma.project.count()} projects
  `);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
