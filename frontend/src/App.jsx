import React from 'react';
import { useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import StudentDashboard from './pages/Student/StudentDashboard';
import FacultyDashboard from './pages/Faculty/FacultyDashboard';
import AdminDashboard from './pages/Admin/AdminDashboard';
import LoadingScreen from './components/LoadingScreen';
import './styles/App.css';

function App() {
    const { isAuthenticated, user, isAuthReady } = useAuth();

    if (!isAuthReady) {
        return <LoadingScreen />;
    }

    if (!isAuthenticated || !user) {
        return <LoginPage />;
    }

    // Route based on user role
    switch (user.role) {
        case 'student':
            return <StudentDashboard />;
        case 'faculty':
            return <FacultyDashboard />;
        case 'admin':
            return <AdminDashboard />;
        default:
            return <LoginPage />;
    }
}

export default App;