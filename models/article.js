// models/article.js — Esquema de Artículo de noticias

const mongoose = require('mongoose');
const validator = require('validator');

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: [true, 'La palabra clave es obligatoria'],
  },
  title: {
    type: String,
    required: [true, 'El título es obligatorio'],
  },
  text: {
    type: String,
    required: [true, 'El texto es obligatorio'],
  },
  date: {
    type: String,
    required: [true, 'La fecha es obligatoria'],
  },
  source: {
    type: String,
    required: [true, 'La fuente es obligatoria'],
  },
  link: {
    type: String,
    required: [true, 'El enlace es obligatorio'],
    validate: {
      validator: (value) => validator.isURL(value),
      message: 'El enlace debe ser una URL válida',
    },
  },
  image: {
    type: String,
    required: [true, 'La imagen es obligatoria'],
    validate: {
      validator: (value) => validator.isURL(value),
      message: 'La imagen debe ser una URL válida',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    select: false, // No se devuelve por defecto
  },
});

module.exports = mongoose.model('Article', articleSchema);
