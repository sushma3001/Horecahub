import React, { useState, useEffect } from 'react';
import './Slider.css';

const Slider = () => {
    const [sliderData, setSliderData] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        fetchSliderData();
    }, []);

    const fetchSliderData = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/sliders'); // Fetch slider data
            const data = await response.json();
            setSliderData(data.slice(0, 5));  // Limit to 5 sliders
        } catch (error) {
            console.error('Error fetching slider data:', error);
        }
    };

    // Auto-slide functionality
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) =>
                prevSlide === sliderData.length - 1 ? 0 : prevSlide + 1
            );
        }, 3000);

        return () => clearInterval(interval);
    }, [sliderData.length]);

    return (
        <div className="slider-container">
            {sliderData.map((slide, index) => (
                <div
                    key={slide._id}
                    className={`slider-item ${index === currentSlide ? 'active' : ''}`}
                    style={{ display: index === currentSlide ? 'block' : 'none' }}
                >
                    <img src={`http://localhost:5000/${slide.image.replace(/\\/g, '/')}`} alt={slide.title} className="slider-image" />
                    <div className="slider-content">
                        <h2>{slide.title}</h2>
                        <p>{slide.description}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Slider;
