import jwt from 'jsonwebtoken';
import expressAsyncHandler from 'express-async-handler';
import User from '../models/user.model.js';

export const protect = expressAsyncHandler(async (req, res, next) => {
    let token;
    token = req.cookies.jwt;

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.userId).select('-password');
        } catch (error) {
            res.status(401);
            throw new Error('Not authorized - Invalid token');
        }
    } else {
        res.status(401);
        throw new Error('Not authorized - No token');
    }

    next();
});

export const admin = expressAsyncHandler(async (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401);
        throw new Error('Not authorized as an admin');
    }
});