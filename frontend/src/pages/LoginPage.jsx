import React, { useState } from 'react';
import { BookOpen } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import '../styles/App.css';

const LoginPage = () => {
    const { login } = useAuth();
    const [formData, setFormData] = useState({
        identifier: '',
        password: '',
        role: 'student'
    });
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        const success = login(formData.identifier, formData.password, formData.role);

        if (!success) {
            setError('Login failed. Please check your credentials.');
        }
    };

    return (
        <div className="login-page">
            <div className="login-card">
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <BookOpen style={{ margin: '0 auto 16px', color: '#2563eb' }} size={64} />
                    <h1 style={{ fontSize: '36px', fontWeight: '800', color: '#1f2937' }}>SCFMP Login</h1>
                    <p style={{ color: '#6b7280', marginTop: '8px' }}>Smart Classroom & Faculty Monitoring Portal</p>
                </div>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <div>
                        <label className="text-sm font-semibold text-gray-700" style={{ display: 'block', marginBottom: '8px' }}>Login As</label>
                        <select
                            value={formData.role}
                            onChange={(e) => { setFormData({ ...formData, role: e.target.value, identifier: '' }); setError(''); }}
                            className="login-input"
                        >
                            <option value="student">Student</option>
                            <option value="faculty">Faculty</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-sm font-semibold text-gray-700" style={{ display: 'block', marginBottom: '8px' }}>
                            {formData.role === 'student' ? 'Registration Number' : 'ID'}
                        </label>
                        <input
                            type="text"
                            value={formData.identifier}
                            onChange={(e) => setFormData({ ...formData, identifier: e.target.value })}
                            className="login-input"
                            placeholder={`Enter ${formData.role === 'student' ? 'Registration Number' : 'ID'}`}
                            required
                        />
                    </div>
                    <div>
                        <label className="text-sm font-semibold text-gray-700" style={{ display: 'block', marginBottom: '8px' }}>Password</label>
                        <input
                            type="password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            className="login-input"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    {error && (
                        <div style={{ padding: '12px', backgroundColor: '#fee2e2', border: '1px solid #f87171', color: '#b91c1c', borderRadius: '12px', fontSize: '14px', fontWeight: '500' }}>
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="login-button"
                    >
                        Sign In
                    </button>
                </form>
                <div style={{ marginTop: '32px', textAlign: 'center', fontSize: '14px', color: '#6b7280', borderTop: '1px solid #e5e7eb', paddingTop: '24px' }}>
                    <p style={{ fontWeight: '600', color: '#4b5563', marginBottom: '8px' }}>Demo Credentials (Use Pass: 123 for specific users):</p>
                    <p>Admin: (ID: admin) | Faculty: (ID: faculty1) | Student: (ID: 12345)</p>
                    <p>Note: Any ID/Password combo (e.g., ID: userX, Pass: abc) will also work for demo.</p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;