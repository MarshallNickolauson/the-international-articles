import express from 'express';
import {
    getAllArticles,
    getArticleById,
    get5RecentArticles,
    createArticle,
    updateArticle,
    deleteArticle,
} from '../controllers/article.controller.js';
import { protect, admin } from '../middleware/auth.middleware.js';
const router = express.Router();

router.route('/').get(getAllArticles).post(createArticle);
router.route('/recent').get(get5RecentArticles);
router.route('/:id').get(getArticleById).put(updateArticle).delete(deleteArticle);

export default router;