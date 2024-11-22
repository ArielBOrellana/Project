import express from 'express';
import { getUser, getUserListings, deleteUser, test } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

// Route for testing purposes
router.get('/test', test);

// Route to delete a user by ID, requires user authentication
router.delete('/delete/:id', verifyToken, deleteUser);

// Route to get all listings associated with a specific user by user ID, requires user authentication
router.get('/listings/:id', verifyToken, getUserListings);

// Route to get details of a specific user by ID, requires user authentication
router.get('/:id', verifyToken, getUser);

export default router; // Exporting the router for use in the main server file
