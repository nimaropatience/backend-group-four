const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Load environment variables from .env file
dotenv.config();

// Ensure MONGO_URI is defined
if (!process.env.MONGO_URI) {
    console.error("Error: MONGO_URI is not defined in the .env file");
    process.exit(1);
}

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Root endpoint (for frontend basic data)
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the API server' });
});

// Connect to MongoDB using the URI from .env
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("Connected to MongoDB database!");
})

.catch((err) => {
    console.error("Not connected to the database!", err);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// // Error handling middleware
// app.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).json({ message: 'Internal server error' });
// });
