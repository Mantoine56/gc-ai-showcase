"use strict";
/**
 * Data Migration Script: Monolingual to Bilingual Schema
 *
 * This script migrates existing Project data from the old monolingual schema
 * to the new bilingual schema with separate EN/FR fields.
 *
 * Migration strategy:
 * 1. Read all existing projects from the database
 * 2. For each project, copy existing English text to both EN and FR fields
 * 3. Use SQLite's ALTER TABLE to add new columns with the migrated data
 * 4. Drop old columns
 *
 * NOTE: This creates placeholder French translations by duplicating English content.
 * Real French translations will need to be added later.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.migrateDatabase = migrateDatabase;
const better_sqlite3_1 = __importDefault(require("better-sqlite3"));
const path_1 = require("path");
const url_1 = require("url");
const __filename = (0, url_1.fileURLToPath)(import.meta.url);
const __dirname = (0, path_1.dirname)(__filename);
const DB_PATH = (0, path_1.resolve)(__dirname, './dev.db');
function migrateDatabase() {
    console.log('Starting bilingual migration...\n');
    const db = new better_sqlite3_1.default(DB_PATH);
    try {
        // Start transaction
        db.exec('BEGIN TRANSACTION');
        console.log('Step 1: Reading existing project data...');
        const projects = db.prepare(`
      SELECT
        id, name, description, capabilities, dataSources,
        personalInformationBanks, atipRequestRefs, outcomes
      FROM Project
    `).all();
        console.log(`Found ${projects.length} projects to migrate.\n`);
        // Step 2: Add new bilingual columns with temporary names
        console.log('Step 2: Adding new bilingual columns...');
        db.exec(`
      ALTER TABLE Project ADD COLUMN nameEN TEXT;
      ALTER TABLE Project ADD COLUMN nameFR TEXT;
      ALTER TABLE Project ADD COLUMN descriptionEN TEXT;
      ALTER TABLE Project ADD COLUMN descriptionFR TEXT;
      ALTER TABLE Project ADD COLUMN capabilitiesEN TEXT;
      ALTER TABLE Project ADD COLUMN capabilitiesFR TEXT;
      ALTER TABLE Project ADD COLUMN dataSourcesEN TEXT;
      ALTER TABLE Project ADD COLUMN dataSourcesFR TEXT;
      ALTER TABLE Project ADD COLUMN personalInformationBanksEN TEXT;
      ALTER TABLE Project ADD COLUMN personalInformationBanksFR TEXT;
      ALTER TABLE Project ADD COLUMN atipRequestRefsEN TEXT;
      ALTER TABLE Project ADD COLUMN atipRequestRefsFR TEXT;
      ALTER TABLE Project ADD COLUMN outcomesEN TEXT;
      ALTER TABLE Project ADD COLUMN outcomesFR TEXT;
    `);
        console.log('New columns added successfully.\n');
        // Step 3: Migrate data (copy English to both EN and FR fields)
        console.log('Step 3: Migrating project data...');
        const updateStmt = db.prepare(`
      UPDATE Project SET
        nameEN = ?,
        nameFR = ?,
        descriptionEN = ?,
        descriptionFR = ?,
        capabilitiesEN = ?,
        capabilitiesFR = ?,
        dataSourcesEN = ?,
        dataSourcesFR = ?,
        personalInformationBanksEN = ?,
        personalInformationBanksFR = ?,
        atipRequestRefsEN = ?,
        atipRequestRefsFR = ?,
        outcomesEN = ?,
        outcomesFR = ?
      WHERE id = ?
    `);
        let migrated = 0;
        for (const project of projects) {
            updateStmt.run(project.name, // nameEN
            project.name, // nameFR (placeholder)
            project.description, // descriptionEN
            project.description, // descriptionFR (placeholder)
            project.capabilities, // capabilitiesEN
            project.capabilities, // capabilitiesFR (placeholder)
            project.dataSources, // dataSourcesEN
            project.dataSources, // dataSourcesFR (placeholder)
            project.personalInformationBanks, // personalInformationBanksEN
            project.personalInformationBanks, // personalInformationBanksFR (placeholder)
            project.atipRequestRefs, // atipRequestRefsEN
            project.atipRequestRefs, // atipRequestRefsFR (placeholder)
            project.outcomes, // outcomesEN
            project.outcomes, // outcomesFR (placeholder)
            project.id);
            migrated++;
            if (migrated % 50 === 0) {
                console.log(`  Migrated ${migrated}/${projects.length} projects...`);
            }
        }
        console.log(`\nSuccessfully migrated ${migrated} projects.\n`);
        // Step 4: Create new table with correct schema (SQLite limitation workaround)
        console.log('Step 4: Recreating table with new schema...');
        // SQLite doesn't support DROP COLUMN, so we need to recreate the table
        db.exec(`
      -- Create new table with correct schema
      CREATE TABLE Project_new (
        id TEXT PRIMARY KEY,
        aiRegisterId TEXT UNIQUE,
        nameEN TEXT NOT NULL,
        nameFR TEXT NOT NULL,
        serviceInventoryId TEXT,
        organizationId TEXT NOT NULL,
        descriptionEN TEXT NOT NULL,
        descriptionFR TEXT NOT NULL,
        primaryUsers TEXT NOT NULL,
        developedBy TEXT NOT NULL,
        vendorName TEXT,
        status TEXT NOT NULL,
        statusYear INTEGER,
        capabilitiesEN TEXT,
        capabilitiesFR TEXT,
        isAutomatedDecisionSystem INTEGER NOT NULL DEFAULT 0,
        openGovAiaId TEXT,
        dataSourcesEN TEXT,
        dataSourcesFR TEXT,
        involvesPersonalInfo INTEGER NOT NULL DEFAULT 0,
        personalInformationBanksEN TEXT,
        personalInformationBanksFR TEXT,
        hasUserNotification INTEGER NOT NULL DEFAULT 0,
        atipRequestRefsEN TEXT,
        atipRequestRefsFR TEXT,
        outcomesEN TEXT,
        outcomesFR TEXT,
        source1 TEXT,
        source2 TEXT,
        moderationState TEXT NOT NULL DEFAULT 'Draft',
        featured INTEGER NOT NULL DEFAULT 0,
        createdBy TEXT,
        updatedBy TEXT,
        createdAt TEXT NOT NULL,
        updatedAt TEXT NOT NULL,
        FOREIGN KEY (organizationId) REFERENCES Organization(id)
      );

      -- Copy data to new table
      INSERT INTO Project_new SELECT
        id, aiRegisterId, nameEN, nameFR, serviceInventoryId, organizationId,
        descriptionEN, descriptionFR, primaryUsers, developedBy, vendorName,
        status, statusYear, capabilitiesEN, capabilitiesFR,
        isAutomatedDecisionSystem, openGovAiaId, dataSourcesEN, dataSourcesFR,
        involvesPersonalInfo, personalInformationBanksEN, personalInformationBanksFR,
        hasUserNotification, atipRequestRefsEN, atipRequestRefsFR,
        outcomesEN, outcomesFR, source1, source2, moderationState, featured,
        createdBy, updatedBy, createdAt, updatedAt
      FROM Project;

      -- Drop old table
      DROP TABLE Project;

      -- Rename new table
      ALTER TABLE Project_new RENAME TO Project;

      -- Recreate indexes
      CREATE INDEX "Project_organizationId_idx" ON "Project"("organizationId");
      CREATE INDEX "Project_status_idx" ON "Project"("status");
      CREATE INDEX "Project_isAutomatedDecisionSystem_idx" ON "Project"("isAutomatedDecisionSystem");
      CREATE INDEX "Project_involvesPersonalInfo_idx" ON "Project"("involvesPersonalInfo");
      CREATE INDEX "Project_statusYear_idx" ON "Project"("statusYear");
      CREATE INDEX "Project_moderationState_idx" ON "Project"("moderationState");
      CREATE INDEX "Project_createdAt_idx" ON "Project"("createdAt");
      CREATE UNIQUE INDEX "Project_nameEN_organizationId_key" ON "Project"("nameEN", "organizationId");
    `);
        console.log('Table recreated with new schema.\n');
        // Commit transaction
        db.exec('COMMIT');
        console.log('✅ Migration completed successfully!\n');
        console.log('⚠️  NOTE: French translations are currently placeholders (duplicates of English text).');
        console.log('   You will need to add proper French translations through the UI or another script.\n');
    }
    catch (error) {
        console.error('❌ Migration failed:', error);
        db.exec('ROLLBACK');
        throw error;
    }
    finally {
        db.close();
    }
}
// Run migration (ES module check)
const isMainModule = import.meta.url === `file://${process.argv[1]}`;
if (isMainModule) {
    try {
        migrateDatabase();
    }
    catch (error) {
        console.error('Migration script failed:', error);
        process.exit(1);
    }
}
//# sourceMappingURL=migrate-bilingual.js.map