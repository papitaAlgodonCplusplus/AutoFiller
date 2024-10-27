import React, { useState } from 'react';
import { Card } from "../components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

const LetterCreation = () => {
  const [letterData, setLetterData] = useState({
    // First consultation slot (required)
    consultationDay1: '',
    consultationStartTime1: '',
    consultationEndTime1: '',
    consultationMode1: 'in-person',
    officeNumber1: '',
    
    // Second consultation slot (optional)
    consultationDay2: '',
    consultationStartTime2: '',
    consultationEndTime2: '',
    consultationMode2: 'in-person',
    officeNumber2: '',
    
    // Class details
    classDay: '',
    classStartTime: '',
    classEndTime: '',
    classroom: '',
    
    // Large text fields
    methodology: '',
    evaluation: '',
    chronogram: ''
  });

  const daysOfWeek = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Letter submitted:', letterData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLetterData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name, value) => {
    setLetterData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-6">Create New Letter</h2>
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-6">
        {/* Consultation Time 1 (Required) */}
        <div className="space-y-4 p-4 border rounded-lg">
          <h3 className="text-lg font-semibold">Primary Consultation Time</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Day</label>
              <Select 
                onValueChange={(value) => handleSelectChange('consultationDay1', value)}
                value={letterData.consultationDay1}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select day" />
                </SelectTrigger>
                <SelectContent>
                  {daysOfWeek.map(day => (
                    <SelectItem key={day} value={day.toLowerCase()}>{day}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Mode</label>
              <Select 
                onValueChange={(value) => handleSelectChange('consultationMode1', value)}
                value={letterData.consultationMode1}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="in-person">In Person</SelectItem>
                  <SelectItem value="virtual">Virtual</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Start Time</label>
              <input
                type="time"
                name="consultationStartTime1"
                value={letterData.consultationStartTime1}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">End Time</label>
              <input
                type="time"
                name="consultationEndTime1"
                value={letterData.consultationEndTime1}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Office Number</label>
              <input
                type="text"
                name="officeNumber1"
                value={letterData.officeNumber1}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </div>
        </div>

        {/* Consultation Time 2 (Optional) */}
        <div className="space-y-4 p-4 border rounded-lg">
          <h3 className="text-lg font-semibold">Secondary Consultation Time (Optional)</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Day</label>
              <Select 
                onValueChange={(value) => handleSelectChange('consultationDay2', value)}
                value={letterData.consultationDay2}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select day" />
                </SelectTrigger>
                <SelectContent>
                  {daysOfWeek.map(day => (
                    <SelectItem key={day} value={day.toLowerCase()}>{day}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Mode</label>
              <Select 
                onValueChange={(value) => handleSelectChange('consultationMode2', value)}
                value={letterData.consultationMode2}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="in-person">In Person</SelectItem>
                  <SelectItem value="virtual">Virtual</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Start Time</label>
              <input
                type="time"
                name="consultationStartTime2"
                value={letterData.consultationStartTime2}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">End Time</label>
              <input
                type="time"
                name="consultationEndTime2"
                value={letterData.consultationEndTime2}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Office Number</label>
              <input
                type="text"
                name="officeNumber2"
                value={letterData.officeNumber2}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
        </div>

        {/* Class Time and Location */}
        <div className="space-y-4 p-4 border rounded-lg">
          <h3 className="text-lg font-semibold">Class Time and Location</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Day</label>
              <Select 
                onValueChange={(value) => handleSelectChange('classDay', value)}
                value={letterData.classDay}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select day" />
                </SelectTrigger>
                <SelectContent>
                  {daysOfWeek.map(day => (
                    <SelectItem key={day} value={day.toLowerCase()}>{day}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Classroom</label>
              <input
                type="text"
                name="classroom"
                value={letterData.classroom}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Start Time</label>
              <input
                type="time"
                name="classStartTime"
                value={letterData.classStartTime}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">End Time</label>
              <input
                type="time"
                name="classEndTime"
                value={letterData.classEndTime}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </div>
        </div>

        {/* Methodology */}
        <div className="space-y-2">
          <label className="block text-sm font-medium mb-1">Methodology</label>
          <div className="p-4 border rounded-lg">
            <textarea
              name="methodology"
              value={letterData.methodology}
              onChange={handleChange}
              className="w-full p-2 min-h-[200px] font-mono"
              placeholder="Enter methodology (Markdown tables supported)"
              required
            />
          </div>
        </div>

        {/* Evaluation */}
        <div className="space-y-2">
          <label className="block text-sm font-medium mb-1">Evaluation</label>
          <div className="p-4 border rounded-lg">
            <textarea
              name="evaluation"
              value={letterData.evaluation}
              onChange={handleChange}
              className="w-full p-2 min-h-[200px] font-mono"
              placeholder="Enter evaluation criteria (Markdown tables supported)"
              required
            />
          </div>
        </div>

        {/* Chronogram */}
        <div className="space-y-2">
          <label className="block text-sm font-medium mb-1">Chronogram</label>
          <div className="p-4 border rounded-lg">
            <textarea
              name="chronogram"
              value={letterData.chronogram}
              onChange={handleChange}
              className="w-full p-2 min-h-[200px] font-mono"
              placeholder="Enter chronogram (Markdown tables supported)"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Submit Letter
        </button>
      </form>
    </Card>
  );
};

export default LetterCreation;