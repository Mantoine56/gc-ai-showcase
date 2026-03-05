"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../generated/prisma");
const dotenv_1 = require("dotenv");
const url_1 = require("url");
const path_1 = require("path");
// Get __dirname equivalent in ES modules
const __filename = (0, url_1.fileURLToPath)(import.meta.url);
const __dirname = (0, path_1.dirname)(__filename);
// Load environment variables from parent directory
(0, dotenv_1.config)({ path: (0, path_1.resolve)(__dirname, '../../.env') });
const prisma = new prisma_1.PrismaClient();
async function main() {
    console.log('🌱 Starting database seed...');
    // Clear existing data
    await prisma.auditLog.deleteMany();
    await prisma.projectContact.deleteMany();
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
    const wagec = await prisma.organization.create({
        data: {
            nameEN: 'Women and Gender Equality Canada',
            nameFR: 'Femmes et Égalité des genres Canada',
            acronym: 'WAGEC',
            url: 'https://women-gender-equality.canada.ca',
        },
    });
    console.log('✅ Created organizations');
    // Create Projects with Contacts
    await prisma.project.create({
        data: {
            nameEN: 'Citizen Service Chatbot',
            nameFR: 'Chatbot de services aux citoyens',
            organizationId: serviceCanada.id,
            descriptionEN: 'AI-powered chatbot helping citizens navigate government services and answer common questions about benefits, immigration, and taxes.',
            descriptionFR: 'Chatbot alimenté par IA aidant les citoyens à naviguer dans les services gouvernementaux et à répondre aux questions courantes sur les prestations, l\'immigration et les impôts.',
            primaryUsers: prisma_1.PrimaryUsers.MembersOfPublic,
            developedBy: prisma_1.DevelopedBy.Government,
            status: prisma_1.ProjectStatus.InProduction,
            statusYear: 2024,
            capabilitiesEN: 'Natural Language Processing, Question Answering, Multi-language support (EN/FR)',
            capabilitiesFR: 'Traitement du langage naturel, Réponses aux questions, Support multilingue (EN/FR)',
            isAutomatedDecisionSystem: false,
            openGovAiaId: 'AIA-2024-SC-001',
            dataSourcesEN: 'Government of Canada service catalogue, benefits information, immigration guidelines',
            dataSourcesFR: 'Catalogue des services du gouvernement du Canada, informations sur les prestations, directives d\'immigration',
            involvesPersonalInfo: false,
            hasUserNotification: true,
            outcomesEN: 'Improved citizen service accessibility, reduced call center volume by 30%, available 24/7',
            outcomesFR: 'Amélioration de l\'accessibilité des services aux citoyens, réduction du volume du centre d\'appels de 30%, disponible 24/7',
            moderationState: prisma_1.ModerationState.Published,
            featured: true,
            contacts: {
                create: [
                    {
                        name: 'Sarah Chen',
                        email: 'sarah.chen@servicecanada.gc.ca',
                        role: prisma_1.ContactRole.Primary,
                        title: 'Product Manager',
                        phone: '613-555-0101',
                    },
                    {
                        name: 'Marcus Johnson',
                        email: 'marcus.johnson@servicecanada.gc.ca',
                        role: prisma_1.ContactRole.Technical,
                        title: 'Lead AI Developer',
                    },
                ],
            },
        },
    });
    await prisma.project.create({
        data: {
            nameEN: 'Document Intelligence System',
            nameFR: 'Système d\'intelligence documentaire',
            organizationId: cra.id,
            descriptionEN: 'Automated document classification and information extraction from tax forms and financial documents using computer vision.',
            descriptionFR: 'Classification automatisée de documents et extraction d\'informations à partir de formulaires fiscaux et de documents financiers utilisant la vision par ordinateur.',
            primaryUsers: prisma_1.PrimaryUsers.Employees,
            developedBy: prisma_1.DevelopedBy.Vendor,
            vendorName: 'Tech Solutions Inc.',
            status: prisma_1.ProjectStatus.InProduction,
            statusYear: 2023,
            capabilitiesEN: 'Optical Character Recognition, Document Classification, Data Extraction, Form Processing',
            capabilitiesFR: 'Reconnaissance optique de caractères, Classification de documents, Extraction de données, Traitement de formulaires',
            isAutomatedDecisionSystem: false,
            openGovAiaId: 'AIA-2023-CRA-045',
            dataSourcesEN: 'Tax forms (T1, T2, T4), receipts, financial statements',
            dataSourcesFR: 'Formulaires d\'impôt (T1, T2, T4), reçus, états financiers',
            involvesPersonalInfo: true,
            personalInformationBanksEN: 'CRA PPU 005, CRA PPU 047',
            personalInformationBanksFR: 'ARC FRP 005, ARC FRP 047',
            hasUserNotification: false,
            atipRequestRefsEN: 'A-2023-00156',
            atipRequestRefsFR: 'A-2023-00156',
            outcomesEN: 'Processing time reduced by 60%, accuracy improved to 98.5%, cost savings of $2M annually',
            outcomesFR: 'Temps de traitement réduit de 60%, précision améliorée à 98,5%, économies de coûts de 2M$ annuellement',
            moderationState: prisma_1.ModerationState.Published,
            featured: true,
            contacts: {
                create: [
                    {
                        name: 'Dr. Amélie Dubois',
                        email: 'amelie.dubois@cra-arc.gc.ca',
                        role: prisma_1.ContactRole.Primary,
                        title: 'Senior Research Scientist',
                    },
                    {
                        name: 'David Park',
                        email: 'david.park@cra-arc.gc.ca',
                        role: prisma_1.ContactRole.Technical,
                        title: 'ML Engineering Lead',
                        phone: '613-555-0202',
                    },
                    {
                        name: 'Jennifer Martinez',
                        email: 'jennifer.martinez@cra-arc.gc.ca',
                        role: prisma_1.ContactRole.Business,
                        title: 'Director, Digital Innovation',
                    },
                ],
            },
        },
    });
    await prisma.project.create({
        data: {
            nameEN: 'Real-time Translation Service',
            nameFR: 'Service de traduction en temps réel',
            organizationId: canadianHeritage.id,
            descriptionEN: 'Real-time translation service supporting English and French for government communications and citizen interactions.',
            descriptionFR: 'Service de traduction en temps réel soutenant l\'anglais et le français pour les communications gouvernementales et les interactions avec les citoyens.',
            primaryUsers: prisma_1.PrimaryUsers.Both,
            developedBy: prisma_1.DevelopedBy.Government,
            status: prisma_1.ProjectStatus.InProduction,
            statusYear: 2024,
            capabilitiesEN: 'Neural Machine Translation, Real-time Translation API, Context-aware translation',
            capabilitiesFR: 'Traduction automatique neuronale, API de traduction en temps réel, Traduction contextuelle',
            isAutomatedDecisionSystem: false,
            openGovAiaId: 'Not applicable',
            dataSourcesEN: 'Government bilingual corpus, official translation memories, Canadian terminology databases',
            dataSourcesFR: 'Corpus bilingue gouvernemental, mémoires de traduction officielles, bases de données terminologiques canadiennes',
            involvesPersonalInfo: false,
            hasUserNotification: false,
            outcomesEN: 'Enabled real-time bilingual communication, reduced translation costs by 40%',
            outcomesFR: 'Communication bilingue en temps réel activée, réduction des coûts de traduction de 40%',
            moderationState: prisma_1.ModerationState.Published,
            featured: false,
            contacts: {
                create: [
                    {
                        name: 'Marie-Claire Fontaine',
                        email: 'marie-claire.fontaine@pch.gc.ca',
                        role: prisma_1.ContactRole.Primary,
                        title: 'Directrice, Services linguistiques',
                        phone: '613-555-0404',
                    },
                    {
                        name: 'James O\'Brien',
                        email: 'james.obrien@pch.gc.ca',
                        role: prisma_1.ContactRole.Technical,
                        title: 'Senior NLP Engineer',
                    },
                    {
                        name: 'Sophie Lavoie',
                        email: 'sophie.lavoie@pch.gc.ca',
                        role: prisma_1.ContactRole.Business,
                        title: 'Manager, Digital Language Services',
                    },
                ],
            },
        },
    });
    await prisma.project.create({
        data: {
            nameEN: 'Fraud Detection Engine',
            nameFR: 'Moteur de détection de fraude',
            organizationId: publicSafety.id,
            descriptionEN: 'Machine learning system for detecting fraudulent activities in government benefit applications and financial transactions.',
            descriptionFR: 'Système d\'apprentissage automatique pour détecter les activités frauduleuses dans les demandes de prestations gouvernementales et les transactions financières.',
            primaryUsers: prisma_1.PrimaryUsers.Employees,
            developedBy: prisma_1.DevelopedBy.Government,
            status: prisma_1.ProjectStatus.InDevelopment,
            statusYear: 2024,
            capabilitiesEN: 'Anomaly Detection, Pattern Recognition, Risk Scoring, Real-time Monitoring',
            capabilitiesFR: 'Détection d\'anomalies, Reconnaissance de motifs, Évaluation des risques, Surveillance en temps réel',
            isAutomatedDecisionSystem: true,
            openGovAiaId: 'AIA-2024-PS-012',
            dataSourcesEN: 'Benefit application data, transaction records, historical fraud cases',
            dataSourcesFR: 'Données de demande de prestations, dossiers de transactions, cas de fraude historiques',
            involvesPersonalInfo: true,
            personalInformationBanksEN: 'PS PPU 023, PS PPU 056',
            personalInformationBanksFR: 'SP FRP 023, SP FRP 056',
            hasUserNotification: true,
            atipRequestRefsEN: 'A-2024-00089',
            atipRequestRefsFR: 'A-2024-00089',
            outcomesEN: 'Pilot phase: 85% fraud detection rate, 50% reduction in false positives',
            outcomesFR: 'Phase pilote: taux de détection de fraude de 85%, réduction de 50% des faux positifs',
            moderationState: prisma_1.ModerationState.Published,
            featured: true,
            contacts: {
                create: [
                    {
                        name: 'Robert Thompson',
                        email: 'robert.thompson@publicsafety.gc.ca',
                        role: prisma_1.ContactRole.Primary,
                        title: 'Chief Data Scientist',
                        phone: '613-555-0303',
                    },
                ],
            },
        },
    });
    await prisma.project.create({
        data: {
            nameEN: 'Policy Impact Analyzer',
            nameFR: 'Analyseur d\'impact des politiques',
            organizationId: pco.id,
            descriptionEN: 'AI tool for analyzing potential impacts of policy changes using historical data and predictive modeling.',
            descriptionFR: 'Outil IA pour analyser les impacts potentiels des changements de politiques en utilisant des données historiques et de la modélisation prédictive.',
            primaryUsers: prisma_1.PrimaryUsers.Employees,
            developedBy: prisma_1.DevelopedBy.Other,
            status: prisma_1.ProjectStatus.InDevelopment,
            statusYear: 2023,
            capabilitiesEN: 'Predictive Analytics, Data Visualization, Scenario Modeling, Impact Assessment',
            capabilitiesFR: 'Analytique prédictive, Visualisation de données, Modélisation de scénarios, Évaluation d\'impact',
            isAutomatedDecisionSystem: false,
            openGovAiaId: 'AIA-2023-PCO-008',
            dataSourcesEN: 'Historical policy data, economic indicators, demographic statistics, government reports',
            dataSourcesFR: 'Données de politiques historiques, indicateurs économiques, statistiques démographiques, rapports gouvernementaux',
            involvesPersonalInfo: false,
            hasUserNotification: false,
            outcomesEN: 'Research phase: improved policy analysis accuracy, faster impact assessments',
            outcomesFR: 'Phase de recherche: précision d\'analyse des politiques améliorée, évaluations d\'impact plus rapides',
            moderationState: prisma_1.ModerationState.Published,
            featured: false,
            contacts: {
                create: [
                    {
                        name: 'Dr. Katherine Morrison',
                        email: 'katherine.morrison@pco-bcp.gc.ca',
                        role: prisma_1.ContactRole.Primary,
                        title: 'Senior Policy Analyst',
                        phone: '613-555-0505',
                    },
                    {
                        name: 'Ahmed Hassan',
                        email: 'ahmed.hassan@pco-bcp.gc.ca',
                        role: prisma_1.ContactRole.Technical,
                        title: 'Data Science Lead',
                        phone: '613-555-0506',
                    },
                ],
            },
        },
    });
    await prisma.project.create({
        data: {
            nameEN: 'Web Accessibility Validator',
            nameFR: 'Validateur d\'accessibilité Web',
            organizationId: tbs.id,
            descriptionEN: 'Automated accessibility testing tool ensuring government websites meet WCAG 2.1 AA standards.',
            descriptionFR: 'Outil de test d\'accessibilité automatisé garantissant que les sites Web gouvernementaux respectent les normes WCAG 2.1 AA.',
            primaryUsers: prisma_1.PrimaryUsers.Employees,
            developedBy: prisma_1.DevelopedBy.Government,
            status: prisma_1.ProjectStatus.InProduction,
            statusYear: 2023,
            capabilitiesEN: 'Automated testing, WCAG compliance checking, accessibility reporting, remediation suggestions',
            capabilitiesFR: 'Tests automatisés, Vérification de conformité WCAG, Rapports d\'accessibilité, Suggestions de remédiation',
            isAutomatedDecisionSystem: false,
            openGovAiaId: 'Not applicable',
            dataSourcesEN: 'GC websites, WCAG guidelines, accessibility best practices',
            dataSourcesFR: 'Sites Web GC, Directives WCAG, Meilleures pratiques d\'accessibilité',
            involvesPersonalInfo: false,
            hasUserNotification: false,
            outcomesEN: 'All TBS websites now WCAG 2.1 AA compliant, 95% automated testing coverage',
            outcomesFR: 'Tous les sites Web du SCT sont maintenant conformes WCAG 2.1 AA, couverture de tests automatisés de 95%',
            moderationState: prisma_1.ModerationState.Published,
            featured: false,
            contacts: {
                create: [
                    {
                        name: 'Lisa Rodriguez',
                        email: 'lisa.rodriguez@tbs-sct.gc.ca',
                        role: prisma_1.ContactRole.Primary,
                        title: 'Accessibility Program Lead',
                        phone: '613-555-0707',
                    },
                    {
                        name: 'Michael Zhang',
                        email: 'michael.zhang@tbs-sct.gc.ca',
                        role: prisma_1.ContactRole.Technical,
                        title: 'Full Stack Developer',
                    },
                    {
                        name: 'Patricia Williams',
                        email: 'patricia.williams@tbs-sct.gc.ca',
                        role: prisma_1.ContactRole.Business,
                        title: 'Director, Digital Standards',
                    },
                ],
            },
        },
    });
    await prisma.project.create({
        data: {
            nameEN: 'Code generation and debugging',
            nameFR: 'Génération et débogage de code',
            organizationId: wagec.id,
            descriptionEN: 'The team uses ChatGPT and Copilot to troubleshoot issues and to write code.',
            descriptionFR: 'L\'équipe utilise ChatGPT et Copilot pour résoudre des problèmes et écrire du code.',
            primaryUsers: prisma_1.PrimaryUsers.Neither,
            developedBy: prisma_1.DevelopedBy.Other,
            status: prisma_1.ProjectStatus.InDevelopment,
            statusYear: 2024,
            isAutomatedDecisionSystem: false,
            involvesPersonalInfo: false,
            hasUserNotification: false,
            moderationState: prisma_1.ModerationState.Published,
            featured: false,
            contacts: {
                create: [
                    {
                        name: 'Emma Williams',
                        email: 'emma.williams@cfc-swc.gc.ca',
                        role: prisma_1.ContactRole.Primary,
                        title: 'Senior Developer',
                        phone: '613-555-0808',
                    },
                ],
            },
        },
    });
    console.log('✅ Created projects with contacts');
    console.log('🎉 Database seeded successfully!');
    console.log(`
    Summary:
    - ${await prisma.organization.count()} organizations
    - ${await prisma.project.count()} projects
    - ${await prisma.projectContact.count()} contacts
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
//# sourceMappingURL=seed.js.map