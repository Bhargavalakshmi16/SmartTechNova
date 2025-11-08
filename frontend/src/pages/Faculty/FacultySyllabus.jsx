import React from 'react';
import { BookOpen, AlertCircle } from 'lucide-react';
import '../../styles/App.css';

const FacultySyllabus = ({ teachingLoad }) => {
    const syllabusData = [
        { course: 'CS101', progress: 70, target: 80, alert: true, details: 'Lagging behind schedule, Final exam in 3 weeks.' },
        { course: 'CS202', progress: 85, target: 80, alert: false, details: 'Ahead of schedule, good progress.' },
        { course: 'Elective A', progress: 45, target: 50, alert: false, details: 'On track.' },
    ];

    return (
        <div className="card">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <BookOpen size={20} style={{ marginRight: '8px', color: '#10b981' }} /> Syllabus Completion Tracker
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {syllabusData.map((item, index) => (
                    <div key={index}
                        style={{ padding: '16px', borderRadius: '12px', borderLeft: `4px solid ${item.alert ? '#ef4444' : '#10b981'}`, backgroundColor: item.alert ? '#fee2e2' : '#d1fae5' }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                            <h4 style={{ fontWeight: 'bold', fontSize: '18px', color: '#1f2937' }}>{item.course}</h4>
                            <span
                                className="table-status"
                                style={{
                                    backgroundColor: item.alert ? '#fca5a5' : '#a7f3d0',
                                    color: item.alert ? '#7f1d1d' : '#065f46'
                                }}
                            >
                                {item.progress}% Completed
                            </span>
                        </div>
                        <div className="progress-bar-container" style={{ marginBottom: '8px' }}>
                            <div
                                className="progress-bar"
                                style={{
                                    backgroundColor: item.alert ? '#ef4444' : '#10b981',
                                    width: `${item.progress}%`
                                }}
                            ></div>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">{item.details}</p>
                        {item.alert && (
                            <button
                                style={{ marginTop: '8px', fontSize: '14px', fontWeight: '500', color: '#dc2626', display: 'flex', alignItems: 'center', border: 'none', background: 'none', cursor: 'pointer' }}
                            >
                                <AlertCircle size={14} style={{ marginRight: '4px' }} /> Send Reminder to HOD
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FacultySyllabus;