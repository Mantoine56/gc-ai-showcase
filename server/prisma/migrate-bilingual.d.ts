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
declare function migrateDatabase(): void;
export { migrateDatabase };
//# sourceMappingURL=migrate-bilingual.d.ts.map