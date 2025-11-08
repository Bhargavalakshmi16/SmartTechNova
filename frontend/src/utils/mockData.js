// Mock database to simulate data fetching/storage
export const mockDatabase = {
    // --- Login Data (Relaxed restriction) ---
    users: [
        { id: 'admin', password: '123', name: 'System Administrator', role: 'admin', dept: 'Administration' },
        { id: 'faculty1', password: '123', name: 'Dr. Alice Chen (CS)', role: 'faculty', dept: 'CSE' },
        { id: 'student1', password: '123', name: 'Anjali Desai', role: 'student', dept: 'CSE' },
        { id: '12345', password: '123', name: 'Student Demo User', role: 'student', dept: 'ECE' },
        // Any other user ID/password will be treated as the entered identifier with the given role.
    ],

    // --- Student Data ---
    attendanceData: [
        { subject: 'Mathematics', percentage: 85, total: 40, attended: 34 },
        { subject: 'Physics', percentage: 72, total: 36, attended: 26 },
        { subject: 'Chemistry', percentage: 92, total: 40, attended: 37 },
        { subject: 'Comp. Science', percentage: 88, total: 32, attended: 28 },
        { subject: 'English', percentage: 95, total: 20, attended: 19 }
    ],

    studentTimetable: {
        'Monday': [
            { time: '09:00 AM - 10:30 AM', subject: 'Data Structures', faculty: 'Dr. Priya Sharma', room: 'A-301', status: 'Completed' },
            { time: '11:00 AM - 12:30 PM', subject: 'Web Development', faculty: 'Prof. Amit Singh', room: 'A-205', status: 'Completed' },
            { time: '01:00 PM - 02:30 PM', subject: 'Mathematics', faculty: 'Dr. Ramesh Kumar', room: 'A-102', status: 'Completed' },
            { time: '03:00 PM - 04:00 PM', subject: 'Lab Session', faculty: 'Ms. Kirti', room: 'CS Lab 2', status: 'Scheduled' },
        ],
        'Tuesday': [
            { time: '10:00 AM - 11:00 AM', subject: 'Physics', faculty: 'Prof. J. Doe', room: 'B-206', status: 'Scheduled' },
            { time: '14:00 PM - 15:00 PM', subject: 'Chemistry', faculty: 'Dr. K. Patel', room: 'C-302', status: 'Scheduled' }
        ],
        'Wednesday': [],
        'Thursday': [],
        'Friday': [],
    },

    // --- Faculty Data ---
    teachingLoad: [
        { course: 'CS101 (Intro to CS)', students: 60, lecture: 10, tutorial: 5 },
        { course: 'CS202 (Data Structures)', students: 56, lecture: 8, tutorial: 4 },
        { course: 'Elective A (Web Dev)', students: 40, lecture: 6, tutorial: 3 },
    ],

    // --- Admin Data ---
    adminUsers: [
        { name: 'Rahul Sharma', email: 'rahul.sharma@college.edu', role: 'Student', department: 'CSE' },
        { name: 'Priya Singh', email: 'priya.singh@college.edu', role: 'Faculty', department: 'CSE' },
        { name: 'Amit Patel', email: 'amit.patel@college.edu', role: 'Student', department: 'ECE' },
        { name: 'Dr. Sharma', email: 'drsharma@college.edu', role: 'Faculty', department: 'CSE' },
        { name: 'Isha Verma', email: 'isha.verma@college.edu', role: 'Student', department: 'IT' },
        { name: 'Prof. Kumar', email: 'prof.kumar@college.edu', role: 'Faculty', department: 'IT' },
    ],

    adminFacultyMock: [
        { id: 'FAC001', name: 'Dr. Sharma', dept: 'Science', qual: 'PhD in Physics' },
        { id: 'FAC002', name: 'Prof. Gupta', dept: 'Science', qual: 'M.Tech CSE' },
        { id: 'FAC003', name: 'Dr. Patel', dept: 'Commerce', qual: 'M.Com' },
    ],

    adminFacultyTimetable: [
        { day: 'Monday', time: '09:00 - 10:00', subject: 'Physics', class: 'Class 12-A', room: 'Lab-101', students: 45 },
        { day: 'Monday', time: '10:15 - 11:15', subject: 'Physics', class: 'Class 12-B', room: 'Lab-201', students: 42 },
        { day: 'Tuesday', time: '11:30 - 12:30', subject: 'Math', class: 'Class 12-A', room: 'Room-301', students: 45 },
    ],

    adminStudentClasses: [
        { name: 'Class 12-A', students: 40, dept: 'Science' },
        { name: 'Class 12-B', students: 42, dept: 'Commerce' },
    ],
};