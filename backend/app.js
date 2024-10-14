import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import urlRoutes from './routes/urlRoutes.js';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
mongoose
  .connect('mongodb://localhost:27017/urlshortener', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch((err) => console.error('MongoDB connection error:', err));
app.use(cors({origin: 'http://localhost:3000', // Allow your frontend domain
  methods: 'GET,POST',}));

// Define a test route for the root URL
app.get('/', (req, res) => {
    res.send('Welcome to the URL Shortener API!'); // A simple message for the root URL
});

// Use the URL routes
app.use('/', urlRoutes);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB and start the server
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err); // More informative error logging
    process.exit(1); // Exit the application if MongoDB connection fails
  });
