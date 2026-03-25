// models/user.js — Esquema de Usuario

const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'El correo electrónico es obligatorio'],
    unique: true,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: 'El correo electrónico no tiene un formato válido',
    },
  },
  password: {
    type: String,
    required: [true, 'La contraseña es obligatoria'],
    select: false, // No se devuelve por defecto en las consultas
  },
  name: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    minlength: [2, 'El nombre debe tener al menos 2 caracteres'],
    maxlength: [30, 'El nombre no puede tener más de 30 caracteres'],
  },
});

module.exports = mongoose.model('User', userSchema);
