// middlewares/errorHandler.js — Manejador centralizado de errores

module.exports = (err, req, res, next) => { // eslint-disable-line no-unused-vars
  const statusCode = err.statusCode || 500;
  const message = statusCode === 500
    ? 'Se ha producido un error en el servidor'
    : err.message;

  res.status(statusCode).json({ message });
};
