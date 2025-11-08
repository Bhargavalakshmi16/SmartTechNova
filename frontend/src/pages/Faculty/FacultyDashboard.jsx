import React, { useState, useEffect } from 'react';
import { Clock, Users, Book, BarChart3, QrCode, FileText, Plus, AlertCircle, Home, Monitor, Calendar, BookOpen, AlignLeft, Grid, Settings, Zap } from 'lucide-react'; // <-- ZAP ADDED HERE
import Header from '../../components/Header';
import MetricCard from '../../components/MetricCard';
import { useAuth } from '../../context/AuthContext';
import FacultySyllabus from './FacultySyllabus';
import FacultyReports from './FacultyReports';
import '../../styles/App.css';

const API_BASE_URL = 'http://localhost:5000';

// Faculty Sidebar Navigation links
const facultyNav = [
    { name: 'Dashboard', icon: Home, href: 'dashboard' },
    { name: 'Classes', icon: Users, href: 'classes' },
    { name: 'Attendance', icon: Clock, href: 'attendance' },
    { name: 'Syllabus', icon: BookOpen, href: 'syllabus' },
    { name: 'Reports', icon: FileText, href: 'reports' },
    { name: 'Settings', icon: Settings, href: 'settings' },
];

// --- Live Session Card Component ---
const LiveSessionCard = ({ liveSession, endSession }) => {
    if (!liveSession) return null;

    return (
        <div className="card shadow-lg" style={{ backgroundColor: '#fff3cd', border: '1px solid #ffeeba' }}>
            <div className="flex justify-between items-center mb-4">
                <h4 className="text-xl font-bold" style={{ color: '#856404' }}>{liveSession.course}</h4>
                <span className="table-status" style={{ backgroundColor: '#d4edda', color: '#155724' }}>
                    LIVE
                </span>
            </div>
            <p className="text-gray-700 mb-2">Room: {liveSession.room} • Students Present: {liveSession.totalAttendance}</p>
            <p className="text-gray-700 font-bold mb-4">
                Session Code (OTP): <span style={{ fontSize: '24px', color: '#007bff' }}>{liveSession.sessionCode}</span>
            </p>
            <button
                onClick={() => endSession(liveSession.sessionId)}
                className="button-primary"
                style={{ backgroundColor: '#dc3545', padding: '10px 20px' }}
            >
                End Session
            </button>
        </div>
    );
};

// --- Upcoming Class Card Component ---
const UpcomingClassCard = ({ item, startSession }) => (
    <div className="card p-4 flex justify-between items-center" style={{ borderLeft: '4px solid #007bff', backgroundColor: '#fff' }}>
        <div>
            <p className="font-semibold text-gray-800">{item.course} ({item.classId})</p>
            <p className="text-sm text-gray-500">
                {item.time} • Room {item.room} • {item.students} students
            </p>
        </div>
        <button
            onClick={() => startSession(item.classId)}
            className="button-primary"
            style={{ padding: '8px 16px', fontSize: '14px' }}
        >
            Start Session
        </button>
    </div>
);


// --- Dashboard Content Switch ---
const FacultyDashboardContent = ({ activeTab, facultyClasses, liveSession, startSession, endSession }) => {
    const { mockData } = useAuth();

    switch (activeTab) {
        case 'dashboard':
            return (
                <div>
                    <div className="grid-4 sm-grid-2 mb-8">
                        <MetricCard title="Active Classes" value={liveSession ? 1 : 0} unit="" icon={Zap} color="blue" change="" />
                        <MetricCard title="Total Students" value="165" unit="" icon={Users} color="green" change="" />
                        <MetricCard title="Avg Attendance" value="82" unit="%" icon={BarChart3} color="purple" change="" />
                        <MetricCard title="Sessions Today" value="2" unit="" icon={Clock} color="yellow" change="" />
                    </div>

                    <h3 className="text-xl font-semibold text-gray-800 mb-4">
                        {liveSession ? 'Live Class Session' : 'Assigned Classes'}
                    </h3>

                    {liveSession ? (
                        <LiveSessionCard liveSession={liveSession} endSession={endSession} />
                    ) : (
                        /* Assigned Classes List */
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {facultyClasses.length > 0 ? (
                                facultyClasses.map((cls, index) => (
                                    <UpcomingClassCard key={index} item={cls} startSession={startSession} />
                                ))
                            ) : (
                                <div className="card text-center p-8 text-gray-500">
                                    No classes assigned or scheduled.
                                </div>
                            )}
                        </div>
                    )}
                </div>
            );

        case 'classes':
            // Classes View (To be implemented fully)
            return (
                <div className="card p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">Teaching Load Overview</h3>
                    <p className='text-gray-600 mb-4'>Total assigned courses: {facultyClasses.length}</p>
                    <div className="grid-2 sm-grid-1" style={{ gap: '16px' }}>
                        {facultyClasses.map((cls, index) => (
                            <div key={index} className="card p-4" style={{ borderLeft: '4px solid #8b5cf6', backgroundColor: '#f9fafb' }}>
                                <p className="font-semibold text-gray-800">{cls.course} ({cls.classId})</p>
                                <p className="text-sm text-gray-500">Students: {cls.students}</p>
                            </div>
                        ))}
                    </div>
                </div>
            );
        case 'attendance':
            return <div className="card p-6">Attendance Overview (To be implemented)</div>;
        case 'syllabus':
            return <FacultySyllabus teachingLoad={mockData.teachingLoad} />;
        case 'reports':
            return <FacultyReports />;
        case 'settings':
            return <div className="card p-6">Faculty Settings Page</div>;
        default:
            return null;
    }
};


// --- Main Faculty Dashboard Component ---
const FacultyDashboard = () => {
    const { user, fetchData } = useAuth();
    const [activeTab, setActiveTab] = useState('dashboard');
    const [facultyClasses, setFacultyClasses] = useState([]);
    const [liveSession, setLiveSession] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Mock Notifications for Header
    const notifications = [
        { message: 'Syllabus completion for AI305 is below threshold', timestamp: '1 hour ago' },
        { message: 'Request for leave approved for next Tuesday', timestamp: '5 hours ago' }
    ];

    // --- Core Data Fetch: Classes & Live Status ---
    const loadFacultyData = async () => {
        if (!user || !user.id || user.role !== 'faculty') {
            setIsLoading(false);
            return;
        }

        try {
            // 1. Fetch Assigned Classes
            const classesResponse = await fetchData(`/api/timetable/classes/${user.id}`);
            setFacultyClasses(classesResponse);

            // 2. Check for Active Live Session
            const liveResponse = await fetchData(`/api/classes/live`);
            setLiveSession(liveResponse.session);

        } catch (err) {
            console.error("Error loading faculty data:", err);
            setError('Failed to load classes or live session status.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadFacultyData();
        // Polling: Check for live session status every 30 seconds
        const intervalId = setInterval(loadFacultyData, 30000);
        return () => clearInterval(intervalId);
    }, [user]);


    // --- Session Control Handlers ---
    const startSession = async (classId) => {
        try {
            const response = await fetchData('/api/classes/start', 'POST', { classId });
            setLiveSession(response.session);
            // Use window.alert as a temporary substitute for a custom message box
            window.alert(`Session started for ${response.session.course}. OTP: ${response.session.sessionCode}`);
        } catch (error) {
            window.alert(`Failed to start session: ${error.response?.data?.message || error.message}`);
        }
    };

    const endSession = async (sessionId) => {
        if (!window.confirm("Are you sure you want to end this class session?")) {
            return;
        }
        try {
            const response = await fetchData('/api/classes/end', 'POST', { sessionId });
            setLiveSession(null);
            window.alert(`Session ended successfully. Attendance recorded for ${response.totalAttendance} students.`);
        } catch (error) {
            window.alert(`Failed to end session: ${error.response?.data?.message || error.message}`);
        }
    };


    const renderContent = () => {
        if (isLoading) {
            return <div className="card p-6 text-center text-gray-500">Loading faculty data...</div>;
        }
        if (error) {
            return <div className="card p-6 text-center bg-red-100 text-red-700">Error: {error}</div>;
        }

        return (
            <FacultyDashboardContent
                activeTab={activeTab}
                facultyClasses={facultyClasses}
                liveSession={liveSession}
                startSession={startSession}
                endSession={endSession}
            />
        );
    };

    return (
        <div className="app-container">
            <div className="sidebar-wrapper">
                {/* Simplified Sidebar based on fixed layout */}
                <div className="sidebar-title">Faculty Panel</div>
                <div className="sidebar-nav">
                    {facultyNav.map(item => (
                        <button
                            key={item.href}
                            onClick={() => setActiveTab(item.href)}
                            className={activeTab === item.href ? 'active' : ''}
                        >
                            <item.icon size={18} className="icon" />
                            {item.name}
                        </button>
                    ))}
                </div>
            </div>

            <div className="main-content">
                <Header notifications={notifications} />
                <div className="page-container">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default FacultyDashboard;