import expressAsyncHandler from 'express-async-handler';
import Article from '../models/article.model.js';

// @desc    Get all articles
// @route   GET api/articles
// @access  Public
export const getAllArticles = expressAsyncHandler(async (req, res) => {
    const articles = await Article.find({ isPublished: true }).sort({ createdAt: -1 });
    // Purposeful delay to test loaders
    await new Promise((resolve) => setTimeout(resolve, 500));
    res.status(200).json(articles);
});

// @desc    Get all user articles
// @route   GET api/articles/me
// @access  Public
export const getAllUserArticles = expressAsyncHandler(async (req, res) => {
    const articles = await Article.find({ user: req.user._id }).sort({ createdAt: -1 });
    // Purposeful delay to test loaders
    await new Promise((resolve) => setTimeout(resolve, 500));
    res.status(200).json(articles);
});

// @desc    Get article by ID
// @route   GET api/articles/:id
// @access  Public
export const getArticleById = expressAsyncHandler(async (req, res) => {
    const article = await Article.findById({ _id: req.params.id });

    if (article) {
        // Purposeful delay to test loaders
        await new Promise((resolve) => setTimeout(resolve, 500));
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
    const articles = await Article.find({ isPublished: true }).sort({ createdAt: -1 }).limit(5);
    // Purposeful delay to test loaders
    await new Promise((resolve) => setTimeout(resolve, 500));
    res.status(200).json(articles);
});

// @desc    Create a new article
// @route   POST api/articles
// @access  Private
export const createArticle = expressAsyncHandler(async (req, res) => {
    const languages = {
        en: { title: 'My Article', date: new Date(), content: '' },
        de: { title: 'Mi Artículo', date: new Date(), content: '' },
        es: { title: 'Mon Article', date: new Date(), content: '' },
        fr: { title: 'Mein Artikel', date: new Date(), content: '' },
        pt: { title: 'Meu Artigo', date: new Date(), content: '' }
    };

    const article = new Article({
        languages,
        isPublished: false,
        user: req.user._id
    });

    const createdArticle = await article.save();
    res.status(201).json(createdArticle);
});

// @desc    Update an article
// @route   PUT api/articles/:id
// @access  Private
export const updateArticle = expressAsyncHandler(async (req, res) => {
    const { languages } = req.body;
    console.log(languages)

    if (!languages || typeof languages !== 'object') {
        res.status(400);
        throw new Error('Languages field is required and must be an object');
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
// @access  Private
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
