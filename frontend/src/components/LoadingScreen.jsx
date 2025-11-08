
import React from 'react';
import '../styles/App.css';

const LoadingScreen = () => (
    <div className="login-page" style={{ background: '#f9fafb' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '32px', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)' }}>
            <div
                style={{
                    width: '24px', height: '24px', border: '4px solid #3b82f6',
                    borderTopColor: 'transparent', borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                }}
            ></div>
            <p style={{ fontSize: '20px', fontWeight: '600', color: '#4b5563' }}>Loading Portal...</p>
        </div>
        <style>
            {`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}
        </style>
    </div>
);

export default LoadingScreen;