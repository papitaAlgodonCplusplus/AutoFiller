import React from 'react';
import { useCards } from '../context/CardsContext';
import StatCard from "./StatCard";

const Dashboard = () => {
  const { letters } = useCards();

  // Calculate stats dynamically based on letters data
  const stats = {
    pendingLetters: letters.filter(letter => letter.status === 'pending').length,
    approvedLetters: letters.filter(letter => letter.status === 'approved').length,
    rejectedLetters: letters.filter(letter => letter.status === 'rejected').length,
    totalLetters: letters.length
  };

  return (
    <div style={{ padding: '2rem', backgroundColor: '#f9fafb', borderRadius: '0.5rem', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#1f2937' }}>Dashboard</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
        <StatCard title="Pending Letters" value={stats.pendingLetters} color="#fef3c7" />
        <StatCard title="Approved Letters" value={stats.approvedLetters} color="#d1fae5" />
        <StatCard title="Rejected Letters" value={stats.rejectedLetters} color="#fee2e2" />
        <StatCard title="Total Letters" value={stats.totalLetters} color="#dbeafe" />
      </div>
    </div>
  );
};

export default Dashboard;
