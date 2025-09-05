import { Routes, Route } from 'react-router-dom';
import type { FC } from 'react';
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

const App: FC = () => {
    return (
        <div className="animated-app">
            <AnimatedBackground />
            <Navbar />
            <main>
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
