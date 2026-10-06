/**
 * Express Loader (like Laravel HTTP kernel / service provider).
 * Serves API, static public assets, and SPA fallback for the Expo web build.
 */

import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import apiRoutes from '../routes/api.js';
import { errorHandler } from '../app/middlewares/errorHandler.js';
import { notFoundHandler } from '../app/middlewares/notFoundHandler.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');
const webIndex = path.join(rootDir, 'public', 'index.html');

export default (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  const allowedOrigins = [
    process.env.FRONTEND_URL,
    'http://localhost:8081',
    'http://localhost:19006',
  ].filter(Boolean);

  app.use(
    cors({
      origin(origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
          return;
        }
        callback(null, false);
      },
    })
  );

  // Root health endpoint (Phase 8)
  app.get('/', (req, res) => {
    res.json({
      name: 'Freshora API',
      status: 'healthy',
      version: '1.0.0',
    });
  });

  // API routes (like Laravel api.php)
  app.use('/api', apiRoutes);

  // 404 for unmatched /api routes
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
};
