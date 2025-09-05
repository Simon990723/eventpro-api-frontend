import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import Skeleton from './Skeleton';
import { Link } from 'react-router-dom';

interface Registration {
    id: number;
    name: string;
    email: string;
    event: {
        name: string;
        date: string;
        location: string;
    };
    invoice?: {
        id: number;
    };
}

const API_BASE_URL = import.meta.env.VITE_API_URL;

const MyRegistrationsList: React.FC = () => {
    const [registrations, setRegistrations] = useState<Registration[]>([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        if (!user?.token) {
            setLoading(false);
            return;
        }

        const fetchMyRegistrations = async () => {
            setLoading(true);
            try {
                const response = await fetch(
                    `${API_BASE_URL}/api/registrants/me`,
                    {
                        headers: { Authorization: `Bearer ${user.token}` },
                    }
                );
                if (!response.ok) {
                    throw new Error('Could not fetch your registrations.');
                }
                const data = await response.json();
                setRegistrations(data);
            } catch (error: any) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        void fetchMyRegistrations();
    }, [user]);

    const handleDownloadInvoice = async (invoiceId: number) => {
        if (!user?.token) return;

        const loadingToast = toast.loading('Generating your receipt...');
        try {
            const response = await fetch(
                `${API_BASE_URL}/api/invoice/${invoiceId}`,
                {
                    headers: { Authorization: `Bearer ${user.token}` },
                }
            );
            if (!response.ok) throw new Error('Could not download receipt.');
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `receipt-${invoiceId}.pdf`;
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
            toast.success('Receipt downloaded!', { id: loadingToast });
        } catch (error: any) {
            toast.error(error.message, { id: loadingToast });
        }
    };

    if (loading) {
        return (
            <div className="tickets-list">
                {[...Array(2)].map((_, index) => (
                    <div key={index} className="ticket-card-skeleton">
                        <div className="ticket-main-skeleton">
                            <Skeleton
                                className="h3-skeleton"
                                style={{ width: '70%', marginBottom: '1rem' }}
                            />
                            <Skeleton
                                className="p-skeleton"
                                style={{ width: '50%' }}
                            />
                        </div>
                        <div className="ticket-action-skeleton">
                            <Skeleton className="button-skeleton" />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (registrations.length === 0) {
        return (
            <div className="empty-state-container">
                <div className="empty-state-icon">🎟️</div>
                <h2>No Tickets Yet</h2>
                <p>You haven't registered for any events.</p>
                <Link to="/home" className="cta-button">
                    Browse Events
                </Link>
            </div>
        );
    }

    return (
        <div className="tickets-list">
            {registrations.map((reg) => (
                <div key={reg.id} className="ticket-card">
                    <div className="ticket-main">
                        <h3>{reg.event.name}</h3>
                        <div className="ticket-details">
                            <p>
                                <strong>Date:</strong>{' '}
                                {new Date(reg.event.date).toLocaleDateString()}
                            </p>
                            <p>
                                <strong>Location:</strong> {reg.event.location}
                            </p>
                        </div>
                    </div>
                    <div className="ticket-actions">
                        {reg.invoice && (
                            <button
                                onClick={() => {
                                    if (reg.invoice)
                                        void handleDownloadInvoice(
                                            reg.invoice.id
                                        );
                                }}
                                className="button-primary"
                            >
                                Download Receipt
                            </button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MyRegistrationsList;
