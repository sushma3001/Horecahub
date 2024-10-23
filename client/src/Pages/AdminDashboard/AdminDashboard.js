import React, { useState, useEffect } from 'react';
import AddSliderForm from '../../components/admin/AddSliderForm/AddSliderForm';
import { useLocation } from 'react-router-dom';  // To get the current route
import './AdminDashboard.css';

const AdminDashboard = () => {
    const [sliderData, setSliderData] = useState([]);
    const [error, setError] = useState('');
    const location = useLocation();  // This will give us the current route

    useEffect(() => {
        fetchSliderData();
    }, []);

    const fetchSliderData = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/sliders');
            const data = await response.json();
            setSliderData(data);
        } catch (error) {
            console.error('Error fetching sliders:', error);
        }
    };

    const addNewSlider = async (formData, clearForm) => {
        if (sliderData.length >= 5) {
            setError('Cannot add more than 5 sliders.');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/sliders', {
                method: 'POST',
                body: formData,
            });

            const addedSlider = await response.json();
            setSliderData([...sliderData, addedSlider]);

            setError('');
            if (clearForm) {
                clearForm();
            }
        } catch (error) {
            console.error('Error adding new slider:', error);
            setError('Error adding new slider.');
        }
    };

    const deleteSlider = async (id) => {
        if (window.confirm('Are you sure you want to delete this slider?')) {
            try {
                const response = await fetch(`http://localhost:5000/api/sliders/${id}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    fetchSliderData();
                } else {
                    const contentType = response.headers.get('content-type');
                    if (contentType && contentType.includes('application/json')) {
                        const errorData = await response.json();
                        console.error('Error deleting slider:', errorData.message);
                    } else {
                        const errorText = await response.text();
                        console.error('Error deleting slider:', errorText);
                    }
                }
            } catch (error) {
                console.error('Error deleting slider:', error);
            }
        }
    };

    if (location.pathname === '/admin/slider-management') {
        return (
            <div className="admin-dashboard">
                <h1>Slider Management</h1>
                {error && <p className="error-message">{error}</p>}
                <AddSliderForm onAddSlider={addNewSlider} />

                <div className="slider-list">
                    <h2>Current Sliders</h2>
                    <ul>
                        {sliderData.map(slide => (
                            <li key={slide._id}>
                                <img
                                    src={`http://localhost:5000/${slide.image}`}
                                    alt={slide.title}
                                    className="thumbnail"
                                />
                                <h3>{slide.title}</h3>
                                <p>{slide.description}</p>
                                <button onClick={() => deleteSlider(slide._id)}>Delete</button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }

    return (
        <div className="admin-dashboard">
            <h1>Admin Dashboard</h1>
            {/* Add other dashboard content here */}
        </div>
    );
};

export default AdminDashboard;
