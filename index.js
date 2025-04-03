const express = require('express');
const db = require('./config');
// Start server
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3000;

const bodyParser = require('body-parser');

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});