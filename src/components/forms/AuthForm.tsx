import React, {useState, type FormEvent} from 'react';

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
            <h2 className="form-title">
                {formType === 'login' ? 'Login' : 'Create an Account'}
            </h2>
            {formType === 'register' && (
                <p className="password-rules-notice">
                    <strong>Password Requirements:</strong>
                    <br/>
                    Your password must be at least 8 characters long and contain at
                    least one uppercase letter, one lowercase letter, one number,
                    and one special character.
                </p>
            )}
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
                        >
                            <option value="User">Normal User (Attendee)</option>
                            <option value="Creator">Event Creator</option>
                        </select>
                    </div>
                )}

                <button
                    type="submit"
                    className="submit-button cta-button"
                    disabled={isLoading}
                    style={{marginTop: '1rem'}}
                >
                    {isLoading ? (
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 50 50"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                            focusable="false"
                        >
                            <circle
                                cx="25"
                                cy="25"
                                r="20"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="4"
                                strokeLinecap="round"
                                strokeDasharray="31.415 31.415"
                            >
                                <animateTransform
                                    attributeName="transform"
                                    type="rotate"
                                    from="0 25 25"
                                    to="360 25 25"
                                    dur="0.8s"
                                    repeatCount="indefinite"
                                />
                            </circle>
                        </svg>
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
