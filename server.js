const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken'); // Ensure you have this if you're using JWT

const app = express();
const port = 9999; // Set your desired port

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:3000', // Allow requests from the React app
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  allowedHeaders: ['Authorization'], // Allowed headers
  
  credentials: true, // Allow credentials (like cookies, authorization headers, etc.)
};

// Use the CORS middleware
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Handle preflight requests for all routes

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to validate token
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']; // Get the token directly

  if (!token) return res.sendStatus(401); // No token provided

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // Invalid token
    req.user = user; // Store user information in the request
    next(); // Continue to the next middleware or route
  });
};

// Your API endpoint
app.get('/getTest', authenticateToken, (req, res) => {
  res.json({ message: 'Success!' }); // Sample response
});

app.get('/selectPlatform/.', authenticateToken, (req, res) => {
  res.json({ message: 'Success!' }); // Sample response
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
