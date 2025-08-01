import {Routes, Route} from 'react-router-dom';
import type {FC} from 'react';
import './App.css';
import HomePage from './pages/HomePage';
import EventDetailPage from './pages/EventDetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProtectedRoute from './components/ProtectedRoute';
import GuestRoute from './components/GuestRoute';
import MyRegistrationsPage from './pages/MyRegistrationsPage';
import EventManagementPage from './pages/EventManagementPage';
import Navbar from './components/Navbar';

const App: FC = () => {
    return (
        <div className="app-container">
            <Navbar/>
            <main>
                <Routes>
                    <Route path="/" element={<ProtectedRoute><HomePage/></ProtectedRoute>}/>
                    <Route path="/event/:eventId" element={<ProtectedRoute><EventDetailPage/></ProtectedRoute>}/>
                    <Route path="/my-registrations" element={<ProtectedRoute><MyRegistrationsPage/></ProtectedRoute>}/>
                    <Route path="/manage/event/:eventId"
                           element={<ProtectedRoute><EventManagementPage/></ProtectedRoute>}/>

                    <Route path="/login" element={<GuestRoute><LoginPage/></GuestRoute>}/>
                    <Route path="/register" element={<GuestRoute><RegisterPage/></GuestRoute>}/>
                </Routes>
            </main>
        </div>
    );
}

export default App;