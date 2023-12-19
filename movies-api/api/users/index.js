import express from 'express';
import User from './userModel';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

const router = express.Router(); // eslint-disable-line

// Get all users
router.get('/', async (req, res) => {
    const users = await User.find();
    res.status(200).json(users);
});

// This function will be called every a bearer token needs to verified for a protected route
const verifyToken = (req, res, next) => {
    let token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No token provided.' });
    }
    // Remove the "Bearer " part from the token
    if (token.startsWith('Bearer ') || token.startsWith('BEARER ')) {
        token = token.slice(7);
    }
    try { // Verify that the token is valid
        console.log('Verifying token:', token);
        const decoded = jwt.verify(token, process.env.SECRET);
        console.log('Token decoded:', decoded);
        req.user = decoded;
        next();
      } catch (error) {
        console.error('Token verification error:', error);
        return res.status(401).json({ message: 'Invalid token.', details: error.message });
    } 
};
  
router.post('/', asyncHandler(async (req, res) => {
    try {
        if (!req.body.username || !req.body.password) {
            return res.status(400).json({ success: false, msg: 'Username and password are required.' });
        }
        if (req.query.action === 'register') {
            await registerUser(req, res);
        } else {
            await authenticateUser(req, res);
        }
    } catch (error) {
        // Log the error and return a generic error message
        console.error(error);
        res.status(500).json({ success: false, msg: 'Internal server error.' });
    }
}));

// Update a user by ID
router.put('/:id', async (req, res) => {
    if (req.body._id) delete req.body._id;
    const result = await User.updateOne({
        _id: req.params.id,
    }, req.body);
    if (result.matchedCount) {
        res.status(200).json({ code:200, msg: 'User Updated Sucessfully' });
    } else {
        res.status(404).json({ code: 404, msg: 'Unable to Update User' });
    }
});

async function registerUser(req, res) {
    await User.create(req.body);
    res.status(201).json({ success: true, msg: 'User successfully created.' });
}

async function authenticateUser(req, res) {
    const user = await User.findByUserName(req.body.username);
    if (!user) {
        return res.status(401).json({ success: false, msg: 'Authentication failed. User not found.' });
    }
    const isMatch = await user.comparePassword(req.body.password);
    if (isMatch) {
        const token = jwt.sign({ _id: user._id, username: user.username }, process.env.SECRET);
        res.status(200).json({ success: true, token: 'Bearer ' + token, userId: user._id });
    } else {
        res.status(401).json({ success: false, msg: 'Wrong password.' });
    }
}

// Add a movie to a user's favorites list
router.post('/:userId/favorites', verifyToken, asyncHandler(async (req, res) => {
    if (!req.params.userId || !mongoose.Types.ObjectId.isValid(req.params.userId)) {
        return res.status(400).json({ message: 'Invalid user ID' });
    }
    const { userId } = req.params;
    const { movieId } = req.body;
    try {
        if (req.user._id.toString() !== userId) {
            return res.status(403).json({ message: 'Not authorized to access this resource' });
        }
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        await User.updateOne(
          { _id: userId }, 
          { $addToSet: { favorites: movieId.toString() } } // Using $addToSet to prevent duplicates
        );
        const updatedUser = await User.findById(userId);
        res.status(200).json({ 
          message: 'Favorite movie added successfully.', 
          favorites: updatedUser.favorites 
        });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.toString() });
    }
}));

// GET all favorites for a user
router.get('/:userId/favorites', verifyToken, asyncHandler(async (req, res) => {
    if (!req.params.userId || !mongoose.Types.ObjectId.isValid(req.params.userId)) {
        return res.status(400).json({ message: 'Invalid user ID' });
    }
    const { userId } = req.params;
    if (req.user._id.toString() !== userId) {
        return res.status(403).json({ message: 'Not authorized to access this resource' });
    }
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ favorites: user.favorites });
    } catch (error) {
        console.error('Server error:', error.message); // Log the error message
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
}));

// DELETE a favorite movie from a user's favorites list
router.delete('/:userId/favorites/:movieId', verifyToken, asyncHandler(async (req, res) => {
    const { userId, movieId } = req.params;
    if (req.user._id.toString() !== userId) {
        return res.status(403).json({ message: 'Not authorized to access this resource' });
    }
    try {
        // Use $pull to remove the movie from favorites without validating the entire document due to weird password validation error
        const result = await User.updateOne(
            { _id: userId },
            { $pull: { favorites: movieId } }
        );

        if (result.nModified === 0) {
            return res.status(404).json({ message: 'Movie not found in favorites' });
        }
        res.status(200).json({ 
            message: 'Favorite movie removed successfully.'
        });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.toString() });
    }
}));


export default router;