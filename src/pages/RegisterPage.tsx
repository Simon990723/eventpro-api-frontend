import React, {useState} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import toast from 'react-hot-toast';

const API_BASE_URL = import.meta.env.VITE_API_URL;
const RegisterPage: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const handleRegister = async (
        email: string,
        password: string,
        role?: string
    ) => {
        setIsLoading(true);
        const loadingToastId = toast.loading('Creating your account...');

        try {
            const response = await fetch(
                `${API_BASE_URL}/api/account/register`,
                {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({email, password, role}),
                }
            );

            if (!response.ok) {
                let errorMessage = 'Registration failed. Please try again.';
                try {
                    const errorData = await response.json();
                    if (errorData && errorData.errors) {
                        const errorList = Object.values(errorData.errors)
                            .flat()
                            .map((err: any, index: number) => (
                                <li key={index}>{err}</li>
                            ));

                        errorMessage = (
                            <div>
                                <p style={{marginBottom: '0.5rem', fontWeight: 'bold'}}>
                                    Please correct the following issues:
                                </p>
                                <ul style={{margin: 0, paddingLeft: '1.2rem'}}>
                                    {errorList}
                                </ul>
                            </div>
                        ) as any;
                    } else if (errorData.message) {
                        errorMessage = errorData.message;
                    }
                } catch {
                    errorMessage = response.statusText;
                }
                throw new Error(errorMessage);
            }

            toast.success('Account created successfully! Please log in.', {
                id: loadingToastId,
            });
            navigate('/login');
        } catch (error: any) {
            toast.error(error.message, {
                id: loadingToastId,
                duration: 6000,
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-container fade-in">
            <h2 className="form-title">Create an Account</h2>
            <p className="password-rules-notice">
                **Password Requirements:**
                <br/>
                Your password must be at least 8 characters long and contain at
                least one uppercase letter, one lowercase letter, one number,
                and one special character.
            </p>
            <AuthForm
                formType="register"
                onSubmit={handleRegister}
                isLoading={isLoading}
            />
            <p
                style={{
                    textAlign: 'center',
                    marginTop: '1.5rem',
                    color: 'var(--text-medium)',
                }}
            >
                Already have an account?{' '}
                <Link to="/login" className="auth-link">
                    Login here
                </Link>
            </p>
        </div>
    );
};
export default RegisterPage;