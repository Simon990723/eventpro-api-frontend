import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const API_BASE_URL = 'http://localhost:5189';

const LoginPage: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (email: string, password: string) => {
        setIsLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/api/account/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                const errorMessage =
                    errorData.message || 'Invalid email or password.';
                throw new Error(errorMessage);
            }

            const data = await response.json();

            login(data.accessToken);
            toast.success('Logged in successfully!');

            navigate('/');
        } catch (error: any) {
            toast.error(`Login Error: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-container fade-in">
            <AuthForm
                formType="login"
                onSubmit={handleLogin}
                isLoading={isLoading}
            />
            <p
                style={{
                    textAlign: 'center',
                    marginTop: '1.5rem',
                    color: 'var(--text-medium)',
                }}
            >
                Don't have an account?{' '}
                <Link to="/register" className="auth-link">
                    Register here
                </Link>
            </p>
        </div>
    );
};

export default LoginPage;
