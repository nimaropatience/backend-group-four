const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const Produce = require('./models/producemodels');
// const Sales = require('./salesmodels') // Import the Produce model
const path = require('path');
const app = express();
app.use(express.json());
// Load environment variables from .env file
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Root endpoint (for frontend basic data)
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the API server' });

});

// app.post('/api/produce', async (req, res) => {
//     console.log(req.body);
//     try {
//         const produce = await Produce.create(req.body);
//         res.status(200).json(produce);
//     } catch (error) {
//         res.status(500).json({ message: "Error has occurred" });
//     }
// });
 


//     try {
//         const produce = await Produce.create(req.body);
//         res.status(200).json(produce);
//     } catch (error) {
//         res.status(500).json({ message: "Error has occurred" });
//     }

app.post('/api/produce', async (req, res) => {
    console.log(req.body);
    res.send(req.body);
});

app.get('/api/produce', async (req, res) => {
    console.log(req.body);
    res.send(req.body);
});

app.delete('/api/produce', async (req, res) => {
    console.log(req.body);
    res.send(req.body);
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