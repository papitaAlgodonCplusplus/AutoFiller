import React, { useState } from 'react';

// Letter Creation Component
const LetterCreation = () => {
  const [letterData, setLetterData] = useState({
    courseCode: '',
    courseTitle: '',
    semester: '',
    consultationHours: '',
    methodology: '',
    evaluationCriteria: '',
    timeline: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle letter submission
    console.log('Letter submitted:', letterData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLetterData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Create New Letter</h2>
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Course Code</label>
          <input
            type="text"
            name="courseCode"
            value={letterData.courseCode}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Course Title</label>
          <input
            type="text"
            name="courseTitle"
            value={letterData.courseTitle}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Semester</label>
          <input
            type="text"
            name="semester"
            value={letterData.semester}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Consultation Hours</label>
          <input
            type="text"
            name="consultationHours"
            value={letterData.consultationHours}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Methodology</label>
          <textarea
            name="methodology"
            value={letterData.methodology}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            rows="4"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Evaluation Criteria</label>
          <textarea
            name="evaluationCriteria"
            value={letterData.evaluationCriteria}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            rows="4"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Timeline</label>
          <textarea
            name="timeline"
            value={letterData.timeline}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            rows="4"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Submit Letter
        </button>
      </form>
    </div>
  );
};

export default LetterCreation;