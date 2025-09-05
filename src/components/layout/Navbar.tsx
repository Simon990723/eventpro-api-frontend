import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const Navbar: React.FC = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const isCreator = user?.roles.includes('Creator');

    const handleLogout = () => {
        logout();
        toast.success('You have been logged out.');
        navigate('/login');
    };

    return (
        <nav className="animated-navbar">
            <div className="animated-navbar-left">
                <Link to="/" className="animated-navbar-brand">
                    <img src="/logo.png" alt="EventPro Platform Logo" />
                    <span>EventPro Platform</span>
                </Link>
                {user && (
                    <div className="animated-navbar-nav">
                        <Link to="/" className="animated-navbar-link">Home</Link>
                        {!isCreator && (
                            <Link to="/my-registrations" className="animated-navbar-link">My Registrations</Link>
                        )}
                    </div>
                )}
            </div>

            <div className="animated-navbar-right">
                {user ? (
                    <>
                        <span className="animated-text-secondary">{user.email}</span>
                        <button
                            onClick={handleLogout}
                            className="animated-btn animated-btn-danger animated-btn-sm"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <div className="animated-navbar-nav">
                        <Link to="/login" className="animated-navbar-link">Login</Link>
                        <Link to="/register" className="animated-navbar-link">Register</Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
