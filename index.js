const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRouter');
const produceRoutes = require('./routes/produceroutes');
const stockManagementRoutes = require('./routes/stockmanagementRouters');
const salesRoutes = require('./routes/salesroutes');
const receiptRoutes = require('./routes/receiptroutes');


// const Sales = require('./salesmodels') // Import the Produce model
const path = require('path');
const app = express();

// Load environment variables from .env file
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
   
// Routes
app.use('/api/users', userRoutes);
app.use('/api/produce', produceRoutes);
app.use('/api/stock', stockManagementRoutes);
app.use('/api/sales', salesRoutes);
app.use('/api/receipts', receiptRoutes);


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});
    
// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});



