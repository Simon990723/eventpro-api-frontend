import React from 'react';
import MyRegistrationsList from '../components/MyRegistrationsList';

const MyRegistrationsPage: React.FC = () => {
    return (
        <div className="my-registrations-container fade-in">
            <header className="detail-page-header">
                <h1>My Registrations</h1>
                <p className="event-subtitle">
                    Your personal event pass collection.
                </p>
            </header>

            <MyRegistrationsList />
        </div>
    );
};

export default MyRegistrationsPage;
