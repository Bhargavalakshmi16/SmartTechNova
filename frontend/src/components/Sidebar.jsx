import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Home, Monitor, Users, Calendar, BookOpen, BarChart3, Bell, Settings, Grid, QrCode, FileText, Book, AlignLeft } from 'lucide-react';
import '../styles/App.css'; 

const Sidebar = ({ activeTab, setActiveTab }) => {
    const { user } = useAuth();
    const role = user?.role;
    
    const navItems = {
        student: [
            { id: 'dashboard', name: 'Overview', icon: Grid },
            { id: 'timetable', name: 'Timetable', icon: Calendar },
            { id: 'attendance', name: 'Attendance', icon: QrCode },
            { id: 'reports', name: 'Reports', icon: FileText },
            { id: 'settings', name: 'Settings', icon: Settings },
        ],
        faculty: [
            { id: 'dashboard', name: 'Dashboard', icon: Grid },
            { id: 'classes', name: 'Classes', icon: Book },
            { id: 'attendance', name: 'Attendance', icon: QrCode },
            { id: 'syllabus', name: 'Syllabus', icon: AlignLeft },
            { id: 'reports', name: 'Reports', icon: FileText },
            { id: 'settings', name: 'Settings', icon: Settings },
        ],
        admin: [
            { id: 'dashboard', name: 'Dashboard', icon: Home },
            { id: 'classrooms', name: 'Classrooms', icon: Monitor },
            { id: 'users', name: 'Users', icon: Users },
            { id: 'faculty_timetable', name: 'Faculty Timetable', icon: Calendar },
            { id: 'student_timetable', name: 'Student Timetable', icon: BookOpen },
            { id: 'analytics', name: 'Analytics', icon: BarChart3 },
            { id: 'notifications', name: 'Notifications', icon: Bell },
            { id: 'settings', name: 'Settings', icon: Settings },
        ],
    };

    const items = navItems[role] || navItems.student;

    return (
        <div className="sidebar-wrapper">
            <div className="flex items-center px-4 mb-8">
                <BookOpen className="icon" color="#3b82f6" size={32} />
                <span className="sidebar-title">{role} Panel</span>
            </div>
            <nav className="sidebar-nav">
                {items.map(item => (
                    <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={activeTab === item.id ? 'active' : ''}
                    >
                        <item.icon size={20} className="icon" />
                        {item.name}
                    </button>
                ))}
            </nav>
        </div>
    );
};

export default Sidebar;