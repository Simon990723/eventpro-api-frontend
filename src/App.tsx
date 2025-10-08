import { Routes, Route } from 'react-router-dom';
import { useEffect, type FC } from 'react';
import './styles/App.css';
import './styles/animated-design.css';
import HomePage from './pages/HomePage';
import EventDetailPage from './pages/EventDetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MyRegistrationsPage from './pages/MyRegistrationsPage';
import EventManagementPage from './pages/EventManagementPage';
import AnimatedDemo from './pages/AnimatedDemo';
import {
  Navbar,
  ProtectedRoute,
  GuestRoute,
  AnimatedBackground,
} from './components';
import useMediaQuery from './hooks/useMediaQuery';

const App: FC = () => {
    useEffect(() => {
        let timeoutId: number | undefined;
        const onScroll = () => {
            document.body.classList.add('scrolling');
            if (timeoutId) window.clearTimeout(timeoutId);
            timeoutId = window.setTimeout(() => {
                document.body.classList.remove('scrolling');
            }, 150);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', onScroll);
            if (timeoutId) window.clearTimeout(timeoutId);
        };
    }, []);

    const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
    const isMobileViewport = useMediaQuery('(max-width: 768px)');
    const shouldRenderAnimatedBackground = !prefersReducedMotion && !isMobileViewport;
    const appClassName = shouldRenderAnimatedBackground
        ? 'animated-app'
        : 'animated-app animated-app--lite';

    return (
        <div className={appClassName}>
            {shouldRenderAnimatedBackground && <AnimatedBackground />}
            <Navbar />
            <main className="app-main">
                <Routes>
                    <Route
                        path="/"
                        element={
                            <ProtectedRoute>
                                <HomePage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/event/:eventId"
                        element={
                            <ProtectedRoute>
                                <EventDetailPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/my-registrations"
                        element={
                            <ProtectedRoute>
                                <MyRegistrationsPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/manage/event/:eventId"
                        element={
                            <ProtectedRoute>
                                <EventManagementPage />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/login"
                        element={
                            <GuestRoute>
                                <LoginPage />
                            </GuestRoute>
                        }
                    />
                    <Route
                        path="/register"
                        element={
                            <GuestRoute>
                                <RegisterPage />
                            </GuestRoute>
                        }
                    />
                    <Route
                        path="/animated-demo"
                        element={<AnimatedDemo />}
                    />
                </Routes>
            </main>
        </div>
    );
};

export default App;
