import React from 'react';
import { Link } from 'react-router-dom';  // Using react-router-dom for navigation
import './AdminNavbar.css';  // Add your custom styles here

const AdminNavbar = () => {
    return (
        <nav className="admin-navbar">
            <ul>
                <li>
                    <Link to="/admin">Dashboard</Link>
                </li>
                <li>
                    <Link to="/admin/slider-management">Slider Management</Link>
                </li>
                {/* Add more links as needed */}
            </ul>
        </nav>
    );
};

export default AdminNavbar;
