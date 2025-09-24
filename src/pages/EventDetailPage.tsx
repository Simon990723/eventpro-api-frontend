import React, {useState, useEffect, type FormEvent} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {useAuth} from '../context/AuthContext';
import toast from 'react-hot-toast';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import {jwtDecode} from 'jwt-decode';

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
    eventId: number;
    invoice?: { id: number };
}

interface NewRegistrant {
    name: string;
    email: string;
}

const API_BASE_URL = import.meta.env.VITE_API_URL;

const EventDetailPage: React.FC = () => {
    const {eventId} = useParams<{ eventId: string }>();
    const {user} = useAuth();
    const navigate = useNavigate();

    const [event, setEvent] = useState<EventDetails | null>(null);
    const [registrants, setRegistrants] = useState<Registrant[]>([]);
    const [newRegistrant, setNewRegistrant] = useState<NewRegistrant>({
        name: '',
        email: user?.email || '',
    });
    const [isLoading, setIsLoading] = useState(true);

    const currentUserId = user?.token
        ? (jwtDecode(user.token) as { nameid: string })['nameid']
        : null;

    useEffect(() => {
        if (!user || !user.token || !eventId) return;

        const fetchDetails = async () => {
            setIsLoading(true);
            try {
                const eventRes = await fetch(
                    `${API_BASE_URL}/api/browse/events/${eventId}`,
                    {headers: {Authorization: `Bearer ${user.token}`}}
                );
                if (!eventRes.ok) {
                    toast.error('The requested event could not be found.');
                    navigate('/');
                    return;
                }
                const eventData = await eventRes.json();
                setEvent(eventData);

                if (
                    user.roles.includes('Creator') &&
                    eventData.userId === currentUserId
                ) {
                    const regRes = await fetch(
                        `${API_BASE_URL}/api/registrants?eventId=${eventId}`,
                        {headers: {Authorization: `Bearer ${user.token}`}}
                    );
                    if (!regRes.ok) {
                        toast.error('Could not fetch the list of registrants.');
                        return;
                    }
                    const regData = await regRes.json();
                    setRegistrants(regData);
                }
            } catch (err: any) {
                toast.error(err.message);
                navigate('/');
            } finally {
                setIsLoading(false);
            }
        };
        void fetchDetails();
    }, [eventId, user, currentUserId, navigate]);

    const handleRegisterSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!user || !user.token) return;

        const loadingToastId = toast.loading('Processing registration...');

        try {
            const response = await fetch(`${API_BASE_URL}/api/registrants`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`,
                },
                body: JSON.stringify({
                    ...newRegistrant,
                    eventId: Number(eventId),
                }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                let errorMessage =
                    'Registration failed. You may already be registered for this event.';
                try {
                    errorMessage =
                        JSON.parse(errorText).message || errorMessage;
                } catch {
                }
                throw new Error(errorMessage);
            }

            const addedRegistrant: Registrant = await response.json();

            toast.success(`Successfully registered ${addedRegistrant.name}!`, {
                id: loadingToastId,
            });

            setNewRegistrant({name: '', email: user?.email || ''});
            if (user.roles.includes('Creator')) {
                setRegistrants((prev) => [...prev, addedRegistrant]);
            }
            navigate('/');
        } catch (err: any) {
            toast.error(err.message, {id: loadingToastId});
        }
    };

    const handleDownloadInvoice = async (invoiceId: number) => {
        if (!user || !user.token) return;
        const loadingToast = toast.loading('Generating your receipt...');
        try {
            const response = await fetch(
                `${API_BASE_URL}/api/invoice/${invoiceId}`,
                {headers: {Authorization: `Bearer ${user.token}`}}
            );
            if (!response.ok) {
                toast.error('Could not download the receipt.', {
                    id: loadingToast,
                });
                return;
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `receipt-${invoiceId}.pdf`;
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
            toast.success('Receipt downloaded!', {id: loadingToast});
        } catch (error: any) {
            toast.error(error.message, {id: loadingToast});
        }
    };

    if (isLoading)
        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '50px',
                    gap: '20px',
                }}
            >
                <Skeleton height={200} width={400} />
                <Skeleton count={3} width={300} />
            </div>
        );

    if (!event) return <p>Event not found.</p>;

    const isEventCreator =
        user?.roles.includes('Creator') && event.userId === currentUserId;
    const backLinkText = isEventCreator
        ? '← Back to Dashboard'
        : '← Back to Events';

    return (
        <div className="detail-page-container fade-in">
            <button onClick={() => navigate(-1)} className="back-link">
                {backLinkText}
            </button>

            <header className="detail-page-header">
                <h1>{isEventCreator ? 'Manage Event' : event.name}</h1>
                {isEventCreator && (
                    <p className="event-subtitle">{event.name}</p>
                )}
            </header>

            <div
                className={
                    isEventCreator ? 'detail-page-grid' : 'detail-page-column'
                }
            >
                <div className="page-section">
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
                </div>

                {isEventCreator ? (
                    <div className="page-section">
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
                            <p>No one has registered yet.</p>
                        )}
                    </div>
                ) : (
                    <div className="page-section">
                        <div className="section-header">
                            <h2>Register for this Event</h2>
                        </div>
                        <form onSubmit={handleRegisterSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">Full Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    value={newRegistrant.name}
                                    onChange={(e) =>
                                        setNewRegistrant({
                                            ...newRegistrant,
                                            name: e.target.value,
                                        })
                                    }
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">
                                    Email Address for Receipt
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={newRegistrant.email}
                                    onChange={(e) =>
                                        setNewRegistrant({
                                            ...newRegistrant,
                                            email: e.target.value,
                                        })
                                    }
                                    required
                                />
                            </div>
                            <button type="submit" className="cta-button">
                                Confirm Registration
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EventDetailPage;