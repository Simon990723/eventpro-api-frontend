import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import Skeleton from '../components/ui/Skeleton';
import { jwtDecode } from 'jwt-decode';

interface EventDetails {
    id: number;
    name: string;
    date: string;
    location: string;
    price: number;
    userId: string;
}

interface Registrant {
    id: number;
    name: string;
    email: string;
    invoice?: { id: number };
}

interface DecodedToken {
    'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier': string;
}

const API_BASE_URL = import.meta.env.VITE_API_URL;

const EventManagementPage: React.FC = () => {
    const { eventId } = useParams<{ eventId: string }>();
    const { user } = useAuth();
    const navigate = useNavigate();

    const [event, setEvent] = useState<EventDetails | null>(null);
    const [registrants, setRegistrants] = useState<Registrant[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const currentUserId = user?.token
        ? (jwtDecode(user.token) as DecodedToken)[
              'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
          ]
        : null;

    useEffect(() => {
        if (!user || !user.token || !eventId) return;

        const fetchManagementData = async () => {
            setIsLoading(true);
            try {
                const eventRes = await fetch(
                    `${API_BASE_URL}/api/events/${eventId}`,
                    {
                        headers: { Authorization: `Bearer ${user.token}` },
                    }
                );
                if (!eventRes.ok) {
                    toast.error(
                        'Event not found or you do not have permission.'
                    );
                    navigate('/home');
                    return;
                }

                const eventData = await eventRes.json();
                if (eventData.userId !== currentUserId) {
                    toast.error('You are not authorized to manage this event.');
                    navigate('/home');
                    return;
                }
                setEvent(eventData);

                const regRes = await fetch(
                    `${API_BASE_URL}/api/registrants?eventId=${eventId}`,
                    {
                        headers: { Authorization: `Bearer ${user.token}` },
                    }
                );
                if (!regRes.ok) {
                    toast.error('Could not fetch the list of attendees.');
                    return;
                }
                const regData = await regRes.json();
                setRegistrants(regData);
            } catch (err: any) {
                toast.error(err.message);
                navigate('/home');
            } finally {
                setIsLoading(false);
            }
        };

        void fetchManagementData();
    }, [eventId, user, currentUserId, navigate]);

    const handleDownloadInvoice = async (invoiceId: number) => {
        if (!user || !user.token) return;
        const loadingToast = toast.loading('Generating invoice...');
        try {
            const response = await fetch(
                `${API_BASE_URL}/api/invoice/${invoiceId}`,
                {
                    headers: { Authorization: `Bearer ${user.token}` },
                }
            );
            if (!response.ok) {
                toast.error('Could not download the invoice.', {
                    id: loadingToast,
                });
                return;
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `invoice-${invoiceId}.pdf`;
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
            toast.success('Invoice downloaded!', { id: loadingToast });
        } catch (error: any) {
            toast.error(error.message, { id: loadingToast });
        }
    };

    if (isLoading) {
        return (
            <div className="detail-page-container fade-in">
                <Skeleton className="back-link-skeleton" />
                <header className="detail-page-header">
                    <Skeleton className="h1-skeleton" />
                    <Skeleton className="p-skeleton" />
                </header>
                <div className="detail-page-grid">
                    <div className="page-section">
                        <div className="section-header">
                            <Skeleton className="h2-skeleton" />
                        </div>
                        <div className="event-details-list">
                            <Skeleton className="list-item-skeleton" />
                            <Skeleton className="list-item-skeleton" />
                            <Skeleton className="list-item-skeleton" />
                        </div>
                    </div>
                    <div className="page-section">
                        <div className="section-header">
                            <Skeleton className="h2-skeleton" />
                        </div>
                        <div className="attendee-list">
                            <Skeleton className="attendee-item-skeleton" />
                            <Skeleton className="attendee-item-skeleton" />
                            <Skeleton className="attendee-item-skeleton" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!event) {
        return null;
    }

    return (
        <div className="detail-page-container fade-in">
            <button onClick={() => navigate(-1)} className="back-link">
                ← Back to Dashboard
            </button>
            <header className="detail-page-header">
                <h1>Manage Event</h1>
                <p className="event-subtitle">{event.name}</p>
            </header>
            <div className="detail-page-grid">
                <section className="page-section">
                    <div className="section-header">
                        <h2>Event Details</h2>
                    </div>
                    <div className="event-details-list">
                        <div className="event-detail-item">
                            <span>🗓️</span>
                            <div>
                                <strong>Date:</strong>{' '}
                                {new Date(event.date).toLocaleDateString()}
                            </div>
                        </div>
                        <div className="event-detail-item">
                            <span>📍</span>
                            <div>
                                <strong>Location:</strong> {event.location}
                            </div>
                        </div>
                        <div className="event-detail-item">
                            <span>💲</span>
                            <div>
                                <strong>Price:</strong>{' '}
                                {event.price > 0
                                    ? `$${event.price.toFixed(2)}`
                                    : 'Free'}
                            </div>
                        </div>
                    </div>
                </section>
                <section className="page-section">
                    <div className="section-header">
                        <h2>Attendees ({registrants.length})</h2>
                    </div>
                    {registrants.length > 0 ? (
                        <ul className="attendee-list">
                            {registrants.map((r) => (
                                <li key={r.id} className="attendee-item">
                                    <div className="attendee-info">
                                        <span className="attendee-name">
                                            {r.name}
                                        </span>
                                        <span className="attendee-email">
                                            {r.email}
                                        </span>
                                    </div>
                                    {r.invoice && (
                                        <button
                                            onClick={() => {
                                                if (r.invoice)
                                                    void handleDownloadInvoice(
                                                        r.invoice.id
                                                    );
                                            }}
                                            className="button-invoice"
                                        >
                                            Invoice
                                        </button>
                                    )}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No one has registered for this event yet.</p>
                    )}
                </section>
            </div>
        </div>
    );
};

export default EventManagementPage;
