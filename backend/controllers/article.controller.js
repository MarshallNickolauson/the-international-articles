import expressAsyncHandler from 'express-async-handler';
import Article from '../models/article.model.js';

// @desc    Get all articles
// @route   GET api/articles
// @access  Public
export const getAllArticles = expressAsyncHandler(async (req, res) => {
    const articles = await Article.find({ isPublished: true }).sort({ createdAt: -1 });
    res.status(200).json(articles);
});

// @desc    Get all user articles
// @route   GET api/articles/me
// @access  Public
export const getAllUserArticles = expressAsyncHandler(async (req, res) => {
    const articles = await Article.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(articles);
});

// @desc    Get article by ID
// @route   GET api/articles/:id
// @access  Public
export const getArticleById = expressAsyncHandler(async (req, res) => {
    const article = await Article.findById({ _id: req.params.id });

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
    const articles = await Article.find({ isPublished: true }).sort({ createdAt: -1 }).limit(5);
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
        pt: { title: 'Meu Artigo', date: new Date(), content: '' },
    };

    const article = new Article({
        languages,
        isPublished: false,
        user: req.user._id,
        imageUrl: '',
    });

    const createdArticle = await article.save();
    res.status(201).json(createdArticle);
});

// @desc    Search articles by keyword in any language
// @route   GET api/articles/search
// @access  Public
export const searchArticles = expressAsyncHandler(async (req, res) => {
    const { query, language } = req.query;

    if (!query || query.trim() === '') {
        res.status(400);
        throw new Error('Search query is required');
    }

    if (!language) {
        res.status(400);
        throw new Error('Valid language is required');
    }

    const articles = await Article.find({
        isPublished: true,
        $or: [{ [`languages.${language}.title`]: { $regex: query, $options: 'i' } }, { [`languages.${language}.content`]: { $regex: query, $options: 'i' } }],
    });

    res.status(200).json(articles.length > 0 ? articles : []);
});

// @desc    Get 3 articles about mental health (for dashboard)
// @route   GET api/articles/get3MentalHealthArticles
// @access  Public
export const get3MentalHealthArticles = expressAsyncHandler(async (req, res) => {
    const articles = await Article.find({
        isPublished: true,
        $or: [{ [`languages.en.title`]: { $regex: 'mental', $options: 'i' } }, { [`languages.en.content`]: { $regex: 'mental', $options: 'i' } }],
    }).sort({ createdAt: -1 }).limit(3);

    res.status(200).json(articles.length > 0 ? articles : []);
});

// @desc    Get 3 articles about business (for dashboard)
// @route   GET api/articles/3Business
// @access  Public
export const get3BusinessArticles = expressAsyncHandler(async (req, res) => {
    const articles = await Article.find({
        isPublished: true,
        $or: [{ [`languages.en.title`]: { $regex: 'business', $options: 'i' } }, { [`languages.en.content`]: { $regex: 'business', $options: 'i' } }],
    }).sort({ createdAt: -1 }).limit(3);

    res.status(200).json(articles.length > 0 ? articles : []);
});

// @desc    Get 3 articles about identity (for dashboard)
// @route   GET api/articles/3Identity
// @access  Public
export const get3IdentityArticles = expressAsyncHandler(async (req, res) => {
    const articles = await Article.find({
        isPublished: true,
        $or: [{ [`languages.en.title`]: { $regex: 'identity', $options: 'i' } }, { [`languages.en.content`]: { $regex: 'identity', $options: 'i' } }],
    }).sort({ createdAt: -1 }).limit(3);

    res.status(200).json(articles.length > 0 ? articles : []);
});

// @desc    Update an article
// @route   PUT api/articles/:id
// @access  Private
export const updateArticle = expressAsyncHandler(async (req, res) => {
    const { languages, imageUrl } = req.body;

    if (!languages || typeof languages !== 'object') {
        res.status(400);
        throw new Error('Languages field is required and must be an object');
    }

    const article = await Article.findById(req.params.id);

    if (article) {
        article.languages = languages;
        article.imageUrl = imageUrl;
        const updatedArticle = await article.save();
        res.status(200).json(updatedArticle);
    } else {
        res.status(404);
        throw new Error('Article not found');
    }
});

// @desc    Toggle article published boolean
// @route   PUT api/articles/:id/toggle-published
// @access  Private
export const toggleArticlePublished = expressAsyncHandler(async (req, res) => {
    const article = await Article.findById(req.params.id);

    if (article) {
        article.isPublished = !article.isPublished;
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