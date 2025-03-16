import express from 'express';
const router = express.Router();
import { protect } from '../middleware/auth.middleware.js';
import { addFavoriteArticle, deleteUser, getUserProfile, loginUser, logoutUser, registerUser, removeFavoriteArticle, updateUserProfile } from '../controllers/user.controller.js';

router.post('/login', loginUser);
router.post('/register', registerUser);
router.post('/logout', logoutUser);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile).delete(protect, deleteUser);
router.route('/favorites').put(protect, addFavoriteArticle).delete(protect, removeFavoriteArticle);

export default router;