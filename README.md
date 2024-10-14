## Description
This project is a simple URL shortener service that allows users to input a long URL and receive a shortened version. When users visit the shortened URL, they are automatically redirected to the original long URL.

## Features
Shorten long URLs through an API.
Store URL mappings in a database MongoDB.
Redirect users to the original URL when visiting the shortened link.
A React.js frontend where users can submit URLs and receive shortened versions.
Tech Stack
Backend: Node.js, Express.js, and MongoDB for storing URL mappings.
Frontend: React.js for a user-friendly interface to shorten URLs and display results.
Database: MongoDB (can be replaced with SQLite if needed).

## Project Structure
bash
url-shortener
├── backend/                # Express.js backend API
│   ├── models/             # Mongoose models schema for storing URL mappings
│   ├── routes/             # API routes for handling URL shortening and redirection
│   ├── .env/               # url logic            
│   └── app.js           # Express server setup,Database and other configurations

├── frontend/               # React.js frontend app
│   ├── public/             # Static assets
│   ├── src/                # React components and logic
│   │   ├── components/     # Input form, shortened URL display, etc.
│   └── App.js              # Main React app component
├── README.md               # Project documentation
└── package.json            # Project dependencies and scripts

## Prerequisites
Node.js (v14+)
npm 
MongoDB
Installation

## Clone the repository:
bash
Copy code
git clone https://github.com/your-username/url-shortener.git
cd url-shortener

## Backend Setup:
Navigate to the backend folder and install dependencies:
bash
Copy code
cd backend
npm install
Create a .env file for the backend configuration:
env
Copy code
MONGO_URI=mongodb://localhost:27017/urlshortener ## MongoDB URL 
BASE_URL=http://localhost:5000  
Start the backend server:
bash
Copy code
node app.js

## Frontend Setup:
Navigate to the frontend folder and install dependencies:

bash
Copy code
cd ../frontend
npm install
Start the React development server:

bash
Copy code
npm start
The frontend will be served at http://localhost:3000 by default.

## Usage
Open the React.js frontend in your browser by visiting http://localhost:3000.
Enter a long URL in the input field and click "Shorten".
The shortened URL will appear. When clicked, you will be redirected to the original long URL.
You can access shortened URLs directly in your browser by entering http://localhost:5000/<shortened_code>.
API Endpoints
POST /api/shorten: Create a shortened URL for a long URL.

bash
Copy code
curl -X POST http://localhost:5000/api/shorten \
  -H "Content-Type: application/json" \
  -d '{"longUrl": "https://example.com"}'
GET /
: Redirect to the original long URL using the shortened code.

Example: http://localhost:5000/abc123 will redirect to the corresponding long URL.

## Database Configuration
If using MongoDB, ensure that your MongoDB instance is running locally or configure the database connection string in the .env file.
Custom Short URLs: Allow users to specify custom codes for their shortened URLs.
Analytics: Track how many times a shortened URL is visited.
User Authentication: Add user authentication to track user-specific URLs