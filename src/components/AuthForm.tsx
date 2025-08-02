import React, { useState, type FormEvent } from 'react';
import { Oval } from 'react-loader-spinner';

interface AuthFormProps {
    formType: 'login' | 'register';
    onSubmit: (email: string, password: string, role?: string) => void;
    isLoading: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({
    formType,
    onSubmit,
    isLoading,
}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('User');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (formType === 'register') {
            onSubmit(email, password, role);
        } else {
            onSubmit(email, password);
        }
    };

    return (
        <div className="auth-form-container">
            <h2>{formType === 'login' ? 'Login' : 'Create an Account'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoComplete="email"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        autoComplete={
                            formType === 'login'
                                ? 'current-password'
                                : 'new-password'
                        }
                    />
                </div>

                {formType === 'register' && (
                    <div className="form-group">
                        <label htmlFor="role">I am a:</label>
                        <select
                            id="role"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                borderRadius: '8px',
                                border: '1px solid var(--border-color)',
                                backgroundColor: 'var(--background-color)',
                                color: 'var(--text-color)',
                            }}
                        >
                            <option value="User">Normal User (Attendee)</option>
                            <option value="Creator">Event Creator</option>
                        </select>
                    </div>
                )}

                <button
                    type="submit"
                    className="submit-button"
                    disabled={isLoading}
                    style={{ marginTop: '1rem' }}
                >
                    {isLoading ? (
                        <Oval
                            height={20}
                            width={20}
                            color="#ffffff"
                            secondaryColor="#eeeeee"
                            strokeWidth={4}
                        />
                    ) : formType === 'login' ? (
                        'Login'
                    ) : (
                        'Register'
                    )}
                </button>
            </form>
        </div>
    );
};

export default AuthForm;
