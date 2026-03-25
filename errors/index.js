// errors/index.js — Clases de error personalizadas con códigos HTTP

class BadRequestError extends Error {
  constructor(message = 'Solicitud incorrecta') {
    super(message);
    this.statusCode = 400;
  }
}

class UnauthorizedError extends Error {
  constructor(message = 'Se requiere autorización') {
    super(message);
    this.statusCode = 401;
  }
}

class ForbiddenError extends Error {
  constructor(message = 'Acceso denegado') {
    super(message);
    this.statusCode = 403;
  }
}

class NotFoundError extends Error {
  constructor(message = 'Recurso no encontrado') {
    super(message);
    this.statusCode = 404;
  }
}

class ConflictError extends Error {
  constructor(message = 'El recurso ya existe') {
    super(message);
    this.statusCode = 409;
  }
}

module.exports = {
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
};
