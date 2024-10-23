const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const sliderRoutes = require('./routes/sliderRoutes');
const connectDB = require('./config/db');
const app = express();



// Load environment variables
dotenv.config();


// Connect to MongoDB (after loading environment variables)
connectDB();


// Middleware
app.use(cors());
app.use(express.json());


app.use('/uploads', express.static('uploads')); // Serve static files from the uploads folder

// Slider routes
app.use('/api/sliders', sliderRoutes);

// Basic route to test the server
app.get('/', (req, res) => {
    res.send('Server is running');
});


// Error handling for unknown routes
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
