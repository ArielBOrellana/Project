import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import listingRouter from './routes/listing.route.js';
import cookieParser from 'cookie-parser';
import path from 'path';

dotenv.config(); // Load environment variables from .env file

// Connect to MongoDB using the connection string in the .env file
mongoose.connect(process.env.MONGO).then(() => {
    console.log('Connected to MongoDB!');
}).catch((err) => {
    console.log(err); // Log connection error if it occurs
});

const __dirname = path.resolve(); // Resolve the current directory path to ensure compatibility across environments

const app = express(); // Initialize Express app

app.use(express.json()); // Middleware to parse incoming JSON requests

app.use(cookieParser()); // Middleware to parse cookies in requests

// Start the server on port 3000
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

// Route handlers for different API endpoints
app.use('/api/user', userRouter); // Routes related to user operations
app.use('/api/auth', authRouter); // Routes related to authentication
app.use('/api/listing', listingRouter); // Routes related to listings

// Serve static files from the 'dist' directory in the client folder
// This allows the server to deliver the production build of the frontend
app.use(express.static(path.join(__dirname, '/client/dist')));

// Catch-all route to handle any requests not matched by API routes
// This ensures that React's client-side routing works properly in production
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

// Global error-handling middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500; // Default to 500 if no status code is provided
    const message = err.message || 'Internal Server Error'; // Default to generic error message
    return res.status(statusCode).json({
        success: false,
        statusCode, // Return the status code for debugging 
        message, // Return the error message
    });
});
