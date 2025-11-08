import React, { useState } from 'react';
import '../../styles/App.css';

const FacultyTimetableContent = ({ mockData }) => {
    const facultyMock = mockData.adminFacultyMock;
    const timetable = mockData.adminFacultyTimetable;
    const [selectedFaculty, setSelectedFaculty] = useState(facultyMock[0]);

    const groupedTimetable = timetable.reduce((acc, curr) => {
        (acc[curr.day] = acc[curr.day] || []).push(curr);
        return acc;
    }, {});

    const totalClasses = 6;
    const uniqueSubjects = 3;
    const totalStudents = 270;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <h2 style={{ fontSize: '30px', fontWeight: '800', color: '#1f2937' }}>Faculty Timetable</h2>
            <p className="text-gray-600" style={{ marginTop: '-16px' }}>Select a faculty member to view their schedule</p>

            {/* Faculty Selection Cards */}
            <div className="grid-5 sm-grid-3 xl-grid-5" style={{ gap: '16px' }}>
                {facultyMock.map(f => (
                    <button
                        key={f.id}
                        onClick={() => setSelectedFaculty(f)}
                        style={{ padding: '16px', borderRadius: '12px', border: `2px solid ${selectedFaculty.id === f.id ? '#2563eb' : '#e5e7eb'}`, backgroundColor: selectedFaculty.id === f.id ? '#eff6ff' : 'white', textAlign: 'left', transition: 'background-color 0.15s, border-color 0.15s' }}
                    >
                        <p style={{ fontWeight: '600', color: '#1f2937' }}>{f.name}</p>
                        <p className="text-xs text-gray-600">{f.dept}</p>
                    </button>
                ))}
            </div>

            {/* Selected Faculty Details */}
            <div style={{ backgroundColor: '#2563eb', color: 'white', padding: '16px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                <div className="flex justify-between items-center mb-2">
                    <p className="text-xl font-bold">{selectedFaculty.name}</p>
                    <p className="text-sm font-medium">Qualification: {selectedFaculty.qual}</p>
                </div>
                <p className="text-sm">Faculty ID: {selectedFaculty.id} | Department: {selectedFaculty.dept}</p>
            </div>

            {/* Faculty Metrics */}
            <div className="grid-3 sm-grid-3 text-center">
                <div className="card p-4">
                    <p className="text-3xl font-bold text-blue-600">{totalClasses}</p>
                    <p className="text-sm text-gray-600">Classes per Week</p>
                </div>
                <div className="card p-4">
                    <p className="text-3xl font-bold text-blue-600">{uniqueSubjects}</p>
                    <p className="text-sm text-gray-600">Unique Classes</p>
                </div>
                <div className="card p-4">
                    <p className="text-3xl font-bold text-blue-600">{totalStudents}</p>
                    <p className="text-sm text-gray-600">Total Students</p>
                </div>
            </div>

            {/* Timetable Table */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {Object.keys(groupedTimetable).map(day => (
                    <div key={day}>
                        <h4 style={{ backgroundColor: '#2563eb', color: 'white', fontSize: '18px', fontWeight: 'bold', padding: '12px', borderTopLeftRadius: '12px', borderTopRightRadius: '12px', marginTop: '24px' }}>{day}</h4>
                        <div className="card" style={{ padding: 0, borderTopLeftRadius: 0, borderTopRightRadius: 0 }}>
                            <div style={{ overflowX: 'auto' }}>
                                <table className="data-table">
                                    <thead>
                                        <tr>
                                            <th>Time</th>
                                            <th>Subject</th>
                                            <th>Class</th>
                                            <th>Room/Lab</th>
                                            <th>Students</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {groupedTimetable[day].map((item, index) => (
                                            <tr key={index}>
                                                <td className="text-sm font-medium text-gray-900">{item.time}</td>
                                                <td className="text-sm text-gray-600">{item.subject}</td>
                                                <td className="text-sm text-blue-600 font-semibold">{item.class}</td>
                                                <td className="text-sm text-gray-600">{item.room}</td>
                                                <td className="text-sm text-blue-600 font-semibold">{item.students} students</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const StudentTimetableContent = ({ mockData }) => {
    const classOptions = mockData.adminStudentClasses;
    const mockTimetable = [
        { day: 'Monday', time: '09:00 - 10:00', subject: 'Physics', faculty: 'Dr. Sharma', room: 'Lab-101' },
        { day: 'Monday', time: '10:15 - 11:15', subject: 'Chemistry', faculty: 'Mrs. Patel', room: 'Lab-102' },
        { day: 'Monday', time: '11:30 - 12:30', subject: 'Math', faculty: 'Prof. Reddy', room: 'Room-301' },
        { day: 'Monday', time: '14:00 - 15:00', subject: 'English', faculty: 'Ms. Verma', room: 'Room-401' },
    ];

    const [selectedClass, setSelectedClass] = useState(classOptions[0]);

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const mockTimetableData = days.map(day => ({
        day,
        classes: mockTimetable.filter(c => c.day === day)
    }));

    const totalClasses = 23;
    const uniqueSubjects = 13;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <h2 style={{ fontSize: '30px', fontWeight: '800', color: '#1f2937' }}>Class Timetable</h2>
            <p className="text-gray-600" style={{ marginTop: '-16px' }}>View your class schedule</p>

            {/* Class Selection Cards */}
            <div className="grid-4 sm-grid-2">
                {classOptions.map(cls => (
                    <button
                        key={cls.name}
                        onClick={() => setSelectedClass(cls)}
                        style={{ padding: '16px', borderRadius: '12px', border: `2px solid ${selectedClass.name === cls.name ? '#2563eb' : '#e5e7eb'}`, backgroundColor: selectedClass.name === cls.name ? '#eff6ff' : 'white', textAlign: 'center', transition: 'background-color 0.15s, border-color 0.15s' }}
                    >
                        <p style={{ fontWeight: '600', color: '#1f2937' }}>{cls.name}</p>
                        <p className="text-xs text-gray-600">{cls.students} Students</p>
                    </button>
                ))}
            </div>

            {/* Class Details Bar */}
            <div style={{ backgroundColor: '#2563eb', color: 'white', padding: '16px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
                <p className="text-lg font-bold">Class: {selectedClass.name}</p>
                <p className="text-lg font-bold">Department: {selectedClass.dept}</p>
                <p className="text-lg font-bold">Total Students: {selectedClass.students}</p>
            </div>

            {/* Class Metrics */}
            <div className="grid-2 sm-grid-2 text-center">
                <div className="card p-4">
                    <p className="text-4xl font-bold text-blue-600">{totalClasses}</p>
                    <p className="text-sm text-gray-600">Classes per Week</p>
                </div>
                <div className="card p-4">
                    <p className="text-4xl font-bold text-blue-600">{uniqueSubjects}</p>
                    <p className="text-sm text-gray-600">Different Subjects</p>
                </div>
            </div>

            {/* Timetable Table (Grouped by Day) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {mockTimetableData.map(({ day, classes }) => (
                    <div key={day}>
                        <h4 style={{ backgroundColor: '#2563eb', color: 'white', fontSize: '18px', fontWeight: 'bold', padding: '12px', borderTopLeftRadius: '12px', borderTopRightRadius: '12px', marginTop: '24px' }}>{day}</h4>
                        <div className="card" style={{ padding: 0, borderTopLeftRadius: 0, borderTopRightRadius: 0 }}>
                            <div style={{ overflowX: 'auto' }}>
                                <table className="data-table">
                                    <thead>
                                        <tr>
                                            <th>Time</th>
                                            <th>Subject</th>
                                            <th>Faculty</th>
                                            <th>Room/Lab</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {classes.length > 0 ? classes.map((item, index) => (
                                            <tr key={index}>
                                                <td className="text-sm font-medium text-gray-900">{item.time}</td>
                                                <td className="text-sm text-gray-600">{item.subject}</td>
                                                <td className="text-sm text-gray-600">{item.faculty}</td>
                                                <td className="text-sm text-gray-600">{item.room}</td>
                                            </tr>
                                        )) : (
                                            <tr><td colSpan="4" style={{ textAlign: 'center', padding: '16px', color: '#6b7280' }}>No classes scheduled.</td></tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};


const AdminTimetables = ({ type, mockData }) => {
    return type === 'faculty' ? <FacultyTimetableContent mockData={mockData} /> : <StudentTimetableContent mockData={mockData} />;
};

export default AdminTimetables;