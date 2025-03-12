import expressAsyncHandler from 'express-async-handler';
import Article from '../models/article.model.js';

// @desc    Get all articles
// @route   GET api/articles
// @access  Public
export const getAllArticles = expressAsyncHandler(async (req, res) => {
    const articles = await Article.find({}).sort({ createdAt: -1 });
    res.status(200).json(articles);
});

// @desc    Get article by ID
// @route   GET api/articles/:id
// @access  Public
export const getArticleById = expressAsyncHandler(async (req, res) => {
    const article = await Article.findById(req.params.id);

    if (article) {
        res.status(200).json(article);
    } else {
        res.status(404);
        throw new Error('Article not found');
    }
});

// @desc    Get 5 most recent articles
// @route   GET api/articles/recent
// @access  Public
export const get5RecentArticles = expressAsyncHandler(async (req, res) => {
    const articles = await Article.find({}).sort({ createdAt: -1 }).limit(5);
    res.status(200).json(articles);
});

// @desc    Create a new article
// @route   POST api/articles
// @access  Private/Admin
export const createArticle = expressAsyncHandler(async (req, res) => {
    const { languages } = req.body;

    if (!languages || typeof languages !== 'object') {
        res.status(400);
        throw new Error('Languages field is required and must be an object');
    }

    for (const lang in languages) {
        const { title, date, content } = languages[lang] || {};
        if (!title || !date || !content) {
            res.status(400);
            throw new Error(
                `Each language must have a title, date, and content. Missing fields in: ${lang}`
            );
        }
    }

    const article = new Article({
        languages,
    });

    const createdArticle = await article.save();
    res.status(201).json(createdArticle);
});

// @desc    Update an article
// @route   PUT api/articles/:id
// @access  Private/Admin
export const updateArticle = expressAsyncHandler(async (req, res) => {
    const { languages } = req.body;

    if (!languages || typeof languages !== 'object') {
        res.status(400);
        throw new Error('Languages field is required and must be an object');
    }

    for (const lang in languages) {
        const { title, date, content } = languages[lang] || {};
        if (!title || !date || !content) {
            res.status(400);
            throw new Error(
                `Each language must have a title, date, and content. Missing fields in: ${lang}`
            );
        }
    }

    const article = await Article.findById(req.params.id);

    if (article) {
        article.languages = languages;

        const updatedArticle = await article.save();
        res.status(200).json(updatedArticle);
    } else {
        res.status(404);
        throw new Error('Article not found');
    }
});

// @desc    Delete an article
// @route   DELETE api/articles/:id
// @access  Private/Admin
export const deleteArticle = expressAsyncHandler(async (req, res) => {
    const article = await Article.findById(req.params.id);

    if (article) {
        await article.deleteOne();
        res.status(200).json({ message: 'Article removed' });
    } else {
        res.status(404);
        throw new Error('Article not found');
    }
});