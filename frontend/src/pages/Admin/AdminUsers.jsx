import React from 'react';
import { Search, Plus, Edit, Trash2 } from 'lucide-react';
import '../../styles/App.css';

const AdminUsers = ({ mockUsers }) => {
    const getRoleColorClass = (role) => {
        if (role === 'Faculty') return 'status-faculty';
        if (role === 'Student') return 'status-student';
        return 'table-status'; // default gray
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div className="flex justify-between items-center">
                <h2 style={{ fontSize: '30px', fontWeight: '800', color: '#1f2937' }}>User Management</h2>
                <button className="button-primary flex items-center" style={{ padding: '8px 16px', fontSize: '14px' }}>
                    <Plus size={18} style={{ marginRight: '8px' }} /> Add User
                </button>
            </div>
            <p className="text-gray-600" style={{ marginTop: '-16px' }}>Manage students, faculty, and admin accounts</p>

            {/* Search and Filter */}
            <div className="card flex" style={{ gap: '16px', flexWrap: 'wrap', alignItems: 'center', padding: '16px' }}>
                <div style={{ position: 'relative', flexGrow: 1 }}>
                    <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                    <input
                        type="text"
                        placeholder="Search users..."
                        className="login-input" style={{ width: '100%', paddingLeft: '40px', paddingRight: '16px', padding: '8px 16px', borderRadius: '8px' }}
                    />
                </div>
                <select className="login-input" style={{ width: 'auto', padding: '8px 12px', borderRadius: '8px', fontSize: '14px' }}>
                    <option>All Roles</option>
                    <option>Faculty</option>
                    <option>Student</option>
                    <option>Admin</option>
                </select>
            </div>

            {/* User Table */}
            <div className="card" style={{ overflowX: 'auto', padding: 0 }}>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Department</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mockUsers.map((user, index) => (
                            <tr key={index}>
                                <td className="text-sm font-medium text-gray-900">{user.name}</td>
                                <td className="text-sm text-gray-600">{user.email}</td>
                                <td className="text-sm">
                                    <span className={getRoleColorClass(user.role)}>
                                        {user.role}
                                    </span>
                                </td>
                                <td className="text-sm text-gray-600">{user.department}</td>
                                <td className="text-sm" style={{ fontWeight: 600 }}>
                                    <button style={{ color: '#2563eb', padding: '4px', background: 'none', border: 'none', cursor: 'pointer' }} title="Edit"><Edit size={18} /></button>
                                    <button style={{ color: '#dc2626', padding: '4px', background: 'none', border: 'none', cursor: 'pointer', marginLeft: '8px' }} title="Delete"><Trash2 size={18} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center text-sm text-gray-600" style={{ padding: '0 24px' }}>
                <p>Showing 6 of 6 users</p>
                <div className="flex" style={{ gap: '8px' }}>
                    <button className="button-primary" style={{ background: '#f3f4f6', color: '#4b5563', padding: '4px 12px', fontSize: '14px' }}>Previous</button>
                    <span className="button-primary" style={{ padding: '4px 12px', fontSize: '14px' }}>1</span>
                    <button className="button-primary" style={{ background: '#f3f4f6', color: '#4b5563', padding: '4px 12px', fontSize: '14px' }}>Next</button>
                </div>
            </div>
        </div>
    );
};

export default AdminUsers;