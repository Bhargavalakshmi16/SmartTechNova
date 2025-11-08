import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import MetricCard from '../../components/MetricCard';
import Header from '../../components/Header'; // <-- CRITICAL FIX: Header Import Added
import '../../styles/App.css';
// Ensure all icons are imported
import { Home, Users, BookOpen, AlertCircle, Calendar, FileText, BarChart3, Clock, Zap, Target, Monitor, Trash2, Settings } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Admin Sidebar Navigation links
const adminNav = [
    { name: 'Dashboard', icon: Home, href: 'dashboard' },
    { name: 'Classrooms', icon: Monitor, href: 'classrooms' },
    { name: 'Users', icon: Users, href: 'users' },
    { name: 'Faculty Timetable', icon: Calendar, href: 'faculty_timetable' },
    { name: 'Student Timetable', icon: Calendar, href: 'student_timetable' },
    { name: 'Analytics', icon: BarChart3, href: 'analytics' },
    { name: 'Notifications', icon: AlertCircle, href: 'notifications' },
    { name: 'Settings', icon: Settings, href: 'settings' },
];

// --- Sub-Component for Dashboard Overview ---

const DashboardOverview = ({ metrics, activityLogs }) => (
    <>
        {/* Top Metrics */}
        <div className="grid-4 sm-grid-2 mb-8">
            <MetricCard title="Active Classes" value={metrics.activeClasses || 0} unit="" icon={Zap} color="blue" change="+5%" />
            <MetricCard title="Total Students" value={metrics.totalStudents || 0} unit="" icon={Users} color="green" change="+2%" />
            <MetricCard title="Total Faculty" value={metrics.totalFaculty || 0} unit="" icon={BookOpen} color="purple" change="+0%" />
            <MetricCard title="Avg Attendance" value={metrics.avgAttendance || 0} unit="%" icon={BarChart3} color="yellow" change="-1%" />
        </div>

        <div className="lg-grid-2 mb-8">
            {/* Live Classrooms (Simplified Mock for now) */}
            <div className="card shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center"><Monitor size={20} style={{ marginRight: '8px', color: '#2563eb' }} /> Live Class Status</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ padding: '12px', border: '1px solid #e5e7eb', borderRadius: '8px', backgroundColor: '#f0f9ff' }}>
                        <p className="font-semibold text-blue-600">Data Structures in A-301</p>
                        <p className="text-sm text-gray-600">Faculty: Dr. Alice Chen | Live since 09:00 AM</p>
                    </div>
                    <div style={{ padding: '12px', border: '1px solid #e5e7eb', borderRadius: '8px', backgroundColor: '#fff' }}>
                        <p className="font-semibold text-gray-800">Web Development in A-205</p>
                        <p className="text-sm text-gray-600">Faculty: Prof. Bob Smith | Scheduled Next</p>
                    </div>
                </div>
            </div>

            {/* Faculty Activity Log */}
            <div className="card shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center"><Clock size={20} style={{ marginRight: '8px', color: '#2563eb' }} /> Faculty Activity Log</h3>
                <div style={{ maxHeight: '300px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {activityLogs.map((log, index) => (
                        <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f3f4f6', paddingBottom: '8px' }}>
                            <span className={`text-sm font-medium ${log.type === 'START' ? 'text-green-600' : 'text-purple-600'}`} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Target size={14} />
                                {log.message}
                            </span>
                            <span className="text-xs text-gray-500">{log.time}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </>
);

// --- Sub-Component for Analytics Page ---

const AnalyticsContent = ({ attendanceTrends, syllabusStatus }) => {
    // Helper to format syllabus status data for the chart
    const syllabusChartData = syllabusStatus.map(s => ({
        course: s.courseName,
        progress: s.progress,
        lagging: s.progress < 100 ? (100 - s.progress) : 0 // Show remaining progress if not 100%
    }));

    return (
        <div className="lg-grid-2 mb-8">
            {/* Weekly Attendance Trends Chart */}
            <div className="card shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Attendance Trends (Mock)</h3>
                <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={attendanceTrends}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                        <XAxis dataKey="month" stroke="#6b7280" />
                        <YAxis domain={[70, 100]} stroke="#6b7280" unit="%" />
                        <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }} />
                        <Line type="monotone" dataKey="percentage" stroke="#2563eb" strokeWidth={3} dot={{ stroke: '#2563eb', strokeWidth: 2 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Syllabus Completion Status Bars */}
            <div className="card shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Syllabus Completion Status (%)</h3>
                <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={syllabusChartData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <YAxis dataKey="course" type="category" stroke="#6b7280" />
                        <XAxis type="number" domain={[0, 100]} stroke="#6b7280" unit="%" />
                        <Tooltip formatter={(value, name) => [value.toFixed(0), name === 'progress' ? 'Completed' : 'Remaining']} contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }} />
                        <Bar dataKey="progress" stackId="a" fill="#10b981" name="Completed" radius={[4, 0, 0, 4]} />
                        <Bar dataKey="lagging" stackId="a" fill="#f59e0b" name="Remaining" radius={[0, 4, 4, 0]} />
                    </BarChart>
                </ResponsiveContainer>
                <p className="text-sm text-gray-500 mt-4">Shows live progress pulled from the Syllabus Model.</p>
            </div>
        </div>
    );
};

// --- Sub-Component for User Management ---

const UserManagement = ({ userList }) => {
    const { user } = useAuth();

    return (
        <div className="card shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900">User Management ({userList.length} Total Users)</h3>
                <button className="button-primary" style={{ padding: '8px 16px', fontSize: '14px' }}>+ Add New User</button>
            </div>

            <div style={{ overflowX: 'auto' }}>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>ID / Email</th>
                            <th>Role</th>
                            <th>Department</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userList.map((u, index) => (
                            <tr key={u._id || index}>
                                <td className="text-sm font-medium text-gray-900">{u.name}</td>
                                <td className="text-xs text-gray-600">{u.id} / {u.email}</td>
                                <td>
                                    <span className={`table-status ${u.role === 'student' ? 'status-student' : 'status-faculty'}`}>
                                        {u.role.charAt(0).toUpperCase() + u.role.slice(1)}
                                    </span>
                                </td>
                                <td className="text-sm text-gray-600">{u.department}</td>
                                <td className="text-sm">
                                    <button style={{ color: '#4f46e5', padding: '4px', background: 'none', border: 'none', cursor: 'pointer' }} title="Edit"><FileText size={18} /></button>
                                    <button style={{ color: '#dc2626', padding: '4px', background: 'none', border: 'none', cursor: 'pointer', marginLeft: '8px' }} title="Delete"><Trash2 size={18} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};


// --- Main Admin Dashboard Component ---
const AdminDashboard = () => {
    const { user, fetchData } = useAuth();
    const [activeTab, setActiveTab] = useState('dashboard');

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState({
        metrics: {},
        userList: [],
        attendanceTrends: [],
        syllabusStatus: [],
        activityLogs: []
    });

    // --- Core Data Fetch ---
    useEffect(() => {
        const loadAdminData = async () => {
            // CRITICAL CHECK: Ensure user is admin and token is present
            if (!user || user.role !== 'admin' || !user.token) {
                setIsLoading(false);
                return;
            }

            try {
                // 1. Fetch Metrics and Analytics Data (from /api/admin/analytics)
                const analyticsResponse = await fetchData('/api/admin/analytics');

                // 2. Fetch User List (from /api/admin/users)
                const usersResponse = await fetchData('/api/admin/users');

                // Prepare syllabus data for charts
                const formattedSyllabus = analyticsResponse.syllabusStatus.map(s => ({
                    ...s,
                    progress: Math.round(s.progress), // Round progress to whole number
                    courseName: s.course // Use course name from backend for consistent display
                }));

                setData({
                    metrics: analyticsResponse.metrics,
                    userList: usersResponse,
                    attendanceTrends: analyticsResponse.attendanceTrends,
                    syllabusStatus: formattedSyllabus,
                    // Mock data for activity log
                    activityLogs: [
                        { type: 'START', message: 'Dr. Chen started Data Structures', time: '10:00 AM' },
                        { type: 'LOGIN', message: 'Student 12345 marked attendance', time: '10:02 AM' },
                        { type: 'ALERT', message: 'Web Dev syllabus lagging (65%)', time: '10:05 AM' },
                    ]
                });

            } catch (err) {
                console.error("Error loading Admin data:", err);
                // Check if the error is 403 Forbidden (Admin route protection failure)
                const errorMessage = err.response?.status === 403
                    ? 'Access Denied. You are not authorized to view admin data.'
                    : `Failed to load data: ${err.message}`;

                setError(errorMessage);
            } finally {
                setIsLoading(false);
            }
        };

        loadAdminData();
    }, [user, fetchData]);

    const renderContent = () => {
        if (isLoading) {
            return <div className="card p-6 text-center text-gray-500">Loading comprehensive admin data...</div>;
        }
        if (error) {
            return <div className="card p-6 text-center bg-red-100 text-red-700">Error: {error}</div>;
        }

        switch (activeTab) {
            case 'dashboard':
                return <DashboardOverview metrics={data.metrics} activityLogs={data.activityLogs} />;
            case 'classrooms':
                return <div className="card p-6">Classroom Monitoring View (To be integrated with live data)</div>;
            case 'users':
                return <UserManagement userList={data.userList} />;
            case 'faculty_timetable':
                return <div className="card p-6">Faculty Timetable Management (To be integrated)</div>;
            case 'student_timetable':
                return <div className="card p-6">Student Timetable Management (To be integrated)</div>;
            case 'analytics':
                return <AnalyticsContent attendanceTrends={data.attendanceTrends} syllabusStatus={data.syllabusStatus} />;
            case 'notifications':
                return <div className="card p-6">System Notifications and Alerts (To be integrated)</div>;
            case 'settings':
                return <div className="card p-6">Admin Settings</div>;
            default:
                return null;
        }
    };

    // Mock Notifications for Header
    const notifications = [
        { message: 'New user registered (1)', timestamp: '30 mins ago' },
        { message: 'Server latency warning (1)', timestamp: '1 hour ago' }
    ];

    return (
        <div className="app-container">
            <div className="sidebar-wrapper">
                <div className="sidebar-title">Admin Panel</div>
                <div className="sidebar-nav">
                    {adminNav.map(item => (
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
                    <h1 className="text-3xl font-bold text-gray-900 mb-6">
                        {adminNav.find(n => n.href === activeTab)?.name || 'Admin Panel'}
                    </h1>
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;