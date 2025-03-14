import expressAsyncHandler from "express-async-handler";
import generateToken from '../utils/generateToken.js';
import User from "../models/user.model.js";
import Article from '../models/article.model.js';

// @desc    Login user + set token in cookie
// @route   POST api/users/login
// @access  Public
export const loginUser = expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPasswords(password))) {
        generateToken(res, user._id);
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});

// @desc    Register a new user
// @route   POST api/users/register
// @access  Public
export const registerUser = expressAsyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error('User with that email already exists');
    }

    const newUser = await User.create({ name, email, password });
    if (newUser) {
        generateToken(res, newUser._id);
        res.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

// @desc    Logout user
// @route   POST api/users/logout
// @access  Public
export const logoutUser = expressAsyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    });
    res.status(200).json({ message: 'User logged out' });
});

// @desc    Get user profile
// @route   GET api/users/profile
// @access  Private
export const getUserProfile = expressAsyncHandler(async (req, res) => {
    const user = {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        isAdmin: req.user.isAdmin,
        favoriteArticles: req.user.favoriteArticles,
    };
    res.status(200).json(user);
});

// @desc    Update user profile
// @route   PUT api/users/profile
// @access  Private
export const updateUserProfile = expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        generateToken(res, updatedUser._id);
        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc    Add article to user's favorite list
// @route   PUT api/users/favorite
// @access  Private
export const addFavoriteArticle = expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        const articleId = req.body.articleId;
        const articleExists = await Article.findById(articleId);

        if (!articleExists) {
            res.status(404);
            throw new Error('Article not found');
        }

        const isArticleSaved = user.favoriteArticles.find(
            (article) => article.articleId.toString() === articleId
        );

        if (isArticleSaved) {
            res.status(400);
            throw new Error('Article already in favorites');
        }

        user.favoriteArticles.push({ articleId });
        await user.save();
        res.status(201).json({ message: 'Article added to favorites' });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc    Remove article from user's favorite list
// @route   DELETE api/users/favorite
// @access  Private
export const removeFavoriteArticle = expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        const articleId = req.body.articleId;

        user.favoriteArticles = user.favoriteArticles.filter(
            (article) => article.articleId.toString() !== articleId
        );

        await user.save();
        res.status(200).json({ message: 'Article removed from favorites' });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc    Delete user
// @route   DELETE api/users/profile
// @access  Private
export const deleteUser = expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        await user.deleteOne();
        res.status(200).json({
            message: 'Deleted User',
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});