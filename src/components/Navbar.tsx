import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useAuth} from '../context/AuthContext';
import toast from 'react-hot-toast';

const Navbar: React.FC = () => {
    const {user, logout} = useAuth();
    const navigate = useNavigate();
    const isCreator = user?.roles.includes('Creator');

    const handleLogout = () => {
        logout();
        toast.success('You have been logged out.');
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <Link to="/" className="navbar-brand">
                    <img src="/logo.png" alt="EventPro Platform Logo"/>
                    <span>EventPro Platform</span>
                </Link>
                {user && (
                    <div className="navbar-links">
                        <Link to="/">Home</Link>
                        {!isCreator && (
                            <Link to="/my-registrations">My Registrations</Link>
                        )}
                    </div>
                )}
            </div>

            <div className="navbar-right">
                {user ? (
                    <>
                        <span className="welcome-text">{user.email}</span>
                        <button onClick={handleLogout} className="logout-button">Logout</button>
                    </>
                ) : (
                    <div className="navbar-links">
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;