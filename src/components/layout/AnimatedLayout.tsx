import React from 'react';
import '../../styles/animated-design.css';

interface AnimatedLayoutProps {
    children: React.ReactNode;
}

const AnimatedLayout: React.FC<AnimatedLayoutProps> = ({ children }) => {
    return (
        <div className="animated-app">
            {/* Ambient Background */}
            <div className="ts-background" aria-hidden="true">
                <div className="ts-blob ts-blob-a" />
                <div className="ts-blob ts-blob-b" />
                <div className="ts-blob ts-blob-c" />
                <div className="ts-blob ts-blob-d" />
                <div className="ts-noise" />
            </div>

            {/* Professional Navigation */}
            <nav className="animated-navbar">
                <div className="animated-container">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                        <a href="/" className="animated-navbar-brand">
                            <div style={{ 
                                width: '32px', 
                                height: '32px', 
                                background: 'var(--animated-gradient-primary)', 
                                borderRadius: '8px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontWeight: 'bold'
                            }}>
                                AD
                            </div>
                            Animated Design
                        </a>
                        
                        <div className="animated-navbar-nav">
                            <a href="/" className="animated-navbar-link active">Home</a>
                            <a href="/about" className="animated-navbar-link">About Us</a>
                            <a href="/services" className="animated-navbar-link">Services</a>
                            <a href="/contact" className="animated-navbar-link">Contact</a>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main>
                {children}
            </main>

            {/* Professional Footer */}
            <footer className="animated-footer">
                <div className="animated-container">
                    <div className="animated-footer-content">
                        <div className="animated-footer-section">
                            <h4>Company</h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <a href="/about">About Us</a>
                                <a href="/careers">Careers</a>
                                <a href="/news">News</a>
                                <a href="/contact">Contact</a>
                            </div>
                        </div>
                        
                        <div className="animated-footer-section">
                            <h4>Services</h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <a href="/development">Software Development</a>
                                <a href="/consulting">Consulting</a>
                                <a href="/support">Support</a>
                                <a href="/training">Training</a>
                            </div>
                        </div>
                        
                        <div className="animated-footer-section">
                            <h4>Resources</h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <a href="/blog">Blog</a>
                                <a href="/documentation">Documentation</a>
                                <a href="/downloads">Downloads</a>
                                <a href="/community">Community</a>
                            </div>
                        </div>
                        
                        <div className="animated-footer-section">
                            <h4>Connect</h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <a href="/linkedin">LinkedIn</a>
                                <a href="/twitter">Twitter</a>
                                <a href="/facebook">Facebook</a>
                                <a href="/github">GitHub</a>
                            </div>
                        </div>
                    </div>
                    
                    <div className="animated-footer-bottom">
                        <p>Copyright © 2025 Animated Design Application. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default AnimatedLayout;