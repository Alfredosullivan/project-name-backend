// middlewares/auth.js — Middleware de autenticación JWT

const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../errors');

const JWT_SECRET = process.env.NODE_ENV === 'production'
  ? process.env.JWT_SECRET
  : 'dev-secret-key';

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError('Token de autorización no proporcionado'));
  }

  const token = authorization.replace('Bearer ', '');

  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return next(new UnauthorizedError('Token inválido o expirado'));
  }

  req.user = payload;
  return next();
};
