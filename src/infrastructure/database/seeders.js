import pool from './db.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// ============================================================================
// SIMPLE SEEDS — Tables with no FK dependencies
// ============================================================================
const simpleSeedData = [
  {
    table: 'lu_user_role',
    columns: ['RoleCode', 'Description'],
    data: [
      ['ADMIN', 'The boss. Full access to everything'],
      ['OPERATOR', 'Desk staff. Creates orders, prints labels'],
      ['COURIER', 'Delivery staff. Scans parcels, links AWBs, dispatches']
    ],
    duplicateCheckColumn: 'RoleCode'
  }
];

// ============================================================================
// UNIFIED LOOKUP SEEDS — lu_master (categories) + lu_details (values)
// Replaces the old lu_order_status, lu_parcel_status, lu_notification_status
// tables with the unified lu_master → lu_details hierarchy from db_schema_v1.
// ============================================================================

/**
 * lu_master categories to seed.
 * Each category groups a set of lu_details entries (e.g., all parcel statuses).
 */
const luMasterCategories = [
  { LuMaster: 'Parcel Status', LuMaster_1: 'PARCEL_STATUS', LuMaster_2: 'Status values for parcel state machine' },
  { LuMaster: 'Notification Status', LuMaster_1: 'NOTIFICATION_STATUS', LuMaster_2: 'Status values for notification delivery tracking' }
];

/**
 * lu_details entries to seed, keyed by their parent lu_master category code (LuMaster_1).
 *
 * Columns mapped:
 *   LuDetails   = Human-readable status name (e.g., "Pending")
 *   LuDetails_1 = Machine-readable status code (e.g., "PENDING")
 *   LuDetails_2 = Description
 *   LuDetails_3 = Sort order (for UI display sequencing)
 */
const luDetailsByCategory = {
  'PARCEL_STATUS': [
    { LuDetails: 'Pending',       LuDetails_1: 'PENDING',       LuDetails_2: 'Parcel created but label not printed',         LuDetails_3: '1' },
    { LuDetails: 'Label Printed', LuDetails_1: 'LABEL_PRINTED', LuDetails_2: 'Label printed, waiting for AWB/dispatch',      LuDetails_3: '2' },
    { LuDetails: 'AWB Linked',    LuDetails_1: 'AWB_LINKED',    LuDetails_2: 'AWB and QR linked together',                   LuDetails_3: '3' },
    { LuDetails: 'Dispatched',    LuDetails_1: 'DISPATCHED',    LuDetails_2: 'Parcel out for delivery',                      LuDetails_3: '4' },
    { LuDetails: 'Delivered',     LuDetails_1: 'DELIVERED',     LuDetails_2: 'Parcel delivered successfully',                LuDetails_3: '5' },
    { LuDetails: 'Cancelled',     LuDetails_1: 'CANCELLED',     LuDetails_2: 'Parcel cancelled before dispatch',             LuDetails_3: '6' },
    { LuDetails: 'Returned',      LuDetails_1: 'RETURNED',      LuDetails_2: 'Parcel returned after dispatch/delivery attempt', LuDetails_3: '7' }
  ],
  'NOTIFICATION_STATUS': [
    { LuDetails: 'Not Sent', LuDetails_1: 'NOT_SENT', LuDetails_2: 'Notification queued but not yet sent',              LuDetails_3: '1' },
    { LuDetails: 'Sent',     LuDetails_1: 'SENT',     LuDetails_2: 'Notification dispatched via channel successfully',  LuDetails_3: '2' },
    { LuDetails: 'Failed',   LuDetails_1: 'FAILED',   LuDetails_2: 'Notification attempt failed',                       LuDetails_3: '3' }
  ]
};

/**
 * Seeds simple tables (no FK dependencies).
 * Uses duplicate-check to avoid re-inserting existing rows.
 */
const seedSimpleTables = async (connection) => {
  for (const seed of simpleSeedData) {
    console.log(`Seeding table: ${seed.table}`);

    const columnsFormatted = seed.columns.join(', ');

    for (const row of seed.data) {
      const placeholders = row.map(() => '?').join(', ');

      // Check if row already exists by its duplicate-check column
      const checkColIndex = seed.columns.indexOf(seed.duplicateCheckColumn);
      const [existing] = await connection.query(
        `SELECT 1 FROM ?? WHERE ?? = ? LIMIT 1`,
        [seed.table, seed.duplicateCheckColumn, row[checkColIndex]]
      );

      if (existing.length === 0) {
        const sql = `INSERT INTO ${seed.table} (${columnsFormatted}) VALUES (${placeholders})`;
        await connection.query(sql, row);
        console.log(`  [+] Inserted: ${row[checkColIndex]}`);
      } else {
        console.log(`  [~] Skipped (already exists): ${row[checkColIndex]}`);
      }
    }
  }
};

/**
 * Seeds the unified lu_master → lu_details lookup hierarchy.
 *
 * Flow:
 * 1. Insert lu_master categories (if not already present).
 * 2. Resolve lu_master PKs by querying back.
 * 3. Insert lu_details entries with the resolved FKs.
 */
const seedLookupHierarchy = async (connection) => {
  console.log('Seeding table: lu_master (categories)');

  // Step 1: Insert lu_master categories
  for (const category of luMasterCategories) {
    const [existing] = await connection.query(
      `SELECT LuMasterId FROM lu_master WHERE LuMaster_1 = ? LIMIT 1`,
      [category.LuMaster_1]
    );

    if (existing.length === 0) {
      await connection.query(
        `INSERT INTO lu_master (LuMaster, LuMaster_1, LuMaster_2) VALUES (?, ?, ?)`,
        [category.LuMaster, category.LuMaster_1, category.LuMaster_2]
      );
      console.log(`  [+] Inserted category: ${category.LuMaster}`);
    } else {
      console.log(`  [~] Skipped category (already exists): ${category.LuMaster}`);
    }
  }

  // Step 2: Resolve lu_master PKs and seed lu_details
  console.log('Seeding table: lu_details (status values)');

  for (const [categoryCode, details] of Object.entries(luDetailsByCategory)) {
    // Look up the parent category ID
    const [categoryRows] = await connection.query(
      `SELECT LuMasterId FROM lu_master WHERE LuMaster_1 = ? LIMIT 1`,
      [categoryCode]
    );

    if (categoryRows.length === 0) {
      console.error(`  [!] FATAL: lu_master category '${categoryCode}' not found. Cannot seed lu_details.`);
      continue;
    }

    const luMasterId = categoryRows[0].LuMasterId;

    for (const detail of details) {
      // Duplicate check by code (LuDetails_1) within the same category
      const [existing] = await connection.query(
        `SELECT 1 FROM lu_details WHERE LuDetails_1 = ? AND LuMasterId = ? LIMIT 1`,
        [detail.LuDetails_1, luMasterId]
      );

      if (existing.length === 0) {
        await connection.query(
          `INSERT INTO lu_details (LuDetails, LuDetails_1, LuDetails_2, LuDetails_3, LuMasterId, IsActive) VALUES (?, ?, ?, ?, ?, 1)`,
          [detail.LuDetails, detail.LuDetails_1, detail.LuDetails_2, detail.LuDetails_3, luMasterId]
        );
        console.log(`  [+] Inserted: ${categoryCode} → ${detail.LuDetails_1}`);
      } else {
        console.log(`  [~] Skipped (already exists): ${categoryCode} → ${detail.LuDetails_1}`);
      }
    }
  }
};

// ============================================================================
// MAIN SEEDER RUNNER
// ============================================================================
export async function runAllSeeders() {
  console.log('--- Database Seeding Started ---');
  let connection;

  try {
    connection = await pool.getConnection();

    // Phase 1: Simple tables (no FK dependencies)
    await seedSimpleTables(connection);

    // Phase 2: Unified lookup hierarchy (lu_master → lu_details)
    await seedLookupHierarchy(connection);

    console.log('--- Database Seeding Completed Successfully ---');
  } catch (error) {
    console.error('Database seeding failed:', error);
    process.exit(1);
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

// For running the script directly from package.json via `node src/infrastructure/database/seeders.js`
if (process.argv[1] && process.argv[1].endsWith('seeders.js')) {
  runAllSeeders().then(() => {
    // Release the main pool to let the script exit gracefully
    pool.end();
    process.exit(0);
  });
}
