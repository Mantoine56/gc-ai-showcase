/**
 * Fix DateTime Migration Issue
 *
 * The previous migration incorrectly stored timestamps. This script fixes them.
 */

import Database from 'better-sqlite3';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const DB_PATH = resolve(__dirname, './dev.db');

function fixDateTimes() {
  console.log('Fixing DateTime fields...\n');

  const db = new Database(DB_PATH);

  try {
    db.exec('BEGIN TRANSACTION');

    // Get all projects with their current timestamps
    const projects = db.prepare(`
      SELECT id, createdAt, updatedAt FROM Project
    `).all() as Array<{ id: string; createdAt: string; updatedAt: string }>;

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

  } catch (error) {
    console.error('❌ Fix failed:', error);
    db.exec('ROLLBACK');
    throw error;
  } finally {
    db.close();
  }
}

// Run fix
if (import.meta.url === `file://${process.argv[1]}`) {
  try {
    fixDateTimes();
  } catch (error) {
    console.error('Fix script failed:', error);
    process.exit(1);
  }
}

export { fixDateTimes };
