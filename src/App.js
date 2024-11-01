import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CardsProvider } from './context/CardsContext';
import { UsersProvider } from './context/UsersContext';
import LetterCreation from './modules/LetterCreation';
import LetterReview from './modules/LetterReview';
import Reports from './modules/Reports';
import Admin from './modules/Admin';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import Login from './modules/Login';

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
    <CardsProvider>
      <UsersProvider>
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
                <Route path="/login" element={<Login />} />
              </Routes>
            </div>
          </div>
        </Router>
      </UsersProvider>
    </CardsProvider>
  );
};

export default App;
