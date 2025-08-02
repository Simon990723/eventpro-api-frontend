import React, {useState, type FormEvent} from 'react';
import {Oval} from 'react-loader-spinner';

interface AuthFormProps {
    formType: 'login' | 'register';
    onSubmit: (email: string, password: string, role?: string) => void;
    isLoading: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({formType, onSubmit, isLoading}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('User');

    const [isPasswordFocused, setIsPasswordFocused] = useState(false);

    const isRegisterForm = formType === 'register';

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSubmit(email, password, isRegisterForm ? role : undefined);
    };

    const passwordRules = (
        <div className="password-rules">
            <p>Password must contain:</p>
            <ul>
                <li>At least 6 characters</li>
                <li>At least one uppercase letter (A-Z)</li>
                <li>At least one lowercase letter (a-z)</li>
                <li>At least one number (0-9)</li>
                <li>At least one special character (e.g., !@#$%^&*)</li>
            </ul>
        </div>
    );

    return (
        <div className="auth-form-container">
            <h2>{isRegisterForm ? 'Create an Account' : 'Login'}</h2>
            <form onSubmit={handleSubmit} className="auth-form">
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        onFocus={() => setIsPasswordFocused(true)}
                        onBlur={() => setIsPasswordFocused(false)}
                    />
                    {isRegisterForm && isPasswordFocused && passwordRules}
                </div>

                {isRegisterForm && (
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

                <button type="submit" className="cta-button" disabled={isLoading}>
                    {isLoading ? (
                        <Oval
                            height={24}
                            width={24}
                            color="#ffffff"
                            secondaryColor="#eeeeee"
                            strokeWidth={4}
                        />
                    ) : (
                        isRegisterForm ? 'Register' : 'Login'
                    )}
                </button>
            </form>
        </div>
    );
};

export default AuthForm;