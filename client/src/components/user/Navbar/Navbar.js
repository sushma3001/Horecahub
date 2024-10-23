import React, { useState } from 'react';
import './Navbar.css';

const Navbar = () => {
    const [dropdown, setDropdown] = useState(false);

    return (
        <nav className="navbar">
            <ul className="nav-links">
                <li><a href="/">Home</a></li>

                {/* Dropdown for Products */}
                <li className="nav-item"
                    onMouseEnter={() => setDropdown(true)}
                    onMouseLeave={() => setDropdown(false)}>
                    <a href="/products">Products</a>
                    {dropdown && (
                        <ul className="dropdown">
                            <li><a href="/products/disposals">Disposals</a></li>
                            <li><a href="/products/vending-machine">Vending Machine</a></li>
                        </ul>
                    )}
                </li>

                <li><a href="/about">About Us</a></li>
                <li><a href="/custom-products">Customized Products</a></li>
                <li><a href="/login">Login</a></li>
                <li><a href="/cart"><i className="fas fa-shopping-cart"></i></a></li>
            </ul>
        </nav>
    );
};

export default Navbar;
