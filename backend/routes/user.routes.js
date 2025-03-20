import express from 'express';
const router = express.Router();
import { protect } from '../middleware/auth.middleware.js';
import { deleteUser, getUserProfile, loginUser, logoutUser, registerUser, toggleFavoriteArticle, updateUserProfile } from '../controllers/user.controller.js';

router.post('/login', loginUser);
router.post('/register', registerUser);
router.post('/logout', logoutUser);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile).delete(protect, deleteUser);
router.route('/favorite').put(protect, toggleFavoriteArticle);

export default router;