import React, { useState } from 'react';

const AddSliderForm = ({ onAddSlider }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null); // File state for image upload

    const handleImageChange = (e) => {
        setImage(e.target.files[0]); // Set the image file selected
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create a form data object to send the image and other details
        const formData = new FormData();
        formData.append('image', image); // Append the image file to the form data
        formData.append('title', title);
        formData.append('description', description);

        onAddSlider(formData, clearForm); // Pass formData to the parent function for backend submission
    };

    // Clear the form fields after submission
    const clearForm = () => {
        setTitle('');
        setDescription('');
        setImage(null);
        document.getElementById("imageInput").value = null; // Reset file input
    };

    return (
        <form onSubmit={handleSubmit} className="add-slider-form">
            <h2>Add New Slider</h2>
            <div>
                <label>Image:</label>
                <input 
                    type="file" 
                    id="imageInput" 
                    onChange={handleImageChange} 
                    required 
                />
            </div>
            <div>
                <label>Title:</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Description:</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Add Slider</button>
        </form>
    );
};

export default AddSliderForm;
