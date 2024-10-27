import React from 'react';
import { Link } from 'react-router-dom';

const styles = {
  nav: {
    backgroundColor: 'black',
    padding: '20px'
  },
  navContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: 'white'
  },
  linkContainer: {
    display: 'flex',
    gap: '1rem'
  },
  link: {
    background: 'linear-gradient(to right, #3b82f6, #06b6d4)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    transition: 'opacity 0.3s',
    textDecoration: 'none'
  }
};

const Navbar = () => {
  return (
    <nav style={styles.nav}>
      <div style={styles.navContent}>
        <h1 style={styles.title}>ECCI Letter Management System</h1>
        <div style={styles.linkContainer}>
          <Link 
            to="/" 
            style={styles.link}
            onMouseOver={e => e.target.style.opacity = '0.7'}
            onMouseOut={e => e.target.style.opacity = '1'}
          >
            Home
          </Link>
          <Link 
            to="/create-letter" 
            style={styles.link}
            onMouseOver={e => e.target.style.opacity = '0.7'}
            onMouseOut={e => e.target.style.opacity = '1'}
          >
            Create Letter
          </Link>
          <Link 
            to="/review-letters" 
            style={styles.link}
            onMouseOver={e => e.target.style.opacity = '0.7'}
            onMouseOut={e => e.target.style.opacity = '1'}
          >
            Review Letters
          </Link>
          <Link 
            to="/reports" 
            style={styles.link}
            onMouseOver={e => e.target.style.opacity = '0.7'}
            onMouseOut={e => e.target.style.opacity = '1'}
          >
            Reports
          </Link>
          <Link 
            to="/admin" 
            style={styles.link}
            onMouseOver={e => e.target.style.opacity = '0.7'}
            onMouseOut={e => e.target.style.opacity = '1'}
          >
            Admin
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;