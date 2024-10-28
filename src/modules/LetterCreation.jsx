import React, { useState } from 'react';
import { Card } from "../components/ui/card";
import { Trash2, Plus } from 'lucide-react';
import DocxGenerator from '../components/DocxGenerator';
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

  const [generateDocx, setGenerateDocx] = useState(false);

  const handleLetterSubmit = (e) => {
    e.preventDefault();
    setGenerateDocx(true);
  };

  const [tableData, setTableData] = useState({
    // ... (previous state fields)
    methodology: '',
    methodologyTable: [{ id: Date.now(), description: '', technique: '', outcome: '' }],
    evaluation: '',
    evaluationTable: [{ id: Date.now(), criteria: '', percentage: '', description: '' }],
    chronogram: '',
    chronogramTable: [{ id: Date.now(), week: '', topic: '', activities: '' }]
  });

  // ... (previous handlers remain the same)

  const handleTableChange = (section, id, field, value) => {
    setTableData(prev => ({
      ...prev,
      [`${section}Table`]: prev[`${section}Table`].map(row =>
        row.id === id ? { ...row, [field]: value } : row
      )
    }));
  };

  const addTableRow = (section) => {
    const newRow = {
      id: Date.now(),
      ...(section === 'methodology' && { description: '', technique: '', outcome: '' }),
      ...(section === 'evaluation' && { criteria: '', percentage: '', description: '' }),
      ...(section === 'chronogram' && { week: '', topic: '', activities: '' })
    };

    setTableData(prev => ({
      ...prev,
      [`${section}Table`]: [...prev[`${section}Table`], newRow]
    }));
  };

  const removeTableRow = (section, id) => {
    setTableData(prev => ({
      ...prev,
      [`${section}Table`]: prev[`${section}Table`].filter(row => row.id !== id)
    }));
  };

  const TableSection = ({ section, headers, fields }) => (
    <div className="mt-4 overflow-x-auto">
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index} className="border p-2 bg-gray-50 text-left">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData[`${section}Table`].map((row) => (
            <tr key={row.id}>
              {fields.map((field) => (
                <td key={field} className="border p-2">
                  <input
                    type={field === 'percentage' ? 'number' : 'text'}
                    defaultValue={row[field]}
                    onBlur={(e) => handleTableChange(section, row.id, field, e.target.value)}
                    className="w-full p-1 border rounded"
                    {...(field === 'percentage' && { min: 0, max: 100 })}
                  />
                </td>
              ))}
              <td className="border p-2">
                <button
                  type="button"
                  onClick={() => removeTableRow(section, row.id)}
                  className="p-1 text-red-600 hover:text-red-800"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        type="button"
        onClick={() => addTableRow(section)}
        className="mt-2 flex items-center gap-2 text-blue-600 hover:text-blue-800"
      >
        <Plus className="h-4 w-4" /> Add Row
      </button>
    </div>
  );

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
          <div className="p-4 border rounded-lg space-y-4">
            <textarea
              name="methodology"
              value={letterData.methodology}
              onChange={handleChange}
              className="w-full p-2 min-h-[100px] font-mono border rounded"
              placeholder="Enter general methodology description"
              required
            />
          </div>
        </div>

        {/* Evaluation */}
        <div className="space-y-2">
          <label className="block text-sm font-medium mb-1">Evaluation</label>
          <div className="p-4 border rounded-lg space-y-4">
            <textarea
              name="evaluation"
              value={letterData.evaluation}
              onChange={handleChange}
              className="w-full p-2 min-h-[100px] font-mono border rounded"
              placeholder="Enter general evaluation description"
              required
            />
            <TableSection
              section="evaluation"
              headers={['Aspecto Evaluativo', 'Porcentaje']}
              fields={['criteria', 'percentage']}
            />
          </div>
        </div>

        {/* Chronogram */}
        <div className="space-y-2">
          <label className="block text-sm font-medium mb-1">Chronogram</label>
          <div className="p-4 border rounded-lg space-y-4">
            <textarea
              name="chronogram"
              value={letterData.chronogram}
              onChange={handleChange}
              className="w-full p-2 min-h-[100px] font-mono border rounded"
              placeholder="Enter general chronogram description"
              required
            />
            <TableSection
              section="chronogram"
              headers={['Actividad', 'Semana / Fecha']}
              fields={['week', 'topic']}
            />
          </div>
        </div>


        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors"
          onClick={handleLetterSubmit}
        >
          Submit Letter
        </button>
        {generateDocx && (
          <DocxGenerator tableData={tableData} letterData={letterData} />
        )}
      </form>
    </Card>
  );
};

export default LetterCreation;