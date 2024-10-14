import React, { useState } from 'react';

const UrlShortener = () => {
  const [longUrl, setLongUrl] = useState(''); // State to hold the long URL input
  const [shortUrl, setShortUrl] = useState(''); // State to hold the shortened URL

  // Function to call the backend API and shorten the URL
  const shortenUrl = async (longUrl) => {
    try {
      const response = await fetch('/api/url/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ longUrl }),
      });

      const data = await response.json();
      setShortUrl(data.shortUrl); // Set the shortened URL in the state
    } catch (error) {
      console.error('Error shortening URL:', error);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload on form submission
    shortenUrl(longUrl); // Call the shortenUrl function with the input longUrl
  };

  return (
    <div>
      <h1>URL Shortener</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter long URL"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)} // Update longUrl state when input changes
          required
        />
        <button type="submit">Shorten URL</button>
      </form>

      {shortUrl && (
        <div>
          <h3>Shortened URL:</h3>
          <a href={shortUrl} target="_blank" rel="noopener noreferrer">
            {shortUrl}
          </a>
        </div>
      )}
    </div>
  );
};

export default UrlShortener;
