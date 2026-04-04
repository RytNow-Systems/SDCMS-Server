import pool from './db.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

/**
 * Array of seed instructions.
 * Each object defines the table name, the expected columns, and the rows to insert.
 */
const seedData = [
  {
    table: 'lu_user_role',
    columns: ['RoleCode', 'Description'],
    data: [
      ['ADMIN', 'The boss. Full access to everything'],
      ['OPERATOR', 'Desk staff. Creates orders, prints labels'],
      ['COURIER', 'Delivery staff. Scans parcels, links AWBs, dispatches']
    ],
    primaryKeyIndex: 0
  },
  {
    table: 'lu_order_status',
    columns: ['StatusCode', 'Description', 'SortOrder'],
    data: [
      ['CREATED', 'Order just created, no parcels actioned yet', 1],
      ['LABEL_PRINTED', 'Labels printed for all parcels in this order', 2],
      ['DISPATCHED', 'All parcels dispatched', 3],
      ['DELIVERED', 'All parcels delivered', 4],
      ['CANCELLED', 'Order manually cancelled', 5]
    ],
    primaryKeyIndex: 0
  },
  {
    table: 'lu_parcel_status',
    columns: ['StatusCode', 'Description', 'SortOrder'],
    data: [
      ['PENDING', 'Parcel created but label not printed', 1],
      ['LABEL_PRINTED', 'Label printed, waiting for AWB/dispatch', 2],
      ['AWB_LINKED', 'AWB and QR linked together', 3],
      ['DISPATCHED', 'Parcel out for delivery', 4],
      ['DELIVERED', 'Parcel delivered successfully', 5],
      ['CANCELLED', 'Parcel cancelled before dispatch', 6],
      ['RETURNED', 'Parcel returned after dispatch/delivery attempt', 7]
    ],
    primaryKeyIndex: 0
  },
  {
    table: 'lu_notification_status',
    columns: ['StatusCode', 'Description'],
    data: [
      ['NOT_SENT', 'Notification queued but not yet sent'],
      ['SENT', 'Notification dispatched via channel successfully'],
      ['FAILED', 'Notification attempt failed']
    ],
    primaryKeyIndex: 0
  }
];

export async function runAllSeeders() {
  console.log('--- Database Seeding Started ---');
  let connection;

  try {
    connection = await pool.getConnection();

    for (const seed of seedData) {
      console.log(`Seeding table: ${seed.table}`);
      
      const columnsFormatted = seed.columns.join(', ');
      
      for (const row of seed.data) {
        // Construct standard parameterized query
        const placeholders = row.map(() => '?').join(', ');
        
        // Check if row already exists by its primary code
        const [existing] = await connection.query(
          `SELECT 1 FROM ?? WHERE ?? = ? LIMIT 1`,
          [seed.table, seed.columns[seed.primaryKeyIndex], row[seed.primaryKeyIndex]]
        );

        if (existing.length === 0) {
          const sql = `INSERT INTO ${seed.table} (${columnsFormatted}) VALUES (${placeholders})`;
          await connection.query(sql, row);
          console.log(`  [+] Inserted: ${row[seed.primaryKeyIndex]}`);
        } else {
          console.log(`  [~] Skipped (already exists): ${row[seed.primaryKeyIndex]}`);
        }
      }
    }
    
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
