/**
 * Database Loader
 * Syncs database schemas and seeds initial Freshora data on MySQL.
 */

import { sequelize, ensureDatabaseExists, isMySqlRunning } from '../config/db.js';
import '../app/models/index.js';
import { seedDatabase } from '../database/seedFreshora.js';

export default async () => {
  try {
    // 1. Ensure database exists in MySQL
    await ensureDatabaseExists();

    // 2. Authenticate connection
    await sequelize.authenticate();
    console.log(`✓ Database connection verified (${isMySqlRunning ? 'MySQL: freshora' : 'Local storage: freshora.sqlite'}).`);

    // 3. Sync all models safely (creates all tables if not exist, does NOT drop data)
    await sequelize.sync();
    console.log('✓ Database tables synchronized.');

    // 4. Seed database with complete Freshora catalog idempotently
    await seedDatabase();

  } catch (err) {
    console.error('✗ Database loader error:', err.message);
    throw err;
  }
};
