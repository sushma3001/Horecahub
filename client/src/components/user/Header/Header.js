import React from 'react';
import './Header.css';

const Header = () => {
    return (
        <header className="header">
            <div className="header-content">
                <div className="logo">
                    <img src="/path-to-your-logo/logo.png" alt="HorecaHub Logo" />
                </div>
                <div className="contact-info">
                    <p>Email: info@horecahub.com</p>
                    <p>Contact: +353-123456789</p>
                </div>
            </div>
        </header>
    );
};

export default Header;
