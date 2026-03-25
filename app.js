// app.js — Punto de entrada principal de la API

require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');

const router = require('./routes');
const { requestLogger, errorLogger } = require('./utils/logger');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// ── Configuración ──────────────────────────────────────────────────────────
const PORT = process.env.PORT || 3001;

// En desarrollo se usa una URI local; en producción se lee del .env
const MONGO_URI = process.env.NODE_ENV === 'production'
  ? process.env.MONGO_URI
  : 'mongodb://localhost:27017/newsexplorer';

// ── Conexión a MongoDB ─────────────────────────────────────────────────────
mongoose
  .connect(MONGO_URI)
  .then(() => console.log('Conectado a MongoDB')) // eslint-disable-line no-console
  .catch((err) => console.error('Error al conectar a MongoDB:', err)); // eslint-disable-line no-console

// ── Middlewares globales ───────────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cabeceras CORS — permite solicitudes desde cualquier origen
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  return next();
});

// ── Logging de solicitudes ─────────────────────────────────────────────────
// Debe ir ANTES de las rutas para registrar todas las peticiones
app.use(requestLogger);

// ── Rutas principales ──────────────────────────────────────────────────────
app.use('/', router);

// ── Logging de errores ─────────────────────────────────────────────────────
// Debe ir DESPUÉS de las rutas y ANTES del manejador de errores
app.use(errorLogger);

// ── Manejador de errores de celebrate (validación) ────────────────────────
app.use(errors());

// ── Manejador centralizado de errores ─────────────────────────────────────
// Siempre al final — captura cualquier error pasado con next(err)
app.use(errorHandler);

// ── Arranque del servidor ──────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`); // eslint-disable-line no-console
});
