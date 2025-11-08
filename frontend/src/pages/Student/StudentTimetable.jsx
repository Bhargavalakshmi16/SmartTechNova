import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Monitor } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import '../../styles/App.css';

const StudentTimetable = ({ handleAttendanceClick }) => {
    const { user } = useAuth();
    const [day, setDay] = useState('Monday');
    const [timetable, setTimetable] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Hardcoded API Base URL
    const API_BASE_URL = 'http://localhost:5000';

    useEffect(() => {
        const fetchTimetable = async () => {
            // CRITICAL CHECK: Wait until the user and JWT token are loaded after login
            if (!user || !user.token || !user.id) {
                // If we are waiting for the token (e.g., initial load after refresh), don't show error yet.
                if (localStorage.getItem('user')) {
                    setIsLoading(true);
                } else {
                    setIsLoading(false);
                }
                return;
            }

            setIsLoading(true);
            setError(null);

            try {
                const response = await axios.get(`${API_BASE_URL}/api/timetable/${user.id}?role=${user.role}`, {
                    headers: {
                        // Send the token in the Authorization header for JWT Middleware verification
                        Authorization: `Bearer ${user.token}`,
                    },
                });

                // The backend returns an object structured by day (e.g., { "Monday": [...], "Tuesday": [...] })
                setTimetable(response.data);

                // Set the default displayed day to the first day that has classes
                if (Object.keys(response.data).length > 0) {
                    const firstDayWithClasses = Object.keys(response.data).find(d => response.data[d].length > 0);
                    if (firstDayWithClasses && day !== firstDayWithClasses) {
                        setDay(firstDayWithClasses);
                    }
                }

            } catch (err) {
                console.error("Error fetching live timetable:", err);
                setError(`Failed to load timetable: ${err.response?.data?.message || err.message}`);
                setTimetable({});
            } finally {
                setIsLoading(false);
            }
        };

        fetchTimetable();
    }, [user]); // Depend only on user object, as the content of user changes after login

    const currentDayTimetable = timetable[day] || [];
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

    if (isLoading) {
        return <div className="card text-center p-6" style={{ color: '#6b7280' }}>Loading timetable data from server...</div>;
    }

    if (error) {
        return <div className="card text-center p-6" style={{ backgroundColor: '#fee2e2', color: '#b91c1c' }}>Error: {error}</div>;
    }

    return (
        <div className="card">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <Calendar size={20} style={{ marginRight: '8px', color: '#2563eb' }} /> Weekly Timetable
            </h3>

            {/* Day Selector Tabs */}
            <div className="flex" style={{ gap: '16px', marginBottom: '24px', borderBottom: '1px solid #e5e7eb', overflowX: 'auto' }}>
                {days.map(d => (
                    <button
                        key={d}
                        onClick={() => setDay(d)}
                        style={{ padding: '0 16px 12px', fontWeight: 600, transition: 'color 0.15s, border-color 0.15s', border: 'none', background: 'none', cursor: 'pointer', whiteSpace: 'nowrap', position: 'relative' }}
                        className={day === d ? 'text-blue-600' : 'text-gray-600'}
                    >
                        {d}
                        {day === d && <div style={{ height: '3px', backgroundColor: '#2563eb', position: 'absolute', bottom: 0, left: 0, right: 0 }}></div>}
                    </button>
                ))}
            </div>

            {/* Class Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {currentDayTimetable.length > 0 ? (
                    currentDayTimetable.map((item, index) => (
                        <div key={index} className="card" style={{ padding: '20px', backgroundColor: '#f9fafb', border: '1px solid #e5e7eb' }}>
                            <div className="flex justify-between items-start mb-2">
                                <h4 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1f2937' }}>{item.subject}</h4>
                                <span
                                    className="table-status"
                                    style={{
                                        backgroundColor: item.status === 'Completed' ? '#d1fae5' : '#fef3c7',
                                        color: item.status === 'Completed' ? '#047857' : '#b45309'
                                    }}
                                >
                                    {item.status}
                                </span>
                            </div>
                            <p className="text-sm text-gray-700 font-medium">Faculty: {item.faculty}</p>

                            <div style={{ display: 'flex', alignItems: 'center', fontSize: '14px', color: '#4b5563', marginTop: '8px', gap: '16px' }}>
                                <span style={{ display: 'flex', alignItems: 'center' }}>
                                    <Clock size={14} style={{ marginRight: '8px', color: '#2563eb' }} />
                                    {item.time}
                                </span>
                                <span style={{ display: 'flex', alignItems: 'center' }}>
                                    <Monitor size={14} style={{ marginRight: '8px', color: '#8b5cf6' }} />
                                    {item.room}
                                </span>
                            </div>

                            {item.status !== 'Completed' && (
                                <button
                                    onClick={() => handleAttendanceClick()}
                                    className="button-primary" style={{ marginTop: '16px', padding: '8px 16px', fontSize: '14px' }}
                                >
                                    Mark Attendance
                                </button>
                            )}
                        </div>
                    ))
                ) : (
                    <div className="card text-center" style={{ padding: '48px', border: '2px dashed #e5e7eb', color: '#6b7280' }}>
                        <Calendar size={32} style={{ margin: '0 auto 12px', color: '#9ca3af' }} />
                        <p style={{ fontWeight: 600 }}>No classes scheduled for {day}.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StudentTimetable;