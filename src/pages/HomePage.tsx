import {
    useState,
    useEffect,
    type FormEvent,
    type FC,
    type ChangeEvent,
    useRef,
} from 'react';
import { motion } from 'framer-motion';
import '../styles/animated-design.css';
import EventForm from '../components/forms/EventForm';
import EventList from '../components/ui/EventList';
import MyRegistrationsList from '../components/ui/MyRegistrationsList';
import AnimatedWrapper from '../components/animations/AnimatedWrapper';
import CalendarWidget from '../components/ui/CalendarWidget';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import Skeleton from '../components/ui/Skeleton';
import { type Event } from '../types/Event';

interface NewEvent {
    name: string;
    date: string;
    location: string;
    price: number | string;
}

const HomePage: FC = () => {
    const { user, isLoading: isAuthLoading } = useAuth();
    const isCreator = user?.roles.includes('Creator');
    const formSectionRef = useRef<HTMLDivElement>(null);
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [formData, setFormData] = useState<NewEvent>({
        name: '',
        date: '',
        location: '',
        price: '',
    });
    const [editingEventId, setEditingEventId] = useState<number | null>(null);
    const [aiPrompt, setAiPrompt] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const API_BASE_URL = import.meta.env.VITE_API_URL;

    const fetchEvents = async () => {
        if (!user || !user.token) {
            setLoading(false);
            return;
        }
        const endpoint = isCreator ? '/api/events' : '/api/browse/events';
        const headers: HeadersInit = { Authorization: `Bearer ${user.token}` };
        try {
            const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                headers,
            });
            if (!response.ok) {
                toast.error(
                    `Failed to fetch events: HTTP status ${response.status}`
                );
                return;
            }
            const data: Event[] = await response.json();
            setEvents(data);
        } catch (e) {
            const errorMsg =
                e instanceof Error
                    ? `Failed to fetch events: ${e.message}`
                    : 'An unknown error occurred';
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

    const handleInputChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleFormSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (
            !formData.name ||
            !formData.date ||
            !formData.location ||
            formData.price === ''
        ) {
            toast.error('Please fill in all fields, including price.');
            return;
        }
        if (!user || !user.token) {
            toast.error('Authentication error. Please log in again.');
            return;
        }

        const url = editingEventId
            ? `${API_BASE_URL}/api/events/${editingEventId}`
            : `${API_BASE_URL}/api/events`;
        const method = editingEventId ? 'PUT' : 'POST';
        const eventData = {
            ...formData,
            price: parseFloat(String(formData.price)),
        };
        const body = editingEventId
            ? JSON.stringify({ id: editingEventId, ...eventData })
            : JSON.stringify(eventData);
        const successMessage = editingEventId
            ? 'Event updated!'
            : 'Event created!';

        await toast.promise(
            fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`,
                },
                body: body,
            }).then(async (response) => {
                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(
                        errorText || `HTTP error! status: ${response.status}`
                    );
                }
            }),
            {
                loading: 'Saving event...',
                success: () => {
                    setFormData({
                        name: '',
                        date: '',
                        location: '',
                        price: '',
                    });
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
        toast(
            (t) => (
                <span>
                    Are you sure?
                    <button
                        onClick={() => {
                            toast.dismiss(t.id);
                            void toast.promise(
                                fetch(`${API_BASE_URL}/api/events/${id}`, {
                                    method: 'DELETE',
                                    headers: {
                                        Authorization: `Bearer ${user.token}`,
                                    },
                                }).then((response) => {
                                    if (!response.ok)
                                        throw new Error(
                                            `HTTP error! status: ${response.status}`
                                        );
                                }),
                                {
                                    loading: 'Deleting event...',
                                    success: () => {
                                        void fetchEvents();
                                        return 'Event deleted!';
                                    },
                                    error: (err) =>
                                        `Failed to delete: ${err.message}`,
                                }
                            );
                        }}
                        className="toast-button confirm"
                    >
                        Confirm
                    </button>
                    <button
                        onClick={() => toast.dismiss(t.id)}
                        className="toast-button cancel"
                    >
                        Cancel
                    </button>
                </span>
            ),
            { duration: 6000 }
        );
    };

    const handleEditClick = (event: Event) => {
        setEditingEventId(event.id);
        const formattedDate = new Date(event.date).toISOString().split('T')[0];
        setFormData({
            name: event.name,
            date: formattedDate,
            location: event.location,
            price: event.price,
        });
        formSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
        toast.success(`Now editing: ${event.name}`);
    };

    const handleCancelEdit = () => {
        setEditingEventId(null);
        setFormData({ name: '', date: '', location: '', price: '' });
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
            const response = await fetch(
                `${API_BASE_URL}/api/ai/generate-event`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${user.token}`,
                    },
                    body: JSON.stringify({ prompt: aiPrompt }),
                }
            );
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || 'The AI assistant did not respond correctly.');
            }
            const aiData = await response.json();
            const formattedDate = aiData.date
                ? new Date(aiData.date).toISOString().split('T')[0]
                : '';
            setFormData({
                name: aiData.name || '',
                date: formattedDate,
                location: aiData.location || '',
                price: aiData.price || 0,
            });
            toast.success('AI has filled in the details!', {
                id: loadingToastId,
            });
        } catch (e: any) {
            toast.error(`AI Assistant Error: ${e.message}`, {
                id: loadingToastId,
            });
        } finally {
            setIsGenerating(false);
        }
    };

    if (isAuthLoading) {
        return (
            <main className="animated-container animated-grid-2 fade-in">
                <div className="animated-card">
                    <Skeleton variant="text" width="60%" height="2rem" animation="wave" style={{ marginBottom: '0.5rem' }} />
                    <Skeleton variant="text" width="80%" height="1.2rem" animation="wave" style={{ marginBottom: '2rem' }} />
                    <Skeleton variant="rectangular" width="100%" height="40px" animation="wave" style={{ marginBottom: '1rem' }} />
                    <Skeleton variant="rectangular" width="100%" height="40px" animation="wave" style={{ marginBottom: '1rem' }} />
                    <Skeleton variant="rounded" width="100%" height="45px" animation="wave" />
                </div>
                <div className="animated-card">
                    <Skeleton variant="text" width="60%" height="2rem" animation="wave" style={{ marginBottom: '0.5rem' }} />
                    <Skeleton variant="text" width="80%" height="1.2rem" animation="wave" style={{ marginBottom: '2rem' }} />
                    <Skeleton variant="rectangular" width="100%" height="68px" animation="wave" style={{ marginBottom: '1rem' }} />
                    <Skeleton variant="rectangular" width="100%" height="68px" animation="wave" />
                </div>
            </main>
        );
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    return (
        <>
            {isCreator ? (
                <motion.main 
                    className="animated-container animated-grid-2"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.section 
                        ref={formSectionRef} 
                        className="animated-card scroll-reveal"
                        variants={itemVariants}
                    >
                        <AnimatedWrapper animation="slideInLeft" delay={0.2}>
                            <div className="animated-section-header">
                                <h2 className="animated-heading-2">{editingEventId ? '✏️ Edit Event' : '✨ Create an Event'}</h2>
                                <p className="animated-body">Fill in the details below or use our AI assistant to get started.</p>
                            </div>
                        </AnimatedWrapper>
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
                    </motion.section>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                        <motion.section 
                            className="animated-card scroll-reveal"
                            variants={itemVariants}
                        >
                            <AnimatedWrapper animation="slideInRight" delay={0.3}>
                                <div className="animated-section-header">
                                    <h2 className="animated-heading-2">🎯 Your Upcoming Events</h2>
                                    <p className="animated-body">A list of all events you have created. You can manage them from here.</p>
                                </div>
                            </AnimatedWrapper>
                            <EventList
                                events={events}
                                loading={loading}
                                error={null}
                                handleEditClick={handleEditClick}
                                handleDeleteEvent={handleDeleteEvent}
                                isCreator={isCreator}
                            />
                        </motion.section>
                        
                        <motion.div
                            variants={itemVariants}
                            style={{ alignSelf: 'center' }}
                        >
                            <CalendarWidget 
                                events={events.map(event => ({
                                    id: event.id,
                                    name: event.name,
                                    date: event.date
                                }))}
                            />
                        </motion.div>
                    </div>
                </motion.main>
            ) : (
                <motion.main 
                    className="animated-container animated-grid-2"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div 
                        className="user-event-browser"
                        variants={itemVariants}
                    >
                        <section className="animated-card scroll-reveal">
                            <AnimatedWrapper animation="bounceIn" delay={0.2}>
                                <div className="animated-section-header">
                                    <h2 className="animated-heading-2">🗓️ Upcoming Events</h2>
                                    <p className="animated-body">Find an event that interests you and click "Manage" to see details and register.</p>
                                </div>
                            </AnimatedWrapper>
                            <EventList
                                events={events}
                                loading={loading}
                                error={null}
                                isCreator={isCreator}
                                handleEditClick={() => {}}
                                handleDeleteEvent={() => {}}
                            />
                        </section>
                    </motion.div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                        <motion.section 
                            className="page-section page-section--sidebar"
                            variants={itemVariants}
                        >
                            <AnimatedWrapper animation="slideInRight" delay={0.3}>
                                <div className="section-header">
                                    <h2>🎟️ My Registrations</h2>
                                    <p>A list of all events you are registered to attend.</p>
                                </div>
                            </AnimatedWrapper>
                            <MyRegistrationsList />
                        </motion.section>
                        
                        <motion.div
                            variants={itemVariants}
                            style={{ alignSelf: 'center' }}
                        >
                            <CalendarWidget 
                                events={events.map(event => ({
                                    id: event.id,
                                    name: event.name,
                                    date: event.date
                                }))}
                            />
                        </motion.div>
                    </div>
                </motion.main>
            )}
        </>
    );
};

export default HomePage;