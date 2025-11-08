import React from 'react';
import { Monitor, TrendingUp, TrendingDown, Clock, Book, Users } from 'lucide-react';
import MetricCard from '../../components/MetricCard';
import '../../styles/App.css';

const AdminClassrooms = () => {
    const classrooms = [
        { id: 'Lab A - Block 1', subject: 'Data Structures', faculty: 'Dr. Sharma', capacity: 50, occupied: 42, start: '09:00', end: '10:30', status: 'Active' },
        { id: 'Hall 201', subject: 'Web Development', faculty: 'Prof. Gupta', capacity: 100, occupied: 58, start: '09:30', end: '11:00', status: 'Active' },
        { id: 'Lab C - Block 2', subject: 'Database Design', faculty: 'Dr. Patel', capacity: 40, occupied: 35, start: '10:00', end: '11:30', status: 'Active' },
        { id: 'Hall 102', subject: 'Algorithms', faculty: 'Prof. Singh', capacity: 60, occupied: 0, start: '11:00', end: '12:30', status: 'Vacant' },
        { id: 'Lab B - Block 1', subject: 'Networking', faculty: 'Dr. Kumar', capacity: 50, occupied: 48, start: '10:30', end: '12:00', status: 'Active' },
    ];

    const activeClasses = classrooms.filter(c => c.status === 'Active').length;
    const totalCapacity = classrooms.reduce((sum, c) => sum + c.capacity, 0);
    const avgOccupancy = Math.round(classrooms.filter(c => c.status === 'Active').reduce((sum, c) => sum + (c.occupied / c.capacity) * 100, 0) / activeClasses) || 0;

    const getStatusColor = (status) => status === 'Active' ? '#10b981' : '#f59e0b';
    const getUsagePercent = (occupied, capacity) => Math.round((occupied / capacity) * 100);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <h2 style={{ fontSize: '30px', fontWeight: '800', color: '#1f2937' }}>Classroom Monitoring</h2>
            <p className="text-gray-600" style={{ marginTop: '-16px' }}>Real-time monitoring and management of all classrooms</p>

            {/* Metrics */}
            <div className="grid-4 sm-grid-2">
                <MetricCard title="Active Classrooms" value={activeClasses} unit="" icon={Book} color="blue" trend="0% decrease" />
                <MetricCard title="Total Capacity" value={totalCapacity} unit="" icon={Users} color="teal" trend="Seats available" />
                <MetricCard title="Avg Occupancy" value={avgOccupancy} unit="%" icon={Monitor} color="green" trend="3% increase" />
                <MetricCard title="Peak Hours" value="09:00 - 11:30" unit="" icon={Clock} color="purple" trend="Busiest time" />
            </div>

            {/* All Classrooms List */}
            <div className="card">
                <h3 className="text-xl font-bold text-gray-900 mb-6">All Classrooms</h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {classrooms.map((room, index) => {
                        const usage = getUsagePercent(room.occupied, room.capacity);
                        return (
                            <div key={index} className="card" style={{ padding: '16px', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                                <div className="flex justify-between items-start mb-2">
                                    <h4 style={{ fontSize: '18px', fontWeight: 'bold', color: '#2563eb' }}>{room.id}</h4>
                                    <span style={{ fontSize: '14px', fontWeight: 600, color: getStatusColor(room.status) }}>{room.status}</span>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '16px', alignItems: 'center', paddingTop: '8px' }}>
                                    <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                        <p className="text-sm text-gray-900 font-medium">{room.subject}</p>
                                        <p className="text-xs text-gray-600">Faculty: {room.faculty}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900">Occupancy: {room.occupied}/{room.capacity}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900">Usage: {usage}%</p>
                                        <div className="progress-bar-container" style={{ height: '6px', marginTop: '4px' }}>
                                            <div className="progress-bar" style={{ backgroundColor: '#2563eb', width: `${usage}%` }}></div>
                                        </div>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <p className="text-sm font-semibold text-gray-900">Start Time</p>
                                        <p className="text-xs text-gray-600">{room.start}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default AdminClassrooms;