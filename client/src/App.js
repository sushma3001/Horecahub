import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './Pages/Homepage/Homepage';
import Disposals from './components/Products/Disposals/Disposals';
import VendingMachine from './components/Products/VendingMachine/VendingMachine';
import AdminDashboard from './Pages/AdminDashboard/AdminDashboard';
import AdminNavbar from './components/admin/AdminNavbar/AdminNavbar';  // Import the AdminNavbar
import './App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/products/disposals" element={<Disposals />} />
                    <Route path="/products/vending-machine" element={<VendingMachine />} />
                    
                    {/* Admin Section */}
                    <Route
                        path="/admin/*"
                        element={
                            <>
                                <AdminNavbar />  {/* Navbar for admin */}
                                <Routes>
                                    <Route path="/" element={<AdminDashboard />} />
                                    <Route path="/slider-management" element={<AdminDashboard />} />
                                </Routes>
                            </>
                        }
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
