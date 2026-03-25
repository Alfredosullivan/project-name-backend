// utils/logger.js — Configuración de logs con Winston + express-winston

const winston = require('winston');
const expressWinston = require('express-winston');

// ── Logger de solicitudes (request.log) ───────────────────────────────────
const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({ filename: 'logs/request.log' }),
  ],
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
  ),
  meta: true,
  msg: 'HTTP {{req.method}} {{req.url}}',
  expressFormat: false,
  colorize: false,
});

// ── Logger de errores (error.log) ─────────────────────────────────────────
const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({ filename: 'logs/error.log' }),
  ],
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
  ),
});

module.exports = { requestLogger, errorLogger };
