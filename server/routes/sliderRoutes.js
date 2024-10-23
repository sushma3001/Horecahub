const express = require('express');
const mongoose = require('mongoose');  // To handle ObjectId validation
const Slider = require('../models/Slider');  // Slider model
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');  // Folder where images will be stored
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);  // Create a unique filename
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 },  // Limit file size to 5MB
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/;
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = fileTypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Only images (jpeg, jpg, png, gif) are allowed'));
        }
    }
});

// GET: Fetch all slider data, limited to 5 for user display
router.get('/', async (req, res) => {
    try {
        const sliders = await Slider.find().limit(5);  // Limit the result to 5 sliders
        res.json(sliders);
    } catch (error) {
        console.error('Error fetching sliders:', error);
        res.status(500).json({ message: 'Error fetching sliders' });
    }
});


// POST: Add a new slider with image upload
router.post('/', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            console.error('No file uploaded');
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const { title, description } = req.body;
        
        // Normalize the file path to use forward slashes instead of backslashes
        const imagePath = req.file.path.replace(/\\/g, '/');  // Convert backslashes to forward slashes

        if (!title || !description || !imagePath) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Create a new slider with the normalized image path
        const newSlider = new Slider({
            image: imagePath,  // Save with normalized path
            title,
            description
        });

        const savedSlider = await newSlider.save();
        res.json(savedSlider);
    } catch (error) {
        console.error('Error adding slider:', error);
        res.status(500).json({ message: 'Error adding slider' });
    }
});

// DELETE: Delete a slider by ID and remove associated image
router.delete('/:id', async (req, res) => {
    const sliderId = req.params.id;
    console.log(`Deleting slider with ID: ${sliderId}`);

    // Validate the ID to ensure it's a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(sliderId)) {
        return res.status(400).json({ message: 'Invalid slider ID' });
    }

    try {
        const slider = await Slider.findById(sliderId);
        if (!slider) {
            return res.status(404).json({ message: 'Slider not found' });
        }

        // Delete the associated image file
        if (slider.image) {
            fs.unlink(slider.image, (err) => {
                if (err) {
                    console.error('Error deleting image:', err);
                } else {
                    console.log('Image deleted successfully');
                }
            });
        }

        // Remove the slider from the database using deleteOne
        await slider.deleteOne();
        res.json({ message: 'Slider deleted successfully' });

    } catch (error) {
        console.error('Error deleting slider:', error);
        res.status(500).json({ message: 'Error deleting slider' });
    }
});

module.exports = router;
