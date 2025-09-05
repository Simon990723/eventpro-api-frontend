import React, { useState } from 'react';
import AnimatedLayout from "../components/layout/AnimatedLayout";
import { useScrollRevealRef } from "../hooks/useScrollReveal";
import Skeleton from "../components/ui/Skeleton";
import "../styles/animated-design.css";

const AnimatedDemo: React.FC = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [showModal, setShowModal] = useState(false);
    const scrollRevealRef = useScrollRevealRef();

    const achievements = [
        {
            icon: '🏆',
            title: '2025 Excellence Award',
            description: 'Recognized for outstanding software development and innovation in the industry.'
        },
        {
            icon: '🌟',
            title: 'Great Place to Work',
            description: 'Certified as one of the best companies to work for in the technology sector.'
        },
        {
            icon: '🚀',
            title: 'Innovation Leader',
            description: 'Leading the way in agile development and cutting-edge technology solutions.'
        },
        {
            icon: '🤝',
            title: 'Trusted Partner',
            description: 'Building long-lasting relationships with clients through reliable service delivery.'
        }
    ];

    const coreValues = [
        {
            title: 'Value Driven',
            description: 'We focus on the impact of what we deliver. We are committed to and prioritize bringing value to our shareholders, customers and employees.'
        },
        {
            title: 'Continuous Learning',
            description: 'Learning is a part of life. We embrace the inevitability of failure, as continuous learning is a prerequisite of success.'
        },
        {
            title: 'Emergent Leadership',
            description: 'Roles do not define who we are. See a need, do the deed. Leadership is not a position here, it is an action.'
        },
        {
            title: 'Practical',
            description: 'We solve real problems. Plans and actions reflect practicality and we make sure they are worth doing to achieve desirable results.'
        },
        {
            title: 'Being Adaptive',
            description: 'We welcome changes and respond in a timely manner. In the world of VUCA, we survive and thrive by adapting quickly to changes.'
        },
        {
            title: 'Transparency',
            description: 'We pledge to be open and candid in all our endeavors. Transparency is important in self-organizing environments.'
        }
    ];

    const stats = [
        { number: '15+', label: 'Years of Excellence' },
        { number: '500+', label: 'Projects Delivered' },
        { number: '100+', label: 'Happy Clients' },
        { number: '50+', label: 'Team Members' }
    ];

    return (
        <AnimatedLayout>
            {/* Hero Section */}
            <section className="animated-hero">
                <div className="animated-container">
                    <div className="animated-hero-content">
                        <h1 className="animated-hero-title animated-animate-fade-in-up">
                            We Are Producers of Innovation
                        </h1>
                        <p className="animated-hero-subtitle animated-animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                            Animated Design is a professional design system dedicated to creating beautiful, 
                            functional, and engaging user experiences through modern web technologies.
                        </p>
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', animationDelay: '0.4s' }} className="animated-animate-fade-in-up">
                            <button className="animated-btn animated-btn-primary animated-btn-large">
                                Get Started
                            </button>
                            <button className="animated-btn animated-btn-outline animated-btn-large">
                                Learn More
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="animated-stats">
                <div className="animated-container">
                    <div className="animated-stats-grid">
                        {stats.map((stat, index) => (
                            <div key={index} className="animated-stat-item animated-animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                                <span className="animated-stat-number">{stat.number}</span>
                                <span className="animated-stat-label">{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="animated-section">
                <div className="animated-container">
                    {/* Tabs Navigation */}
                    <div className="animated-tabs">
                        <div className="animated-tab-list">
                            <button 
                                className={`animated-tab ${activeTab === 'overview' ? 'active' : ''}`}
                                onClick={() => setActiveTab('overview')}
                            >
                                Overview
                            </button>
                            <button 
                                className={`animated-tab ${activeTab === 'values' ? 'active' : ''}`}
                                onClick={() => setActiveTab('values')}
                            >
                                Core Values
                            </button>
                            <button 
                                className={`animated-tab ${activeTab === 'achievements' ? 'active' : ''}`}
                                onClick={() => setActiveTab('achievements')}
                            >
                                Achievements
                            </button>
                            <button 
                                className={`animated-tab ${activeTab === 'demo' ? 'active' : ''}`}
                                onClick={() => setActiveTab('demo')}
                            >
                                Components Demo
                            </button>
                        </div>
                    </div>

                    {/* Tab Content */}
                    <div className="animated-tab-content">
                        {activeTab === 'overview' && (
                            <div className="animated-grid animated-grid-2">
                                <div className="animated-card animated-animate-fade-in-left">
                                    <h2 className="animated-heading-2">Our Vision</h2>
                                    <p className="animated-body">
                                        We are the Producers of Innovation through providing the most engaging and 
                                        beautiful design systems to become a globally recognized design brand.
                                    </p>
                                    <div className="animated-mt-6">
                                        <button className="animated-btn animated-btn-primary">
                                            Learn About Our Vision
                                        </button>
                                    </div>
                                </div>

                                <div className="animated-card animated-animate-fade-in-right">
                                    <h2 className="animated-heading-2">Our Mission</h2>
                                    <p className="animated-body">
                                        Animated Design delivers beautiful experiences to everyone! We aim to bring 
                                        disruptive change to the design industry by challenging conventional approaches.
                                    </p>
                                    <div className="animated-mt-6">
                                        <button className="animated-btn animated-btn-secondary">
                                            Explore Our Mission
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'values' && (
                            <div>
                                <div className="animated-section-header">
                                    <h2 className="animated-section-title">6 Core Values of Our Team</h2>
                                    <p className="animated-section-subtitle">
                                        These values guide everything we do and shape our design philosophy.
                                    </p>
                                </div>
                                
                                <div className="animated-values-grid">
                                    {coreValues.map((value, index) => (
                                        <div key={index} className="animated-value-card animated-animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                                            <h3 className="animated-value-title">{value.title}</h3>
                                            <p className="animated-value-description">{value.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'achievements' && (
                            <div>
                                <div className="animated-section-header">
                                    <h2 className="animated-section-title">Our Achievements</h2>
                                    <p className="animated-section-subtitle">
                                        Recognition and awards that showcase our commitment to excellence.
                                    </p>
                                </div>
                                
                                <div className="animated-achievement-grid">
                                    {achievements.map((achievement, index) => (
                                        <div key={index} className="animated-achievement-card animated-animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                                            <div className="animated-achievement-icon">
                                                {achievement.icon}
                                            </div>
                                            <h3 className="animated-achievement-title">{achievement.title}</h3>
                                            <p className="animated-achievement-description">{achievement.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'demo' && (
                            <div>
                                <div className="animated-section-header">
                                    <h2 className="animated-section-title">Components Demo</h2>
                                    <p className="animated-section-subtitle">
                                        Explore the various UI components available in this design system.
                                    </p>
                                </div>

                                <div className="animated-grid animated-grid-2">
                                    {/* Buttons Demo */}
                                    <div className="animated-card">
                                        <h3 className="animated-heading-3">Buttons</h3>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                            <button className="animated-btn animated-btn-primary">Primary Button</button>
                                            <button className="animated-btn animated-btn-secondary">Secondary Button</button>
                                            <button className="animated-btn animated-btn-outline">Outline Button</button>
                                            <button className="animated-btn animated-btn-primary animated-btn-small">Small Button</button>
                                            <button className="animated-btn animated-btn-primary animated-btn-large">Large Button</button>
                                        </div>
                                    </div>

                                    {/* Alerts Demo */}
                                    <div className="animated-card">
                                        <h3 className="animated-heading-3">Alerts</h3>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                            <div className="animated-alert animated-alert-success">
                                                <span>✓</span>
                                                <span>Success! Your action was completed successfully.</span>
                                            </div>
                                            <div className="animated-alert animated-alert-warning">
                                                <span>⚠</span>
                                                <span>Warning! Please check your input.</span>
                                            </div>
                                            <div className="animated-alert animated-alert-danger">
                                                <span>✕</span>
                                                <span>Error! Something went wrong.</span>
                                            </div>
                                            <div className="animated-alert animated-alert-info">
                                                <span>ℹ</span>
                                                <span>Info! Here's some helpful information.</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Badges Demo */}
                                    <div className="animated-card">
                                        <h3 className="animated-heading-3">Badges</h3>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                            <span className="animated-badge animated-badge-primary">Primary</span>
                                            <span className="animated-badge animated-badge-secondary">Secondary</span>
                                            <span className="animated-badge animated-badge-success">Success</span>
                                            <span className="animated-badge animated-badge-warning">Warning</span>
                                            <span className="animated-badge animated-badge-danger">Danger</span>
                                            <span className="animated-badge animated-badge-primary animated-badge-outline">Outline</span>
                                        </div>
                                    </div>

                                    {/* Form Demo */}
                                    <div className="animated-card">
                                        <h3 className="animated-heading-3">Form Elements</h3>
                                        <form>
                                            <div className="animated-form-group">
                                                <label className="animated-form-label">Full Name</label>
                                                <input type="text" className="animated-form-input" placeholder="Enter your full name" />
                                            </div>
                                            <div className="animated-form-group">
                                                <label className="animated-form-label">Email</label>
                                                <input type="email" className="animated-form-input" placeholder="Enter your email" />
                                            </div>
                                            <div className="animated-form-group">
                                                <label className="animated-form-label">Message</label>
                                                <textarea className="animated-form-input animated-form-textarea" placeholder="Enter your message"></textarea>
                                            </div>
                                            <div className="animated-form-group">
                                                <label className="animated-form-label">Category</label>
                                                <select className="animated-form-input animated-form-select">
                                                    <option>Select a category</option>
                                                    <option>General Inquiry</option>
                                                    <option>Technical Support</option>
                                                    <option>Business Partnership</option>
                                                </select>
                                            </div>
                                            <button type="button" className="animated-btn animated-btn-primary" onClick={() => setShowModal(true)}>
                                                Submit Form
                                            </button>
                                        </form>
                                    </div>
                                </div>

                                {/* Table Demo */}
                                <div className="animated-card animated-mt-8">
                                    <h3 className="animated-heading-3">Data Table</h3>
                                    <table className="animated-table">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Position</th>
                                                <th>Department</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>John Doe</td>
                                                <td>Senior Developer</td>
                                                <td>Engineering</td>
                                                <td><span className="animated-badge animated-badge-success">Active</span></td>
                                            </tr>
                                            <tr>
                                                <td>Jane Smith</td>
                                                <td>Product Manager</td>
                                                <td>Product</td>
                                                <td><span className="animated-badge animated-badge-success">Active</span></td>
                                            </tr>
                                            <tr>
                                                <td>Mike Johnson</td>
                                                <td>UX Designer</td>
                                                <td>Design</td>
                                                <td><span className="animated-badge animated-badge-warning">Away</span></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                {/* Enhanced Skeleton Loading States */}
                                <div className="animated-card animated-mt-8">
                                    <h3 className="animated-heading-3">Enhanced Skeleton Components</h3>
                                    <div className="animated-grid animated-grid-2" style={{ gap: '2rem' }}>
                                        {/* Wave Animation */}
                                        <div>
                                            <h4 className="animated-heading-4">Wave Animation</h4>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
                                                <Skeleton variant="text" width="100%" animation="wave" />
                                                <Skeleton variant="text" width="80%" animation="wave" />
                                                <Skeleton variant="text" width="60%" animation="wave" />
                                                <Skeleton variant="circular" width={60} height={60} animation="wave" />
                                                <Skeleton variant="rectangular" width="100%" height={120} animation="wave" />
                                            </div>
                                        </div>
                                        
                                        {/* Pulse Animation */}
                                        <div>
                                            <h4 className="animated-heading-4">Pulse Animation</h4>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
                                                <Skeleton variant="text" width="100%" animation="pulse" />
                                                <Skeleton variant="text" width="80%" animation="pulse" />
                                                <Skeleton variant="text" width="60%" animation="pulse" />
                                                <Skeleton variant="circular" width={60} height={60} animation="pulse" />
                                                <Skeleton variant="rounded" width="100%" height={120} animation="pulse" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Scroll Reveal Animations Demo */}
                                <div className="animated-card animated-mt-8">
                                    <h3 className="animated-heading-3">Scroll Reveal Animations</h3>
                                    <p className="animated-body" style={{ marginBottom: '2rem' }}>
                                        Scroll down to see elements animate as they come into view. These animations respect prefers-reduced-motion settings.
                                    </p>
                                    
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                                        {/* Fade in from bottom */}
                                        <div ref={scrollRevealRef} className="scroll-reveal animated-card" style={{ padding: '2rem' }}>
                                            <h4 className="animated-heading-4">Fade In Up</h4>
                                            <p>This card fades in from the bottom as it enters the viewport.</p>
                                        </div>
                                        
                                        {/* Fade in from left */}
                                        <div ref={scrollRevealRef} className="scroll-reveal-left animated-card" style={{ padding: '2rem' }}>
                                            <h4 className="animated-heading-4">Fade In Left</h4>
                                            <p>This card slides in from the left side of the screen.</p>
                                        </div>
                                        
                                        {/* Fade in from right */}
                                        <div ref={scrollRevealRef} className="scroll-reveal-right animated-card" style={{ padding: '2rem' }}>
                                            <h4 className="animated-heading-4">Fade In Right</h4>
                                            <p>This card slides in from the right side of the screen.</p>
                                        </div>
                                        
                                        {/* Scale animation */}
                                        <div ref={scrollRevealRef} className="scroll-reveal-scale animated-card" style={{ padding: '2rem' }}>
                                            <h4 className="animated-heading-4">Scale In</h4>
                                            <p>This card scales up from a smaller size when it becomes visible.</p>
                                        </div>
                                        
                                        {/* Staggered elements */}
                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                                            <div ref={scrollRevealRef} className="scroll-reveal animated-card">
                                                <h5 className="animated-heading-5">Card 1</h5>
                                                <p>Staggered animation with delay</p>
                                            </div>
                                            <div ref={scrollRevealRef} className="scroll-reveal animated-card">
                                                <h5 className="animated-heading-5">Card 2</h5>
                                                <p>Each card appears with increasing delay</p>
                                            </div>
                                            <div ref={scrollRevealRef} className="scroll-reveal animated-card">
                                                <h5 className="animated-heading-5">Card 3</h5>
                                                <p>Creating a beautiful staggered effect</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Modal Demo */}
            {showModal && (
                <div className="animated-modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="animated-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="animated-modal-header">
                            <h3 className="animated-modal-title">Form Submitted Successfully!</h3>
                        </div>
                        <div className="animated-modal-body">
                            <p>Thank you for your submission. We'll get back to you within 24 hours.</p>
                        </div>
                        <div className="animated-modal-footer">
                            <button className="animated-btn animated-btn-secondary" onClick={() => setShowModal(false)}>
                                Close
                            </button>
                            <button className="animated-btn animated-btn-primary" onClick={() => setShowModal(false)}>
                                Got it!
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AnimatedLayout>
    );
};

export default AnimatedDemo;