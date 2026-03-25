// routes/articles.js — Rutas de artículos (protegidas)

const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getArticles, createArticle, deleteArticle } = require('../controllers/articles');

// GET /articles — Obtiene todos los artículos del usuario autenticado
router.get('/', getArticles);

// POST /articles — Crea un artículo nuevo
router.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      keyword: Joi.string().required(),
      title: Joi.string().required(),
      text: Joi.string().required(),
      date: Joi.string().required(),
      source: Joi.string().required(),
      link: Joi.string().uri().required(),
      image: Joi.string().uri().required(),
    }),
  }),
  createArticle,
);

// DELETE /articles/:articleId — Elimina un artículo por ID
router.delete(
  '/:articleId',
  celebrate({
    params: Joi.object().keys({
      articleId: Joi.string().hex().length(24).required(),
    }),
  }),
  deleteArticle,
);

module.exports = router;
