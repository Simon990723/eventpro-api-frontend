import React from 'react';
import {Navigate} from 'react-router-dom';
import {useAuth} from '../../context/AuthContext';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

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
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '50px',
                    gap: '20px'
                }}
            >
                <Skeleton height={50} width={200} />
                <Skeleton count={2} width={300} />
            </div>
        );
    }
    if (user) {
        return <Navigate to="/" replace />;
    }
    return children;
};

export default GuestRoute;