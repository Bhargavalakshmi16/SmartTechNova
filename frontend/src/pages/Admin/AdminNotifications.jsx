import React from 'react';
import { Trash2, AlertCircle, TrendingDown, Calendar, User, Bell } from 'lucide-react';
import Check from '../../components/Check';
import '../../styles/App.css';

const AdminNotifications = () => {
    const notifications = [
        { type: 'syllabus_alert', message: 'Dr. Patel - Database Design course is only 60% complete. Exam in 2 weeks.', timestamp: '2 hours ago' },
        { type: 'low_attendance', message: 'Rahul Sharma (CSB301) attendance dropped below 75%. Current: 72%', timestamp: '4 hours ago' },
        { type: 'rescheduled', message: 'Web Development Trial 201 moved from 9:30 AM to 2:00 PM on Friday', timestamp: '6 hours ago' },
        { type: 'faculty_absent', message: 'Prof. Gupta did not start Web Development session at 9:30 AM', timestamp: '8 hours ago' },
        { type: 'system_update', message: 'Attendance module updated with new QR verification system', timestamp: '1 day ago' },
    ];

    const getColorClasses = (type) => {
        switch (type) {
            case 'syllabus_alert':
            case 'low_attendance':
            case 'faculty_absent':
                return { bg: '#fee2e2', border: '#ef4444', text: '#b91c1c' };
            case 'rescheduled':
                return { bg: '#dbeafe', border: '#3b82f6', text: '#1e40af' };
            case 'system_update':
                return { bg: '#d1fae5', border: '#10b981', text: '#047857' };
            default:
                return { bg: '#f3f4f6', border: '#9ca3af', text: '#4b5563' };
        }
    };

    const getIcon = (type) => {
        switch (type) {
            case 'syllabus_alert': return <AlertCircle size={20} color="#f59e0b" style={{ marginRight: '12px' }} />;
            case 'low_attendance': return <TrendingDown size={20} color="#ef4444" style={{ marginRight: '12px' }} />;
            case 'rescheduled': return <Calendar size={20} color="#3b82f6" style={{ marginRight: '12px' }} />;
            case 'faculty_absent': return <User size={20} color="#ef4444" style={{ marginRight: '12px' }} />;
            case 'system_update': return <Check size={20} color="#10b981" style={{ marginRight: '12px' }} />;
            default: return <Bell size={20} color="#6b7280" style={{ marginRight: '12px' }} />;
        }
    }


    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div className="flex justify-between items-center">
                <h2 style={{ fontSize: '30px', fontWeight: '800', color: '#1f2937' }}>Notifications</h2>
                <button className="text-blue-600" style={{ fontWeight: '600', transition: 'color 0.15s', border: 'none', background: 'none', cursor: 'pointer' }}>Mark all as read</button>
            </div>
            <p className="text-gray-600" style={{ marginTop: '-16px' }}>{notifications.length} unread notifications</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {notifications.map((notif, index) => {
                    const classes = getColorClasses(notif.type);
                    return (
                        <div key={index}
                            style={{ padding: '16px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: `4px solid ${classes.border}`, backgroundColor: classes.bg, color: classes.text }}
                            className="flex justify-between items-start"
                        >
                            <div className="flex items-start">
                                {getIcon(notif.type)}
                                <div>
                                    <p style={{ fontWeight: '600', fontSize: '14px', color: classes.text }}>{notif.type.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}</p>
                                    <p style={{ fontSize: '14px', fontWeight: '500', marginTop: '4px', color: classes.text }}>{notif.message}</p>
                                </div>
                            </div>
                            <div className="flex items-center" style={{ gap: '12px', fontSize: '12px', fontWeight: '500', marginTop: '4px' }}>
                                <span>{notif.timestamp}</span>
                                <button style={{ color: '#6b7280', padding: '4px', background: 'none', border: 'none', cursor: 'pointer' }}><Trash2 size={16} /></button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default AdminNotifications;