import express from 'express';
import { nanoid } from 'nanoid';
import Url from '../models/url.js';

const router = express.Router();

// Middleware to validate long URL
const validateUrl = (req, res, next) => {
  const { longUrl } = req.body;
  if (!longUrl) {
    return res.status(400).json({ error: 'URL is required' });
  }
  next();
};

// POST route to shorten a URL
router.post('/shorten', async (req, res) => {
  const { longUrl } = req.body;

  if (!longUrl) {
    return res.status(400).json({ error: 'URL is required' });
  }

  console.log("Received longUrl:", longUrl); // Log the longUrl received

  const urlCode = nanoid(6);  // Generate a short unique code
  const shortUrl = `${req.protocol}://${req.get('host')}/${urlCode}`;

  try {
    let existingUrl = await Url.findOne({ longUrl });
    if (existingUrl) {
      return res.json({ shortUrl: existingUrl.shortUrl });
    }

    const newUrl = new Url({ longUrl, shortUrl, urlCode });
    await newUrl.save();

    console.log("Saved new URL:", newUrl); // Log the saved URL object

    res.json({ shortUrl });
  } catch (err) {
    console.error("Error saving URL:", err);  // Log any errors
    res.status(500).json({ error: 'Server error' });
  }
});



// GET route to handle redirecting from the shortened URL
router.get('/:urlCode', async (req, res) => {
  const { urlCode } = req.params;  // Extract urlCode from request parameters

  try {
    const url = await Url.findOne({ urlCode });  // Find the URL by its short code
    if (url) {
      // Redirect to the original long URL if found
      return res.redirect(url.longUrl);
    } else {
      return res.status(404).json({ error: 'URL not found' }); // Handle case where URL is not found
    }
  } catch (err) {
    console.error('Error finding the URL:', err); // Log the error for debugging
    return res.status(500).json({ error: 'Server error' });
  }
});

export default router;
