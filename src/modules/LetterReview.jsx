import React from 'react';
import { useCards } from '../context/CardsContext'; // Correct import for useCards

// Letter Review Component
const LetterReview = () => {
  const { letters, updateLetterStatus } = useCards(); // Destructure updateLetterStatus from useCards
  
  const handleView = (docPath) => {
    window.open(docPath, '_blank');
  };

  const handleApprove = (id) => {
    updateLetterStatus(id, 'approved');
  };

  const handleReject = (id) => {
    updateLetterStatus(id, 'rejected');
  };

  return (
    <div style={{ padding: '2rem', backgroundColor: '#f9fafb', borderRadius: '0.5rem', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#1f2937' }}>Review Letters</h2>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ minWidth: '100%', backgroundColor: '#ffffff', borderCollapse: 'collapse', borderRadius: '0.5rem', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
          <thead>
            <tr style={{ backgroundColor: '#f3f4f6' }}>
              <th style={{ padding: '0.75rem', textAlign: 'left', color: '#374151', fontWeight: '500', borderBottom: '1px solid #e5e7eb' }}>ID</th>
              <th style={{ padding: '0.75rem', textAlign: 'left', color: '#374151', fontWeight: '500', borderBottom: '1px solid #e5e7eb' }}>Professor</th>
              <th style={{ padding: '0.75rem', textAlign: 'left', color: '#374151', fontWeight: '500', borderBottom: '1px solid #e5e7eb' }}>Course</th>
              <th style={{ padding: '0.75rem', textAlign: 'left', color: '#374151', fontWeight: '500', borderBottom: '1px solid #e5e7eb' }}>Status</th>
              <th style={{ padding: '0.75rem', textAlign: 'left', color: '#374151', fontWeight: '500', borderBottom: '1px solid #e5e7eb' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {letters.map(letter => (
              <tr key={letter.id} style={{ borderTop: '1px solid #e5e7eb' }}>
                <td style={{ padding: '0.75rem', color: '#1f2937' }}>{letter.id}</td>
                <td style={{ padding: '0.75rem', color: '#1f2937' }}>{letter.professor}</td>
                <td style={{ padding: '0.75rem', color: '#1f2937' }}>{letter.course}</td>
                <td style={{ padding: '0.75rem' }}>
                  <span style={{
                    padding: '0.25rem 0.5rem',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem',
                    color: letter.status === 'approved' ? '#065f46' : letter.status === 'rejected' ? '#7f1d1d' : '#92400e',
                    backgroundColor: letter.status === 'approved' ? '#d1fae5' : letter.status === 'rejected' ? '#fee2e2' : '#fef3c7'
                  }}>
                    {letter.status}
                  </span>
                </td>
                <td style={{ padding: '0.75rem' }}>
                  <button
                    onClick={() => handleView(letter.docPath)}
                    style={{
                      backgroundColor: '#3b82f6',
                      color: '#ffffff',
                      padding: '0.5rem 1rem',
                      borderRadius: '0.375rem',
                      marginRight: '0.5rem',
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      cursor: 'pointer'
                    }}
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleApprove(letter.id)}
                    style={{
                      backgroundColor: '#10b981',
                      color: '#ffffff',
                      padding: '0.5rem 1rem',
                      borderRadius: '0.375rem',
                      marginRight: '0.5rem',
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      cursor: 'pointer'
                    }}
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(letter.id)}
                    style={{
                      backgroundColor: '#ef4444',
                      color: '#ffffff',
                      padding: '0.5rem 1rem',
                      borderRadius: '0.375rem',
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      cursor: 'pointer'
                    }}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LetterReview;
