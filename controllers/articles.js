// controllers/articles.js — Controladores de artículos

const Article = require('../models/article');
const { BadRequestError, ForbiddenError, NotFoundError } = require('../errors');

// GET /articles — Devuelve todos los artículos guardados por el usuario autenticado
const getArticles = async (req, res, next) => {
  try {
    const articles = await Article.find({ owner: req.user._id });
    res.json(articles);
  } catch (err) {
    return next(err);
  }
};

// POST /articles — Crea un artículo guardado por el usuario autenticado
const createArticle = async (req, res, next) => {
  const { keyword, title, text, date, source, link, image } = req.body;

  try {
    const article = await Article.create({
      keyword,
      title,
      text,
      date,
      source,
      link,
      image,
      owner: req.user._id,
    });

    res.status(201).json(article);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(new BadRequestError('Datos del artículo no válidos'));
    }
    return next(err);
  }
};

// DELETE /articles/:articleId — Elimina un artículo por _id
const deleteArticle = async (req, res, next) => {
  const { articleId } = req.params;

  try {
    const article = await Article.findById(articleId).select('+owner');

    if (!article) {
      return next(new NotFoundError('Artículo no encontrado'));
    }

    // Solo el propietario puede borrar su artículo
    if (article.owner.toString() !== req.user._id) {
      return next(new ForbiddenError('No tienes permiso para eliminar este artículo'));
    }

    await Article.findByIdAndDelete(articleId);
    res.json({ message: 'Artículo eliminado correctamente' });
  } catch (err) {
    if (err.name === 'CastError') {
      return next(new BadRequestError('ID de artículo no válido'));
    }
    return next(err);
  }
};

module.exports = { getArticles, createArticle, deleteArticle };
