import express from 'express';
import {
    getAllArticles,
    getArticleById,
    get5RecentArticles,
    createArticle,
    updateArticle,
    deleteArticle,
    getAllUserArticles,
    toggleArticlePublished,
} from '../controllers/article.controller.js';
import { protect, admin } from '../middleware/auth.middleware.js';
const router = express.Router();

router.route('/').get(getAllArticles).post(protect, createArticle);
router.route('/me').get(protect, getAllUserArticles);
router.route('/recent').get(get5RecentArticles);
router.route('/:id').get(getArticleById).put(protect, updateArticle).delete(protect, deleteArticle);
router.route('/:id/toggle-published').put(protect, toggleArticlePublished);

export default router;