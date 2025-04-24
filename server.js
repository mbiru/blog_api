
// filepath: c:\Users\USER\OneDrive\Documents\blog-api\server.js
const connectDB = require('./config/db');
const app = require('./app');

// Load env vars
require('dotenv').config();

// Connect to MongoDB
connectDB();

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});