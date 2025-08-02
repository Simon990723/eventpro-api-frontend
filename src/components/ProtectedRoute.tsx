import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Oval } from 'react-loader-spinner';

const ProtectedRoute: React.FC<{ children: React.ReactElement }> = ({
    children,
}) => {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return (
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '50vh',
                }}
            >
                <Oval height={80} width={80} color="var(--primary-color)" />
            </div>
        );
    }
    if (!user) {
        return <Navigate to="/login" replace />;
    }
    return children;
};

export default ProtectedRoute;
