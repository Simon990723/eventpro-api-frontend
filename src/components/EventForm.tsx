import {type FC, type FormEvent, type ChangeEvent} from 'react';
import {Oval} from 'react-loader-spinner';

interface EventFormProps {
    formData: { name: string; date: string; location: string; price: number | string; };
    editingEventId: number | null;
    handleInputChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handleFormSubmit: (e: FormEvent) => void;
    handleCancelEdit: () => void;
    aiPrompt: string;
    setAiPrompt: (value: string) => void;
    handleGenerateWithAi: () => void;
    isGenerating: boolean;
}

const EventForm: FC<EventFormProps> = ({
                                           formData,
                                           editingEventId,
                                           handleInputChange,
                                           handleFormSubmit,
                                           handleCancelEdit,
                                           aiPrompt,
                                           setAiPrompt,
                                           handleGenerateWithAi,
                                           isGenerating
                                       }) => {
    return (
        <form onSubmit={handleFormSubmit} className="event-form">
            <div className="ai-feature-box">
                <label htmlFor="ai-prompt">✨ AI Event Assistant</label>
                <p className="form-group-description">Describe your event idea, and let AI fill in the details!</p>
                <textarea
                    id="ai-prompt"
                    placeholder="e.g., A large tech conference in Singapore"
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    rows={3}
                />
                <button
                    type="button"
                    onClick={handleGenerateWithAi}
                    disabled={isGenerating}
                    className="button-ai"
                >
                    {isGenerating ? (
                        <Oval height={20} width={20} color="#ffffff" secondaryColor="#eeeeee" strokeWidth={4}/>
                    ) : (
                        'Generate with AI'
                    )}
                </button>
            </div>

            <hr className="form-divider"/>

            <div className="form-group">
                <label htmlFor="name">Event Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="price">Ticket Price ($)</label>
                <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="0.00 for a free event"
                    required
                    min="0"
                    step="0.01"
                />
            </div>
            <div className="form-group">
                <label htmlFor="date">Date</label>
                <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="location">Location</label>
                <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                />
            </div>

            <div className="form-actions">
                {editingEventId && (
                    <button type="button" onClick={handleCancelEdit} className="button-secondary">
                        Cancel
                    </button>
                )}
                <button type="submit" className="cta-button">
                    {editingEventId ? 'Update Event' : 'Add Event'}
                </button>
            </div>
        </form>
    );
};

export default EventForm;