import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LetterCreation from './modules/LetterCreation';
import LetterReview from './modules/LetterReview';
import Reports from './modules/Reports';
import Admin from './modules/Admin';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f3f4f6'
  },
  mainContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '1rem'
  }
};

const App = () => {
  return (
    <Router>
      <div style={styles.container}>
        <Navbar />
        <div style={styles.mainContent}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/create-letter" element={<LetterCreation />} />
            <Route path="/review-letters" element={<LetterReview />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;