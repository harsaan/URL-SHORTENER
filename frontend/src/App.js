import React, { useState } from 'react';
import axios from 'axios';



function App() {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Long URL:', longUrl);  // Log the long URL to check the value
  
    try {
      const res = await axios.post('http://localhost:5000/shorten', { longUrl });
      setShortUrl(res.data.shortUrl);
    } catch (error) {
      console.error('Error creating short URL:', error);  // Log any errors from the API
    }
  };
  

  return (
    <div className="App">
      <h1>URL Shortener</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="url"
          placeholder="Enter long URL"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          required
          style={{ padding: '10px', width: '300px' }}
        />
        <button type="submit" style={{ padding: '10px 20px', marginLeft: '10px' }}>
          Shorten URL
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {shortUrl && (
        <div>
          <h2>Shortened URL:</h2>
          <a href={shortUrl} target="_blank" rel="noopener noreferrer">
            {shortUrl}
          </a>
        </div>
      )}
    </div>
  );
}

export default App;
