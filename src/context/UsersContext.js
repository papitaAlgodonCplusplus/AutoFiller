import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const UsersContext = createContext();

export const UsersProvider = ({ children }) => {
  const [usersData, setUsersData] = useState({
    users: [],
    hierarchy: {
      coreCourses: null,
      emphasisCourses: null,
      serviceCourses: null,
      blockCourses: null
    }
  });

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const response = await axios.get('/api/users');
        setUsersData(response.data);
      } catch (error) {
        console.error('Error loading users data:', error);
      }
    };

    fetchUsersData();
  }, []);

  // Function to add a new user
  const addUser = async (newUser) => {
    try {
      const response = await axios.post('/api/users', newUser);
      setUsersData(response.data);
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  // Function to remove a user by id
  const removeUser = async (userId) => {
    try {
      const response = await axios.delete(`/api/users/${userId}`);
      setUsersData(response.data);
    } catch (error) {
      console.error('Error removing user:', error);
    }
  };

  // Function to assign an approver to a cathedra
  const assignApprover = async (cathedra, userId) => {
    try {
      const response = await axios.put(`/api/hierarchy/${cathedra}`, { userId });
      setUsersData(response.data);
    } catch (error) {
      console.error('Error assigning approver:', error);
    }
  };

  return (
    <UsersContext.Provider value={{ ...usersData, addUser, removeUser, assignApprover }}>
      {children}
    </UsersContext.Provider>
  );
};

export const useUsers = () => useContext(UsersContext);
