// controllers/users.js — Controladores de usuario

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {
  BadRequestError,
  UnauthorizedError,
  ConflictError,
  NotFoundError,
} = require('../errors');

const JWT_SECRET = process.env.NODE_ENV === 'production'
  ? process.env.JWT_SECRET
  : 'dev-secret-key';

// POST /signup — Registrar nuevo usuario
const createUser = async (req, res, next) => {
  const { email, password, name } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashedPassword, name });

    res.status(201).json({
      _id: user._id,
      email: user.email,
      name: user.name,
    });
  } catch (err) {
    if (err.code === 11000) {
      return next(new ConflictError('Ya existe un usuario con ese correo electrónico'));
    }
    if (err.name === 'ValidationError') {
      return next(new BadRequestError('Datos de usuario no válidos'));
    }
    return next(err);
  }
};

// POST /signin — Iniciar sesión y obtener JWT
const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return next(new UnauthorizedError('Correo electrónico o contraseña incorrectos'));
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return next(new UnauthorizedError('Correo electrónico o contraseña incorrectos'));
    }

    const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });

    res.json({ token });
  } catch (err) {
    return next(err);
  }
};

// GET /users/me — Obtener datos del usuario autenticado
const getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return next(new NotFoundError('Usuario no encontrado'));
    }

    res.json({ email: user.email, name: user.name });
  } catch (err) {
    return next(err);
  }
};

module.exports = { createUser, login, getCurrentUser };
