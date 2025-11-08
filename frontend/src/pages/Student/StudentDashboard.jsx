import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import MetricCard from '../../components/MetricCard';
import StudentTimetable from './StudentTimetable';
import StudentReports from './StudentReports';
import Header from '../../components/Header'; // <-- CRITICAL: Header Import
import '../../styles/App.css';
import { BarChart3, Clock, Users, BookOpen, Calendar, Download, Zap, CheckCircle, FileText, AlertCircle, Settings } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

// Student Sidebar Navigation links
const studentNav = [
    { name: 'Overview', icon: BarChart3, href: 'dashboard' },
    { name: 'Timetable', icon: Calendar, href: 'timetable' },
    { name: 'Attendance', icon: CheckCircle, href: 'attendance' },
    { name: 'Reports', icon: FileText, href: 'reports' },
    { name: 'Settings', icon: Settings, href: 'settings' },
];

// --- Attendance Marking Component ---
const AttendanceMarking = ({ user, fetchData }) => {
    const [sessionCode, setSessionCode] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState(''); // success, error, info

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setMessageType('info');

        if (sessionCode.length !== 6) {
            setMessage('Session code must be 6 digits.');
            setMessageType('error');
            return;
        }

        try {
            const response = await fetchData('/api/attendance/mark', 'POST', { sessionCode });

            setMessage(response.message || `Attendance marked for ${response.course}!`);
            setMessageType('success');
            setSessionCode('');

        } catch (error) {
            setMessage(error.response?.data?.message || 'Failed to mark attendance. Check code or server.');
            setMessageType('error');
        }
    };

    const getMessageStyle = () => {
        switch (messageType) {
            case 'success':
                return { backgroundColor: '#d1fae5', color: '#047857' };
            case 'error':
                return { backgroundColor: '#fee2e2', color: '#b91c1c' };
            default:
                return { backgroundColor: '#eff6ff', color: '#1f2937' };
        }
    };

    return (
        <div className="card p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Mark Attendance</h3>
            <p className="text-gray-600 mb-4">Enter the 6-digit session code (OTP) provided by the faculty in the classroom.</p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <input
                    type="text"
                    value={sessionCode}
                    onChange={(e) => setSessionCode(e.target.value.replace(/[^0-9]/g, '').slice(0, 6))}
                    placeholder="Enter 6-digit code (OTP)"
                    maxLength="6"
                    className="login-input"
                    style={{ fontSize: '24px', textAlign: 'center', letterSpacing: '8px' }}
                    required
                />
                <button
                    type="submit"
                    className="button-primary"
                    style={{ padding: '12px', fontSize: '16px' }}
                >
                    Mark Attendance Now
                </button>
            </form>

            {message && (
                <div className="p-4 rounded-xl mt-4" style={{ ...getMessageStyle(), fontWeight: 'bold' }}>
                    {message}
                </div>
            )}
        </div>
    );
};

// --- Dashboard Content Switch ---
const StudentDashboardContent = ({ activeTab, setActiveTab, attendanceData, overallMetrics }) => {
    const { user, fetchData } = useAuth();

    const handleAttendanceClick = () => {
        setActiveTab('attendance');
    };

    switch (activeTab) {
        case 'dashboard':
            return (
                <div>
                    <div className="grid-4 mb-8">
                        <MetricCard title="Overall Attendance" value={overallMetrics.percentage} color="green" icon={CheckCircle} change={overallMetrics.change} />
                        <MetricCard title="Active Courses" value={overallMetrics.activeCourses} color="blue" icon={BookOpen} />
                        <MetricCard title="Classes Today" value={overallMetrics.classesToday} color="purple" icon={Calendar} />
                        <MetricCard title="Low Attendance" value={overallMetrics.lowAlerts} color="red" icon={AlertCircle} />
                    </div>

                    <div className="card shadow-lg p-6">
                        <h3 className="text-xl font-semibold text-gray-900 mb-6">Attendance Overview (Subject-wise)</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={attendanceData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                                <XAxis dataKey="subject" stroke="#6b7280" />
                                <YAxis domain={[0, 100]} stroke="#6b7280" />
                                <Tooltip
                                    formatter={(value) => [`${value}%`, 'Attendance']}
                                    contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
                                />
                                <Bar dataKey="percentage" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            );

        case 'timetable':
            return <StudentTimetable handleAttendanceClick={handleAttendanceClick} />;

        case 'attendance':
            return <AttendanceMarking user={user} fetchData={fetchData} />;

        case 'reports':
            return <StudentReports />;

        case 'settings':
            return <div className="card p-6">Settings and Profile (Optional)</div>;

        default:
            return <div className="card p-6">Content Not Found</div>;
    }
};


// --- Main Component ---
const StudentDashboard = () => {
    const { user, mockData } = useAuth();
    const [activeTab, setActiveTab] = useState('dashboard');

    const overallMetrics = {
        percentage: '87.6%',
        change: '+2.1%',
        activeCourses: 5,
        classesToday: 4,
        lowAlerts: 1
    };
    const attendanceData = mockData.studentAttendanceData;

    // Mock Notifications for Header
    const notifications = [
        { message: 'Physics class rescheduled to Room B-206', timestamp: '2 hours ago' },
        { message: 'Your attendance is below 75% in Physics', timestamp: '1 day ago' }
    ];

    return (
        <div className="app-container">
            <div className="sidebar-wrapper">
                <div className="sidebar-title">Student Panel</div>
                <div className="sidebar-nav">
                    {studentNav.map(item => (
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
                <Header notifications={notifications} /> {/* <-- HEADER RESTORED HERE */}
                <div className="page-container">
                    <StudentDashboardContent
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                        attendanceData={attendanceData}
                        overallMetrics={overallMetrics}
                    />
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;