import React from 'react';
import Check from '../../components/Check';
import '../../styles/App.css';

const FacultyReports = () => {
    const sessionHistory = [
        { session: 'Data Structures Intro', date: 'Nov 5, 2024', attendance: '42/45', status: 'Completed' },
        { session: 'Web Dev Basics', date: 'Nov 4, 2024', attendance: '38/32', status: 'Completed' },
        { session: 'Database Design', date: 'Nov 3, 2024', attendance: '36/38', status: 'Completed' },
        { session: 'Linear Algebra', date: 'Nov 2, 2024', attendance: '40/40', status: 'Completed' },
    ];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937' }}>Reports</h3>
            <p className="text-gray-600" style={{ marginTop: '-16px' }}>View session history and analytics.</p>

            <div className="card">
                <h4 className="text-xl font-semibold text-gray-900 mb-6">Session History</h4>

                <div style={{ overflowX: 'auto' }}>
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Session</th>
                                <th>Date</th>
                                <th>Attendance</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sessionHistory.map((item, index) => (
                                <tr key={index}>
                                    <td className="text-sm font-medium text-gray-900">{item.session}</td>
                                    <td className="text-sm text-gray-600">{item.date}</td>
                                    <td className="text-sm text-gray-900">{item.attendance}</td>
                                    <td className="text-sm">
                                        <span style={{ display: 'flex', alignItems: 'center', fontWeight: 600, color: '#059669' }}>
                                            <Check size={16} color="#059669" style={{ marginRight: '4px' }} /> {item.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default FacultyReports;