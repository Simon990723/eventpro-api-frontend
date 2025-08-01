import React, {useState} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import toast from 'react-hot-toast';

const API_BASE_URL = 'http://localhost:5189';

const RegisterPage: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (email: string, password: string, role?: string) => {
        setIsLoading(true);
        const loadingToastId = toast.loading('Creating your account...');

        try {
            const response = await fetch(`${API_BASE_URL}/api/account/register`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email, password, role}),
            });

            if (!response.ok) {
                const errorData = await response.json();
                const message = errorData.errors ? Object.values(errorData.errors).flat().join('\n') : errorData.Message;
                throw new Error(message || 'Registration failed.');
            }

            toast.success('Account created successfully! Please log in.', {id: loadingToastId});
            navigate('/login');

        } catch (error: any) {
            toast.error(`Registration Error: ${error.message}`, {id: loadingToastId});
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-container fade-in">
            <AuthForm formType="register" onSubmit={handleRegister} isLoading={isLoading}/>
            <p style={{textAlign: 'center', marginTop: '1.5rem', color: 'var(--text-medium)'}}>
                Already have an account? <Link to="/login" className="auth-link">Login here</Link>
            </p>
        </div>
    );
};

export default RegisterPage;