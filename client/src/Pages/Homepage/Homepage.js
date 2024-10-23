import React from 'react';
import Header from '../../components/user/Header/Header';
import Navbar from '../../components/user/Navbar/Navbar';
import Slider from '../../components/Slider/Slider';

const Homepage = () => {
    return (
        <div>
            <Header />
            <Navbar />
            <Slider />
            <div className="homepage-content">
                <h1>Welcome to HorecaHub</h1>
                {/* The Slider component will go here later */}
            </div>
        </div>
    );
};

export default Homepage;
