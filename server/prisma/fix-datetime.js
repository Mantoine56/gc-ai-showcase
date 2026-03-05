"use strict";
/**
 * Fix DateTime Migration Issue
 *
 * The previous migration incorrectly stored timestamps. This script fixes them.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fixDateTimes = fixDateTimes;
const better_sqlite3_1 = __importDefault(require("better-sqlite3"));
const path_1 = require("path");
const url_1 = require("url");
const __filename = (0, url_1.fileURLToPath)(import.meta.url);
const __dirname = (0, path_1.dirname)(__filename);
const DB_PATH = (0, path_1.resolve)(__dirname, './dev.db');
function fixDateTimes() {
    console.log('Fixing DateTime fields...\n');
    const db = new better_sqlite3_1.default(DB_PATH);
    try {
        db.exec('BEGIN TRANSACTION');
        // Get all projects with their current timestamps
        const projects = db.prepare(`
      SELECT id, createdAt, updatedAt FROM Project
    `).all();
        console.log(`Found ${projects.length} projects to fix.\n`);
        const updateStmt = db.prepare(`
      UPDATE Project SET createdAt = ?, updatedAt = ? WHERE id = ?
    `);
        let fixed = 0;
        for (const project of projects) {
            // Check if it's a Unix timestamp (numeric string)
            let createdAt = project.createdAt;
            let updatedAt = project.updatedAt;
            // If it's a numeric string (Unix timestamp), convert to ISO
            if (/^\d+$/.test(createdAt)) {
                const timestamp = parseInt(createdAt, 10);
                createdAt = new Date(timestamp).toISOString();
            }
            if (/^\d+$/.test(updatedAt)) {
                const timestamp = parseInt(updatedAt, 10);
                updatedAt = new Date(timestamp).toISOString();
            }
            updateStmt.run(createdAt, updatedAt, project.id);
            fixed++;
            if (fixed % 50 === 0) {
                console.log(`  Fixed ${fixed}/${projects.length} projects...`);
            }
        }
        db.exec('COMMIT');
        console.log(`\n✅ Successfully fixed ${fixed} projects!\n`);
    }
    catch (error) {
        console.error('❌ Fix failed:', error);
        db.exec('ROLLBACK');
        throw error;
    }
    finally {
        db.close();
    }
}
// Run fix
if (import.meta.url === `file://${process.argv[1]}`) {
    try {
        fixDateTimes();
    }
    catch (error) {
        console.error('Fix script failed:', error);
        process.exit(1);
    }
}
//# sourceMappingURL=fix-datetime.js.map