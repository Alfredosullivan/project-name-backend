// routes/users.js — Rutas de usuario (protegidas)

const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getCurrentUser } = require('../controllers/users');

// GET /users/me — Devuelve email y nombre del usuario autenticado
router.get(
  '/me',
  celebrate({
    headers: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(true),
  }),
  getCurrentUser,
);

module.exports = router;
