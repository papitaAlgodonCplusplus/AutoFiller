import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const CardsContext = createContext();

export const CardsProvider = ({ children }) => {
  const [cardsData, setCardsData] = useState({
    letters: [],
    stats: {
      pendingLetters: 0,
      approvedLetters: 0,
      rejectedLetters: 0,
      totalLetters: 0
    }
  });

  useEffect(() => {
    const fetchCardsData = async () => {
      try {
        const response = await axios.get('/api/letters');
        const letters = response.data;
        const stats = calculateStats(letters);
        setCardsData({ letters, stats });
      } catch (error) {
        console.error('Error loading cards data:', error);
      }
    };

    fetchCardsData();
  }, []);

  // Calculate statistics based on letter statuses
  const calculateStats = (letters) => {
    const stats = {
      pendingLetters: letters.filter(letter => letter.status === 'pending').length,
      approvedLetters: letters.filter(letter => letter.status === 'approved').length,
      rejectedLetters: letters.filter(letter => letter.status === 'rejected').length,
      totalLetters: letters.length
    };
    return stats;
  };

  // Function to add a new letter
  const addLetter = async (newLetter) => {
    try {
      const response = await axios.post('/api/letters', newLetter);
      const updatedLetters = [...cardsData.letters, response.data];
      setCardsData({ letters: updatedLetters, stats: calculateStats(updatedLetters) });
    } catch (error) {
      console.error('Error adding letter:', error);
    }
  };

  // Function to update the status of a letter
  const updateLetterStatus = async (id, status) => {
    try {
      await axios.put(`/api/letters/${id}/status`, { status });
      const updatedLetters = cardsData.letters.map(letter =>
        letter.id === id ? { ...letter, status } : letter
      );
      setCardsData({ letters: updatedLetters, stats: calculateStats(updatedLetters) });
    } catch (error) {
      console.error('Error updating letter status:', error);
    }
  };

  // Function to delete a letter
  const deleteLetter = async (id) => {
    try {
      await axios.delete(`/api/letters/${id}`);
      const updatedLetters = cardsData.letters.filter(letter => letter.id !== id);
      setCardsData({ letters: updatedLetters, stats: calculateStats(updatedLetters) });
    } catch (error) {
      console.error('Error deleting letter:', error);
    }
  };

  return (
    <CardsContext.Provider value={{ ...cardsData, addLetter, updateLetterStatus, deleteLetter }}>
      {children}
    </CardsContext.Provider>
  );
};

export const useCards = () => useContext(CardsContext);
