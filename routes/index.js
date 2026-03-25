// routes/index.js — Enrutador principal

const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewares/auth');
const { createUser, login } = require('../controllers/users');
const usersRouter = require('./users');
const articlesRouter = require('./articles');
const { NotFoundError } = require('../errors');

// ── Rutas públicas (no requieren JWT) ─────────────────────────────────────
router.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      name: Joi.string().min(2).max(30).required(),
    }),
  }),
  createUser,
);

router.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  }),
  login,
);

// ── Rutas protegidas (requieren JWT válido) ───────────────────────────────
router.use(auth);
router.use('/users', usersRouter);
router.use('/articles', articlesRouter);

// ── Ruta 404 para cualquier ruta no encontrada ────────────────────────────
router.use((req, res, next) => {
  next(new NotFoundError('Ruta no encontrada'));
});

module.exports = router;
