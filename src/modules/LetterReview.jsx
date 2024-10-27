import React, { useState } from 'react';

// Letter Review Component
const LetterReview = () => {
  const [letters, setLetters] = useState([
    { id: 1, professor: 'Dr. Smith', course: 'CS101', status: 'pending' },
    { id: 2, professor: 'Dr. Johnson', course: 'CS202', status: 'approved' },
    { id: 3, professor: 'Dr. Williams', course: 'CS303', status: 'rejected' }
  ]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Review Letters</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Professor</th>
              <th className="p-3 text-left">Course</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {letters.map(letter => (
              <tr key={letter.id} className="border-t">
                <td className="p-3">{letter.id}</td>
                <td className="p-3">{letter.professor}</td>
                <td className="p-3">{letter.course}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded text-sm ${
                    letter.status === 'approved' ? 'bg-green-100 text-green-800' :
                    letter.status === 'rejected' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {letter.status}
                  </span>
                </td>
                <td className="p-3">
                  <button className="bg-blue-600 text-white px-3 py-1 rounded mr-2">
                    View
                  </button>
                  <button className="bg-green-600 text-white px-3 py-1 rounded mr-2">
                    Approve
                  </button>
                  <button className="bg-red-600 text-white px-3 py-1 rounded">
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