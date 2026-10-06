/**
 * Database Configuration & Connection Pool
 * Configured strictly for MySQL with environment variables.
 * Silent fallback to SQLite is removed.
 */

import dotenv from 'dotenv';
dotenv.config();

import Sequelize from 'sequelize';
import mysql from 'mysql2/promise';

const env = process.env.NODE_ENV || 'development';

const dbHost = process.env.DB_HOST || '127.0.0.1';
const dbPort = parseInt(process.env.DB_PORT || '3306', 10);
const dbUser = process.env.DB_USER || 'root';
const dbPassword = process.env.DB_PASSWORD || '';
const dbName = process.env.DB_NAME || 'freshora';
const dbDialect = process.env.DB_DIALECT || 'mysql';
const dbLogging = process.env.DB_LOGGING === 'true' ? console.log : false;

export const config = {
  development: {
    username: dbUser,
    password: dbPassword,
    database: dbName,
    host: dbHost,
    port: dbPort,
    dialect: dbDialect,
    storage: process.env.DB_STORAGE || './freshora.sqlite',
    logging: dbLogging,
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
  test: {
    username: dbUser,
    password: dbPassword,
    database: process.env.DB_NAME_TEST || 'freshora_test',
    host: dbHost,
    port: dbPort,
    dialect: dbDialect,
    storage: './freshora_test.sqlite',
    logging: false,
  },
  production: {
    username: dbUser,
    password: dbPassword,
    database: dbName,
    host: dbHost,
    port: dbPort,
    dialect: dbDialect,
    logging: false,
    pool: {
      max: 20,
      min: 2,
      acquire: 30000,
      idle: 10000,
    },
  },
};

const dbConfig = config[env] || config.development;

export const isMySqlRunning = dbConfig.dialect === 'mysql';

/**
 * Initialize MySQL Database schema if not exists
 */
export async function ensureDatabaseExists() {
  if (dbConfig.dialect === 'mysql') {
    try {
      const connection = await mysql.createConnection({
        host: dbConfig.host,
        port: dbConfig.port,
        user: dbConfig.username,
        password: dbConfig.password,
        connectTimeout: 5000,
      });

      await connection.query(
        `CREATE DATABASE IF NOT EXISTS \`${dbConfig.database}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`
      );
      await connection.end();
      console.log(`✓ [MySQL] Verified database \`${dbConfig.database}\` on ${dbConfig.host}:${dbConfig.port}`);
    } catch (err) {
      console.error(`✗ [MySQL Error] Failed to connect to MySQL on ${dbConfig.host}:${dbConfig.port}`);
      console.error(`  Reason: ${err.message}`);
      console.error(`  Please verify that MySQL service is running on port ${dbConfig.port} and credentials in .env are correct.`);
      throw new Error(`MySQL connection failed: ${err.message}`);
    }
  }
}

/**
 * Sequelize ORM Instance
 */
export const sequelize = dbConfig.dialect === 'mysql'
  ? new Sequelize(
      dbConfig.database,
      dbConfig.username,
      dbConfig.password,
      {
        host: dbConfig.host,
        port: dbConfig.port,
        dialect: 'mysql',
        logging: dbConfig.logging,
        pool: dbConfig.pool,
        define: {
          timestamps: true,
          underscored: true,
          freezeTableName: true,
        },
      }
    )
  : new Sequelize({
      dialect: 'sqlite',
      storage: dbConfig.storage,
      logging: dbConfig.logging,
      define: {
        timestamps: true,
        underscored: true,
        freezeTableName: true,
      },
    });

export default dbConfig;
