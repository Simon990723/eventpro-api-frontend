import type { FC } from 'react';
import { Link } from 'react-router-dom';
import type { Event } from '../types/Event';
import { ThreeDots } from 'react-loader-spinner';

interface EventListProps {
    events: Event[];
    loading: boolean;
    error: string | null;
    handleEditClick: (event: Event) => void;
    handleDeleteEvent: (id: number) => void;
    isCreator?: boolean;
}

const EventList: FC<EventListProps> = ({
    events,
    loading,
    error,
    handleEditClick,
    handleDeleteEvent,
    isCreator,
}) => {
    if (loading) {
        return (
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    padding: '50px',
                }}
            >
                <ThreeDots
                    height="80"
                    width="80"
                    radius="9"
                    color="var(--paypal-blue)"
                    ariaLabel="three-dots-loading"
                    visible={true}
                />
            </div>
        );
    }

    if (error) {
        return <p style={{ color: 'var(--danger)' }}>{error}</p>;
    }

    return (
        <div className="event-list-wrapper">
            {events.length === 0 ? (
                <p>
                    {isCreator
                        ? "You haven't created any events yet."
                        : 'No events are available right now.'}
                </p>
            ) : (
                <div className="event-cards-container">
                    {events.map((event) => (
                        <div key={event.id} className="event-card">
                            <div className="event-card-header">
                                <Link
                                    to={
                                        isCreator
                                            ? `/manage/event/${event.id}`
                                            : `/event/${event.id}`
                                    }
                                    className="event-card-link"
                                >
                                    <h3>{event.name}</h3>
                                </Link>
                                <div className="event-card-price">
                                    {event.price > 0
                                        ? `$${event.price.toFixed(2)}`
                                        : 'Free'}
                                </div>
                            </div>
                            <div className="event-card-body">
                                <p>
                                    <strong>Date:</strong>{' '}
                                    {new Date(event.date).toLocaleDateString()}
                                </p>
                                <p>
                                    <strong>Location:</strong> {event.location}
                                </p>
                            </div>
                            <div className="event-actions">
                                {isCreator ? (
                                    <>
                                        <button
                                            onClick={() =>
                                                handleEditClick(event)
                                            }
                                            className="button-secondary"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDeleteEvent(event.id)
                                            }
                                            className="button-danger"
                                        >
                                            Delete
                                        </button>
                                    </>
                                ) : (
                                    <Link
                                        to={`/event/${event.id}`}
                                        className="cta-button"
                                    >
                                        View Details & Register
                                    </Link>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default EventList;
