import React from 'react';
import '../styles/App.css';

const MetricCard = ({ title, value, unit, icon: Icon, color, trend }) => {

    let trendClass = '';
    let trendIcon = null;
    if (trend) {
        if (trend.includes('increase') || trend.includes('up')) {
            trendClass = 'text-green-600';
            trendIcon = <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '4px' }}><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>;
        } else if (trend.includes('decrease') || trend.includes('down')) {
            trendClass = 'text-red-600';
            trendIcon = <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '4px' }}><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline><polyline points="17 18 23 18 23 12"></polyline></svg>;
        }
    }

    return (
        <div className={`card card-l-border ${color}`} style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', minHeight: '100px' }}>
            <div>
                <p className="text-sm text-gray-600 font-medium">{title}</p>
                <p className="text-4xl font-extrabold text-gray-900" style={{ marginTop: '4px' }}>{value} {unit}</p>
                {trend && (
                    <p className={`text-xs flex items-center ${trendClass}`} style={{ marginTop: '4px' }}>
                        {trendIcon} {trend}
                    </p>
                )}
            </div>
            {Icon && <Icon size={32} color={`var(--${color}-color, #4b5563)`} style={{ opacity: 0.7 }} />}
        </div>
    );
};

export default MetricCard;