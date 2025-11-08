import React from 'react';
import { Download } from 'lucide-react';
import '../../styles/App.css';

const AdminAnalytics = () => {
    const attendanceTrends = [
        { day: 'Mon', percentage: 92 },
        { day: 'Tue', percentage: 95 },
        { day: 'Wed', percentage: 98 },
        { day: 'Thu', percentage: 90 },
        { day: 'Fri', percentage: 87 }
    ];

    const syllabusData = [
        { subject: 'Data Structures', completion: 65, color: '#3B82F6' },
        { subject: 'Web Development', completion: 78, color: '#10B981' },
        { subject: 'Database Design', completion: 60, color: '#F59E0B' },
        { subject: 'Algorithms', completion: 85, color: '#8B5CF6' },
        { subject: 'Networking', completion: 72, color: '#EF4444' },
    ];

    const punctualityData = [
        { week: 'Week 1', onTime: 95, late: 5 },
        { week: 'Week 2', onTime: 92, late: 8 },
        { week: 'Week 3', onTime: 98, late: 2 },
        { week: 'Week 4', onTime: 94, late: 6 },
    ];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div className="flex justify-between items-center">
                <h2 style={{ fontSize: '30px', fontWeight: '800', color: '#1f2937' }}>Analytics & Reports</h2>
                <button className="button-primary flex items-center" style={{ padding: '8px 16px', fontSize: '14px' }}>
                    <Download size={18} style={{ marginRight: '8px' }} /> Export Report
                </button>
            </div>
            <p className="text-gray-600" style={{ marginTop: '-16px' }}>Detailed insights into classroom and attendance metrics</p>

            {/* Filter */}
            <div className="card" style={{ padding: '16px', display: 'inline-flex' }}>
                <select className="login-input" style={{ width: 'auto', padding: '8px 12px', borderRadius: '8px', fontSize: '14px' }}>
                    <option>Last 7 Days</option>
                    <option>Last 30 Days</option>
                    <option>This Semester</option>
                </select>
            </div>

            {/* Attendance & Syllabus */}
            <div className="grid-2 sm-grid-2 lg-grid-2" style={{ gap: '24px' }}>
                {/* Weekly Attendance Trends */}
                <div className="card">
                    <h3 className="text-xl font-semibold text-gray-900 mb-6">Weekly Attendance Trends (%)</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {attendanceTrends.map(item => (
                            <div key={item.day} style={{ display: 'flex', alignItems: 'center' }}>
                                <span style={{ width: '64px', fontWeight: '600', color: '#4b5563' }}>{item.day}</span>
                                <div className="progress-bar-container" style={{ flexGrow: 1, height: '12px' }}>
                                    <div className="progress-bar" style={{ backgroundColor: '#10b981', width: `${item.percentage}%` }}></div>
                                </div>
                                <span style={{ width: '48px', textAlign: 'right', fontWeight: 'bold', color: '#059669' }}>{item.percentage}%</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Syllabus Completion Status */}
                <div className="card">
                    <h3 className="text-xl font-semibold text-gray-900 mb-6">Syllabus Completion Status (%)</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {syllabusData.map(item => (
                            <div key={item.subject} style={{ display: 'flex', alignItems: 'center' }}>
                                <span style={{ width: '128px', fontSize: '14px', fontWeight: '600', color: '#4b5563', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={item.subject}>{item.subject}</span>
                                <div className="progress-bar-container" style={{ flexGrow: 1, height: '12px' }}>
                                    <div className="progress-bar" style={{ width: `${item.completion}%`, backgroundColor: item.color }}></div>
                                </div>
                                <span style={{ width: '40px', textAlign: 'right', fontSize: '14px', fontWeight: 'bold', color: '#1f2937' }}>{item.completion}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Faculty Punctuality */}
            <div className="card">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Faculty Punctuality Report (Weekly)</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {punctualityData.map(item => (
                        <div key={item.week} style={{ display: 'flex', alignItems: 'center' }}>
                            <span style={{ width: '64px', fontWeight: '600', color: '#4b5563' }}>{item.week}</span>
                            <div className="progress-bar-container" style={{ flexGrow: 1, height: '12px', position: 'relative', backgroundColor: '#ef4444' }}>
                                <div style={{ height: '100%', borderRadius: '9999px', backgroundColor: '#10b981', width: `${item.onTime}%` }}></div>
                            </div>
                            <div style={{ width: '160px', marginLeft: '16px', display: 'flex', justifyContent: 'flex-end', fontSize: '12px', fontWeight: '600' }}>
                                <span style={{ color: '#059669', marginRight: '8px' }}>On Time: {item.onTime}%</span>
                                <span style={{ color: '#dc2626' }}>Late: {item.late}%</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminAnalytics;