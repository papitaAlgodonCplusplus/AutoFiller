import React from 'react';

const Reports = () => {
  return (
    <div style={{ padding: '2rem', backgroundColor: '#f9fafb', borderRadius: '0.5rem', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#1f2937' }}>Reports</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
        
        {/* Compliance Statistics Section */}
        <div style={{ backgroundColor: '#ffffff', padding: '1rem', borderRadius: '0.5rem', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>Compliance Statistics</h3>
          {/* Placeholder for Compliance Statistics chart */}
          <div style={{
            height: '200px',
            backgroundColor: '#f3f4f6',
            borderRadius: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#9ca3af',
            fontWeight: '500'
          }}>
            Chart goes here
          </div>
        </div>

        {/* Letter Analytics Section */}
        <div style={{ backgroundColor: '#ffffff', padding: '1rem', borderRadius: '0.5rem', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>Letter Analytics</h3>
          {/* Placeholder for Letter Analytics chart */}
          <div style={{
            height: '200px',
            backgroundColor: '#f3f4f6',
            borderRadius: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#9ca3af',
            fontWeight: '500'
          }}>
            Chart goes here
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Reports;
