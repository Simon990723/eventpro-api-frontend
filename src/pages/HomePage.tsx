import {useState, useEffect, type FormEvent, type FC, type ChangeEvent, useRef} from 'react';
import '../App.css';
import EventForm from '../components/EventForm';
import EventList from '../components/EventList';
import MyRegistrationsList from '../components/MyRegistrationsList';
import toast from 'react-hot-toast';
import {useAuth} from '../context/AuthContext';
import Skeleton from '../components/Skeleton';
import {type Event} from '../types/Event';

interface NewEvent {
    name: string;
    date: string;
    location: string;
    price: number | string;
}

const HomePage: FC = () => {
    const {user, isLoading: isAuthLoading} = useAuth();
    const isCreator = user?.roles.includes('Creator');
    const formSectionRef = useRef<HTMLDivElement>(null);
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [formData, setFormData] = useState<NewEvent>({name: '', date: '', location: '', price: ''});
    const [editingEventId, setEditingEventId] = useState<number | null>(null);
    const [aiPrompt, setAiPrompt] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const API_BASE_URL = 'http://localhost:5189';

    const fetchEvents = async () => {
        if (!user || !user.token) {
            setLoading(false);
            return;
        }
        const endpoint = isCreator ? '/api/events' : '/api/browse/events';
        const headers: HeadersInit = {'Authorization': `Bearer ${user.token}`};
        try {
            const response = await fetch(`${API_BASE_URL}${endpoint}`, {headers});
            if (!response.ok) {
                toast.error(`Failed to fetch events: HTTP status ${response.status}`);
                return;
            }
            const data: Event[] = await response.json();
            setEvents(data);
        } catch (e) {
            const errorMsg = e instanceof Error ? `Failed to fetch events: ${e.message}` : "An unknown error occurred";
            toast.error(errorMsg);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        if (!isAuthLoading) {
            if (user) {
                void fetchEvents();
            } else {
                setLoading(false);
            }
        }
    }, [user, isAuthLoading]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setFormData(prevState => ({...prevState, [name]: value}));
    };

    const handleFormSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.date || !formData.location || formData.price === '') {
            toast.error("Please fill in all fields, including price.");
            return;
        }
        if (!user || !user.token) return;
        const url = editingEventId ? `${API_BASE_URL}/api/events/${editingEventId}` : `${API_BASE_URL}/api/events`;
        const method = editingEventId ? 'PUT' : 'POST';
        const eventData = {...formData, price: parseFloat(String(formData.price))};
        const body = editingEventId ? JSON.stringify({id: editingEventId, ...eventData}) : JSON.stringify(eventData);
        const successMessage = editingEventId ? 'Event updated!' : 'Event created!';
        await toast.promise(
            fetch(url, {
                method: method,
                headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${user.token}`},
                body: body,
            }).then(async (response) => {
                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(errorText || `HTTP error! status: ${response.status}`);
                }
            }),
            {
                loading: 'Saving event...',
                success: () => {
                    setFormData({name: '', date: '', location: '', price: ''});
                    setEditingEventId(null);
                    setAiPrompt('');
                    void fetchEvents();
                    return successMessage;
                },
                error: (err) => `Failed to save event: ${err.message}`,
            }
        );
    };

    const handleDeleteEvent = (id: number) => {
        if (!user || !user.token) return;
        toast((t) => (
            <span>
                Are you sure?
                <button onClick={() => {
                    toast.dismiss(t.id);
                    void toast.promise(
                        fetch(`${API_BASE_URL}/api/events/${id}`, {
                            method: 'DELETE',
                            headers: {'Authorization': `Bearer ${user.token}`}
                        }).then(response => {
                            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                        }),
                        {
                            loading: 'Deleting event...',
                            success: () => {
                                void fetchEvents();
                                return 'Event deleted!';
                            },
                            error: (err) => `Failed to delete: ${err.message}`,
                        }
                    );
                }} className="toast-button confirm">
                    Confirm
                </button>
                <button onClick={() => toast.dismiss(t.id)} className="toast-button cancel">
                    Cancel
                </button>
            </span>
        ), {duration: 6000});
    };

    const handleEditClick = (event: Event) => {
        setEditingEventId(event.id);
        const formattedDate = new Date(event.date).toISOString().split('T')[0];
        setFormData({name: event.name, date: formattedDate, location: event.location, price: event.price});
        formSectionRef.current?.scrollIntoView({behavior: 'smooth'});
        toast.success(`Now editing: ${event.name}`);
    };

    const handleCancelEdit = () => {
        setEditingEventId(null);
        setFormData({name: '', date: '', location: '', price: ''});
        setAiPrompt('');
    };

    const handleGenerateWithAi = async () => {
        if (!aiPrompt.trim()) {
            toast.error('Please enter an event idea first.');
            return;
        }
        if (!user || !user.token) return;
        setIsGenerating(true);
        const loadingToastId = toast.loading('Asking the AI assistant...');
        try {
            const response = await fetch(`${API_BASE_URL}/api/ai/generate-event`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${user.token}`},
                body: JSON.stringify({prompt: aiPrompt}),
            });
            if (!response.ok) {
                const errorText = await response.text();
                toast.error(`AI Assistant Error: ${errorText || 'The AI assistant did not respond correctly.'}`, {id: loadingToastId});
                return;
            }
            const aiData = await response.json();
            const formattedDate = aiData.date ? new Date(aiData.date).toISOString().split('T')[0] : '';
            setFormData({
                name: aiData.name || '',
                date: formattedDate,
                location: aiData.location || '',
                price: aiData.price || 0
            });
            toast.success('AI has filled in the details!', {id: loadingToastId});
        } catch (e: any) {
            toast.error(`AI Assistant Error: ${e.message}`, {id: loadingToastId});
        } finally {
            setIsGenerating(false);
        }
    };

    if (isAuthLoading) {
        return (
            <main className="main-content-grid fade-in">
                <div className="page-section">
                    <Skeleton className="h2-skeleton" style={{marginBottom: '0.5rem'}}/>
                    <Skeleton className="p-skeleton" style={{marginBottom: '2rem'}}/>
                    <Skeleton className="list-item-skeleton" style={{marginBottom: '1rem', height: '40px'}}/>
                    <Skeleton className="list-item-skeleton" style={{marginBottom: '1rem', height: '40px'}}/>
                    <Skeleton className="list-item-skeleton" style={{height: '45px', borderRadius: '25px'}}/>
                </div>
                <div className="page-section">
                    <Skeleton className="h2-skeleton" style={{marginBottom: '0.5rem'}}/>
                    <Skeleton className="p-skeleton" style={{marginBottom: '2rem'}}/>
                    <Skeleton className="attendee-item-skeleton"/>
                    <Skeleton className="attendee-item-skeleton"/>
                </div>
            </main>
        );
    }

    return (
        <>
            {isCreator ? (
                <>
                    <main className="main-content-grid fade-in">
                        <section ref={formSectionRef} className="page-section">
                            <div className="section-header">
                                <h2>{editingEventId ? 'Edit Event' : 'Create an Event'}</h2>
                                <p>Fill in the details below or use our AI assistant to get started.</p>
                            </div>
                            <EventForm
                                formData={formData}
                                editingEventId={editingEventId}
                                handleInputChange={handleInputChange}
                                handleFormSubmit={handleFormSubmit}
                                handleCancelEdit={handleCancelEdit}
                                aiPrompt={aiPrompt}
                                setAiPrompt={setAiPrompt}
                                handleGenerateWithAi={handleGenerateWithAi}
                                isGenerating={isGenerating}
                            />
                        </section>
                        <section className="page-section">
                            <div className="section-header">
                                <h2>Your Upcoming Events</h2>
                                <p>A list of all events you have created. You can manage them from here.</p>
                            </div>
                            <EventList
                                events={events}
                                loading={loading}
                                error={null}
                                handleEditClick={handleEditClick}
                                handleDeleteEvent={handleDeleteEvent}
                                isCreator={isCreator}
                            />
                        </section>
                    </main>
                </>
            ) : (
                <>
                    <main className="main-content-grid fade-in">
                        <div className="user-event-browser">
                            <section className="page-section">
                                <div className="section-header">
                                    <h2>🗓️ Upcoming Events</h2>
                                    <p>Find an event that interests you and click "Manage" to see details and
                                        register.</p>
                                </div>
                                <EventList
                                    events={events}
                                    loading={loading}
                                    error={null}
                                    isCreator={isCreator}
                                    handleEditClick={() => {
                                    }}
                                    handleDeleteEvent={() => {
                                    }}
                                />
                            </section>
                        </div>

                        <section className="page-section page-section--sidebar">
                            <div className="section-header">
                                <h2>🎟️ My Registrations</h2>
                                <p>A list of all events you are registered to attend.</p>
                            </div>
                            <MyRegistrationsList/>
                        </section>
                    </main>
                </>
            )}
        </>
    );
};

export default HomePage;