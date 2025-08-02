import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Oval } from 'react-loader-spinner';

interface GuestRouteProps {
    children: React.ReactElement;
}

const GuestRoute: React.FC<GuestRouteProps> = ({ children }) => {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return (
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                }}
            >
                <Oval height={80} width={80} color="var(--primary-color)" />
            </div>
        );
    }
    if (user) {
        return <Navigate to="/" replace />;
    }
    return children;
};

export default GuestRoute;
