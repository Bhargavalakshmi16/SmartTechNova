import React, { useState } from 'react';
import { Bell, User, LogOut, Clock, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import '../styles/App.css';

const NotificationBell = ({ notifications }) => {
    const [show, setShow] = useState(false);
    const unreadCount = notifications.length;

    return (
        <div style={{ position: 'relative' }}>
            <button
                onClick={() => setShow(!show)}
                style={{ position: 'relative', padding: '8px', color: '#4b5563', transition: 'color 0.15s, background-color 0.15s', borderRadius: '50%' }}
                aria-label={`You have ${unreadCount} notifications`}
            >
                <Bell size={24} />
                {unreadCount > 0 && (
                    <span
                        style={{
                            position: 'absolute', top: '0', right: '0', backgroundColor: '#ef4444', color: 'white',
                            fontSize: '10px', fontWeight: 'bold', borderRadius: '50%', width: '20px', height: '20px',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid white',
                            transform: 'translate(4px, -4px)'
                        }}
                    >
                        {unreadCount}
                    </span>
                )}
            </button>
            {show && (
                <div
                    style={{
                        position: 'absolute', right: '0', marginTop: '12px', width: '320px', backgroundColor: 'white',
                        borderRadius: '12px', boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)', zIndex: 50, maxHeight: '384px',
                        overflowY: 'auto'
                    }}
                >
                    <div style={{ padding: '16px', borderBottom: '1px solid #e5e7eb' }}>
                        <h3 style={{ fontWeight: '600', fontSize: '18px', color: '#1f2937' }}>Notifications</h3>
                    </div>
                    {notifications.length === 0 ? (
                        <div style={{ padding: '16px', textAlign: 'center', color: '#6b7280' }}>No new notifications</div>
                    ) : (
                        notifications.map((notif, idx) => (
                            <div key={idx} style={{ padding: '16px', borderBottom: '1px solid #f3f4f6', cursor: 'pointer', transition: 'background-color 0.15s' }}>
                                <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                                    <AlertCircle color="#3b82f6" style={{ marginRight: '12px', marginTop: '4px', flexShrink: 0 }} size={20} />
                                    <div>
                                        <p style={{ fontSize: '14px', color: '#1f2937', fontWeight: '500' }}>{notif.message}</p>
                                        <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px', display: 'flex', alignItems: 'center' }}>
                                            <Clock size={12} style={{ marginRight: '4px' }} />{notif.timestamp}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

const Header = ({ notifications }) => {
    const { user, logout } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="header">
            <div className="header-inner">
                <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <NotificationBell notifications={notifications} />
                        <div style={{ position: 'relative' }}>
                            <button
                                onClick={() => setMenuOpen(!menuOpen)}
                                style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px', borderRadius: '12px', backgroundColor: '#f9fafb', border: '1px solid #e5e7eb', cursor: 'pointer' }}
                            >
                                <User size={20} color="#2563eb" />
                                <span style={{ fontSize: '14px', fontWeight: '600', color: '#4b5563' }}>{user?.name.split(' ')[0]}</span>
                            </button>
                            {menuOpen && (
                                <div
                                    style={{
                                        position: 'absolute', right: '0', marginTop: '12px', width: '224px', backgroundColor: 'white',
                                        borderRadius: '12px', boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)', zIndex: 50
                                    }}
                                >
                                    <div style={{ padding: '16px', borderBottom: '1px solid #f3f4f6' }}>
                                        <p style={{ fontSize: '14px', fontWeight: 'bold', color: '#1f2937' }}>{user?.name}</p>
                                        <p style={{ fontSize: '12px', color: '#2563eb', fontWeight: '500', marginTop: '4px', textTransform: 'uppercase' }}>{user?.role}</p>
                                        <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>ID: {user?.id}</p>
                                    </div>
                                    <button
                                        onClick={logout}
                                        style={{ width: '100%', display: 'flex', alignItems: 'center', padding: '12px 16px', fontSize: '14px', color: '#dc2626', transition: 'background-color 0.15s', border: 'none', background: 'none', cursor: 'pointer', borderBottomLeftRadius: '12px', borderBottomRightRadius: '12px' }}
                                    >
                                        <LogOut size={16} style={{ marginRight: '12px' }} />
                                        **Sign Out**
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;