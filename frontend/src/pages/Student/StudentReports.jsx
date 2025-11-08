import React, { useState } from 'react';
import { LineChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line } from 'recharts';
import { FileText, Download, TrendingUp } from 'lucide-react';
import MetricCard from '../../components/MetricCard';
import '../../styles/App.css';

const StudentReports = () => {
    const trendData = [
        { name: 'Nov 1', percentage: 88 },
        { name: 'Nov 8', percentage: 89 },
        { name: 'Nov 15', percentage: 90 },
        { name: 'Nov 22', percentage: 91 },
        { name: 'Nov 29', percentage: 90 },
    ];

    const [reportTab, setReportTab] = useState('attendance');

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div className="flex justify-between items-center" style={{ flexWrap: 'wrap' }}>
                <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                    <FileText size={24} style={{ marginRight: '8px', color: '#2563eb' }} /> Academic Reports
                </h3>
                <button
                    className="button-primary" style={{ marginTop: '8px', padding: '8px 16px', fontSize: '14px', display: 'flex', alignItems: 'center' }}
                >
                    <Download size={16} style={{ marginRight: '8px' }} /> Export PDF/Excel
                </button>
            </div>

            <p className="text-gray-600" style={{ marginTop: '-16px' }}>View detailed analytics and performance metrics.</p>

            {/* Filter Bar */}
            <div className="card flex" style={{ gap: '16px', flexWrap: 'wrap', alignItems: 'center', padding: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <label className="text-sm font-medium text-gray-700">Date Range</label>
                    <select className="login-input" style={{ width: 'auto', padding: '8px 12px', borderRadius: '8px', fontSize: '14px' }}>
                        <option>This Month</option>
                        <option>Current Semester</option>
                    </select>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <label className="text-sm font-medium text-gray-700">Course</label>
                    <select className="login-input" style={{ width: 'auto', padding: '8px 12px', borderRadius: '8px', fontSize: '14px' }}>
                        <option>All Courses</option>
                        <option>Database Systems</option>
                    </select>
                </div>
            </div>

            {/* Sub Tabs */}
            <div style={{ borderBottom: '1px solid #e5e7eb' }}>
                <div style={{ display: 'flex', gap: '16px' }}>
                    {['attendance', 'performance', 'activity', 'summary'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setReportTab(tab)}
                            style={{ padding: '0 12px 8px', fontWeight: 600, transition: 'color 0.15s', border: 'none', background: 'none', cursor: 'pointer', whiteSpace: 'nowrap', position: 'relative' }}
                            className={reportTab === tab ? 'text-blue-600' : 'text-gray-600'}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            {reportTab === tab && <div style={{ height: '2px', backgroundColor: '#2563eb', position: 'absolute', bottom: 0, left: 0, right: 0 }}></div>}
                        </button>
                    ))}
                </div>
            </div>

            {/* Report Content */}
            {reportTab === 'attendance' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    {/* Key Metrics */}
                    <div className="grid-3 sm-grid-2">
                        <MetricCard
                            title="Overall Attendance"
                            value="90" unit="%"
                            color="blue"
                            trend="1% up from last month"
                            icon={TrendingUp}
                        />
                        <MetricCard
                            title="Classes Attended"
                            value="74" unit=""
                            color="yellow"
                            trend="Out of 82 classes"
                            icon={FileText}
                        />
                        <MetricCard
                            title="Best Attendance"
                            value="Database Systems" unit=""
                            color="purple"
                            trend="95% attendance"
                            icon={FileText}
                        />
                    </div>

                    {/* Attendance Trend Chart */}
                    <div className="card">
                        <h4 className="text-xl font-semibold text-gray-900 mb-6">Attendance Trend</h4>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={trendData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis domain={[0, 100]} label={{ value: 'Attendance %', angle: -90, position: 'insideLeft' }} />
                                <Tooltip />
                                <Line type="monotone" dataKey="percentage" stroke="#2563eb" strokeWidth={3} name="Attendance %" dot={{ r: 5 }} activeDot={{ r: 8 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            )}
            {/* Placeholder for other tabs */}
            {reportTab !== 'attendance' && (
                <div className="card text-center p-6" style={{ color: '#6b7280' }}>
                    {reportTab.charAt(0).toUpperCase() + reportTab.slice(1)} reports coming soon!
                </div>
            )}
        </div>
    );
};

export default StudentReports;