import React, { useState } from "react";
import { useUsers } from '../context/UsersContext';

// Admin Component
const Admin = () => {
  const { users, hierarchy, addUser, removeUser, assignApprover } = useUsers(); // Access context functions
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "", cathedra: "" });

  // Options for cathedra categories
  const cathedraOptions = ["Core Courses", "Emphasis Courses", "Service Courses", "Block Courses"];
  const roleOptions = ["Professor", "Approver"];

  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setNewUser(prevState => ({ ...prevState, [name]: value }));
  };

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email || !newUser.role || !newUser.cathedra) return;
    addUser(newUser); // Use context's addUser function
    setNewUser({ name: "", email: "", role: "", cathedra: "" });
  };

  return (
    <div style={{ padding: '2rem', backgroundColor: '#f9fafb', borderRadius: '0.5rem', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#1f2937' }}>Admin Panel</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>

        {/* User Management Section */}
        <div style={{ backgroundColor: '#ffffff', padding: '1rem', borderRadius: '0.5rem', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>User Management</h3>
          <div style={{ marginBottom: '1rem' }}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={newUser.name}
              onChange={handleUserChange}
              style={{ padding: '0.5rem', marginBottom: '0.5rem', width: '97%', borderRadius: '0.375rem', border: '1px solid #d1d5db' }}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={newUser.email}
              onChange={handleUserChange}
              style={{ padding: '0.5rem', marginBottom: '0.5rem', width: '97%', borderRadius: '0.375rem', border: '1px solid #d1d5db' }}
            />
            <select
              name="role"
              value={newUser.role}
              onChange={handleUserChange}
              style={{ padding: '0.5rem', marginBottom: '0.5rem', width: '100%', borderRadius: '0.375rem', border: '1px solid #d1d5db' }}
            >
              <option value="">Select Role</option>
              {roleOptions.map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
            <select
              name="cathedra"
              value={newUser.cathedra}
              onChange={handleUserChange}
              style={{ padding: '0.5rem', marginBottom: '0.5rem', width: '100%', borderRadius: '0.375rem', border: '1px solid #d1d5db' }}
            >
              <option value="">Select Cathedra</option>
              {cathedraOptions.map(cathedra => (
                <option key={cathedra} value={cathedra}>{cathedra}</option>
              ))}
            </select>
            <button
              onClick={handleAddUser}
              style={{
                padding: '0.5rem',
                backgroundColor: '#3b82f6',
                color: '#ffffff',
                borderRadius: '0.375rem',
                width: '100%',
                fontWeight: '500',
                cursor: 'pointer',
                marginBottom: '1rem'
              }}
            >
              Add User
            </button>
          </div>
          <ul>
            {users.map(user => (
              <li key={user.id} style={{ padding: '0.5rem', borderBottom: '1px solid #e5e7eb' }}>
                <span>{user.name} ({user.role} - {user.cathedra})</span>
                <button
                  onClick={() => removeUser(user.id)} // Use context's removeUser function
                  style={{
                    marginLeft: '1rem',
                    backgroundColor: '#ef4444',
                    color: '#ffffff',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '0.25rem',
                    fontSize: '0.875rem',
                    cursor: 'pointer'
                  }}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Approval Hierarchies Section */}
        <div style={{ backgroundColor: '#ffffff', padding: '1rem', borderRadius: '0.5rem', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>Approval Hierarchies</h3>
          {cathedraOptions.map(cathedra => (
            <div key={cathedra} style={{ marginBottom: '1rem' }}>
              <label style={{ fontWeight: '500', color: '#1f2937', marginBottom: '0.5rem', display: 'block' }}>{cathedra}</label>
              <select
                value={hierarchy[cathedra.toLowerCase().replace(" ", "")]}
                onChange={(e) => assignApprover(cathedra.toLowerCase().replace(" ", ""), parseInt(e.target.value))} // Use context's assignApprover function
                style={{ width: '100%', padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid #d1d5db' }}
              >
                <option value="">Select Approver</option>
                {users
                  .filter(user => user.cathedra === cathedra && user.role === "Approver")
                  .map(user => (
                    <option key={user.id} value={user.id}>{user.name}</option>
                  ))}
              </select>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Admin;
