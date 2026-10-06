/**
 * Freshora Backend Server Entry Point
 */

import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import loadDatabase from './loaders/database.js';
import loadExpress from './loaders/express.js';
import { sequelize } from './config/db.js';

const app = express();
const PORT = process.env.PORT || 3000;

let server;

async function start() {
  await loadDatabase();
  loadExpress(app);

  server = app.listen(PORT, () => {
    console.log(`✓ Freshora Backend running at http://localhost:${PORT}`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`\n⚠️  Port ${PORT} is already occupied by another process.`);
      console.error(`👉 If you are running multiple terminals (e.g. "npm run dev" AND "npm run dev:full:web"),`);
      console.error(`   note that "dev:full:web" already includes the backend!`);
      console.error(`   - To run both together: use ONE terminal with "npm run dev:full:web"`);
      console.error(`   - To run separately: Terminal 1: "npm run dev:backend", Terminal 2: "npm run dev:web"\n`);
    } else {
      console.error('Server error:', err);
    }
  });
}

// Graceful shutdown handling
async function gracefulShutdown(signal) {
  console.log(`\n🛑 Received ${signal}. Closing server gracefully...`);
  if (server) {
    server.close(async () => {
      console.log('✓ HTTP server closed.');
      try {
        await sequelize.close();
        console.log('✓ Database connection pool closed.');
      } catch (err) {
        console.error('Error closing database pool:', err.message);
      }
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
}

process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));

start().catch((err) => {
  console.error('Failed to start server:', err.message);
  process.exit(1);
});
