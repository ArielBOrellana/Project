import express from 'express';
import { getListings, getListing, deleteListing, createListing } from '../controllers/listing.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

// Route to create a new listing, requires user authentication
router.post('/create', verifyToken, createListing);

// Route to delete a specific listing by ID, requires user authentication
router.delete('/delete/:id', verifyToken, deleteListing);

// Route to retrieve a specific listing by ID
router.get('/get/:id', getListing);

// Route to retrieve all listings
router.get('/get', getListings);

export default router; // Exporting the router for use in the main server file
