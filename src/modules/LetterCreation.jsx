import React, { useState } from 'react';
import { Card } from "../components/ui/card";
import { Trash2, Plus } from 'lucide-react';
import DocxGenerator from '../components/DocxGenerator';
import { useCards } from '../context/CardsContext'; 

const LetterCreation = () => {
  const { addLetter } = useCards(); // Destructure addLetter from useCards
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
    classDay2: '',
    classStartTime: '',
    classEndTime: '',
    classStartTime2: '',
    classEndTime2: '',
    building: '',
    classroom: '',

    // Large text fields
    methodology: '',
    evaluation: '',
    chronogram: '',

    // General info
    professorName: '',
    professorEmail: '',
    groupNumber: '',
    courseModality: 'in-person',
    assistantName: '',
    assistantEmail: ''
  });

  const daysOfWeek = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'
  ];

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
  const [generateMockDocx, setGenerateMockDocx] = useState(false);

  const mockData = {
    tableData: {
      evaluationTable: [
        { criteria: 'Criteria 1', percentage: '80' },
        { criteria: 'Criteria 2', percentage: '90' }
      ],
      chronogramTable: [
        { week: 'Week 1', topic: 'Introduction to Course' },
        { week: 'Week 2', topic: 'Advanced Topics' }
      ]
    },
    letterData: {
      consultationDay1: 'Monday',
      consultationStartTime1: '10:00',
      consultationEndTime1: '11:00',
      consultationMode1: 'virtual',
      officeNumber1: '101',
      consultationDay2: 'Tuesday',
      consultationStartTime2: '12:00',
      consultationEndTime2: '1:00',
      consultationMode2: 'in-person',
      officeNumber2: '102',

      classDay: 'Wednesday',
      classStartTime: '2:00 PM',
      classEndTime: '3:00 PM',
      classDay2: 'Thursday',
      classStartTime2: '3:00 PM',
      classEndTime2: '4:00 PM',
      building: 'Main Building',
      classroom: 'Room 202',

      methodology: 'This course will follow a blended methodology...',
      evaluation: 'Evaluation includes quizzes, assignments, and exams...',
      chronogram: 'The chronogram covers various topics as outlined...',

      professorName: 'Dr. John Smith',
      professorEmail: 'dr.smith@example.com',
      groupNumber: 'G1',
      courseModality: 'Bi-Modal',
      assistantName: 'Jane Doe',
      assistantEmail: 'jane.doe@example.com'
    }
  };

  const handleLetterSubmitMock = (e) => {
    e.preventDefault();
    setGenerateMockDocx(true);
  };

  const handleLetterSubmit = async (e) => {
    e.preventDefault();
    try {
      await addLetter(letterData);
      setGenerateDocx(true);
    } catch (error) {
      console.error('Error adding letter:', error);
    }
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
    <div style={{ marginTop: '1rem', overflowX: 'auto' }}>
      <table style={{
        minWidth: '100%',
        borderCollapse: 'collapse',
        backgroundColor: '#f9fafb',
        borderRadius: '0.5rem',
        overflow: 'hidden',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
      }}>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index} style={{
                padding: '0.5rem',
                backgroundColor: '#f3f4f6',
                color: '#1f2937',
                fontWeight: '500',
                textAlign: 'left',
                borderBottom: '1px solid #e5e7eb'
              }}>
                {header}
              </th>
            ))}
            <th style={{
              padding: '0.5rem',
              backgroundColor: '#f3f4f6',
              color: '#1f2937',
              fontWeight: '500',
              textAlign: 'center',
              borderBottom: '1px solid #e5e7eb'
            }}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {tableData[`${section}Table`].map((row) => (
            <tr key={row.id}>
              {fields.map((field) => (
                <td key={field} style={{
                  padding: '0.5rem',
                  borderBottom: '1px solid #e5e7eb'
                }}>
                  <input
                    type={field === 'percentage' ? 'number' : 'text'}
                    defaultValue={row[field]}
                    onBlur={(e) => handleTableChange(section, row.id, field, e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.25rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '0.375rem',
                      backgroundColor: '#ffffff',
                      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
                    }}
                    {...(field === 'percentage' && { min: 0, max: 100 })}
                  />
                </td>
              ))}
              <td style={{
                padding: '0.5rem',
                borderBottom: '1px solid #e5e7eb',
                textAlign: 'center'
              }}>
                <button
                  type="button"
                  onClick={() => removeTableRow(section, row.id)}
                  style={{
                    padding: '0.25rem',
                    color: '#ef4444',
                    transition: 'color 0.2s',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#b91c1c'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#ef4444'}
                >
                  <Trash2 style={{ height: '1rem', width: '1rem' }} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        type="button"
        onClick={() => addTableRow(section)}
        style={{
          marginTop: '0.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          color: '#3b82f6',
          transition: 'color 0.2s',
          cursor: 'pointer'
        }}
        onMouseEnter={(e) => e.currentTarget.style.color = '#1d4ed8'}
        onMouseLeave={(e) => e.currentTarget.style.color = '#3b82f6'}
      >
        <Plus style={{ height: '1rem', width: '1rem' }} /> Add Row
      </button>
    </div>
  );


  return (
    <Card style={{
      background: 'linear-gradient(to bottom right, #f8fafc, #f1f5f9)',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      maxWidth: '80rem',
      margin: '3rem auto',
      borderRadius: '1.5rem'
    }}>
      <div style={{ padding: '2rem' }}>
        <h2 style={{
          fontSize: '2rem',
          fontWeight: 'bold',
          marginBottom: '3rem',
          color: '#1e293b',
          textAlign: 'center'
        }}>
          Crear Nueva Carta
        </h2>

        <form onSubmit={handleLetterSubmit} style={{ marginBottom: '0.1rem' }}>
          {/* Horario de Consulta 1 */}
          <div style={{
            marginBottom: '1.5rem',
            paddingRight: '3rem',
            paddingLeft: '1rem',
            background: '#ffffff',
            borderRadius: '1rem',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            border: '1px solid #cbd5e1'
          }}>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              color: '#334155',
              display: 'flex',
              alignItems: 'center',
              gap: '1.5rem',
              marginBottom: '2rem'
            }}>
              <span style={{ color: '#3b82f6' }}>①</span> Primer Horario de Consulta
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8" style={{ rowGap: '6.5rem', height: '28rem' }}>
              {/* Day */}
              <div style={{ marginBottom: '0.5rem' }}>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#64748b',
                  marginBottom: '0.5rem'
                }}>Día</label>
                <select
                  onChange={(e) => handleSelectChange('consultationDay1', e.target.value)}
                  value={letterData.consultationDay1}
                  style={{
                    width: '102.5%',
                    padding: '0.75rem',
                    border: '1px solid #cbd5e1',
                    borderRadius: '0.5rem',
                    backgroundColor: '#f8fafc',
                    outline: 'none',
                    boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.5)'
                  }}
                >
                  <option value="" disabled>Select day</option>
                  {daysOfWeek.map(day => (
                    <option key={day} value={day.toLowerCase()}>{day}</option>
                  ))}
                </select>
              </div>

              {/* Mode */}
              <div style={{ marginBottom: '0.5rem' }}>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#64748b',
                  marginBottom: '0.5rem'
                }}>Mode</label>
                <select
                  onChange={(e) => handleSelectChange('consultationMode1', e.target.value)}
                  value={letterData.consultationMode1}
                  style={{
                    width: '102.5%',
                    padding: '0.75rem',
                    border: '1px solid #cbd5e1',
                    borderRadius: '0.5rem',
                    backgroundColor: '#f8fafc',
                    outline: 'none',
                    boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.5)'
                  }}
                >
                  <option value="" disabled>Select mode</option>
                  <option value="in-person">In Person</option>
                  <option value="virtual">Virtual</option>
                </select>
              </div>

              {/* Hora de Inicio */}
              <div style={{ marginBottom: '0.5rem' }}>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#64748b',
                  marginBottom: '0.5rem'
                }}>Hora de Inicio</label>
                <input
                  type="time"
                  name="consultationStartTime1"
                  value={letterData.consultationStartTime1}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #cbd5e1',
                    borderRadius: '0.5rem',
                    backgroundColor: '#f8fafc',
                    outline: 'none',
                    boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.5)'
                  }}
                  required
                />
              </div>

              {/* Hora de Finalización */}
              <div style={{ marginBottom: '0.5rem' }}>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#64748b',
                  marginBottom: '0.5rem'
                }}>Hora de Finalización</label>
                <input
                  type="time"
                  name="consultationEndTime1"
                  value={letterData.consultationEndTime1}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #cbd5e1',
                    borderRadius: '0.5rem',
                    backgroundColor: '#f8fafc',
                    outline: 'none',
                    boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.5)'
                  }}
                  required
                />
              </div>

              {/* Número de oficina */}
              <div className="md:col-span-2" style={{ marginBottom: '0.5rem' }}>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#64748b',
                  marginBottom: '0.5rem'
                }}>Número de oficina</label>
                <input
                  type="text"
                  name="officeNumber1"
                  value={letterData.officeNumber1}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #cbd5e1',
                    borderRadius: '0.5rem',
                    backgroundColor: '#f8fafc',
                    outline: 'none',
                    boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.5)'
                  }}
                  required
                />
              </div>
            </div>
          </div>

          {/* Secondary Consultation Time */}
          <div style={{
            marginBottom: '1.5rem',
            paddingRight: '3rem',
            paddingLeft: '1rem',
            background: '#ffffff',
            borderRadius: '1rem',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            border: '1px solid #cbd5e1'
          }}>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              color: '#334155',
              display: 'flex',
              alignItems: 'center',
              gap: '1.5rem',
              marginBottom: '2rem'
            }}>
              <span style={{ color: '#FFA500' }}>②</span> Segundo Horario de Consulta <span style={{ fontSize: '0.875rem', fontWeight: '400', color: '#64748b' }}>(Opcional)</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8" style={{ rowGap: '6.5rem', height: '28rem' }}>

              {/* Day */}
              <div style={{ marginBottom: '0.5rem' }}>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#64748b',
                  marginBottom: '0.5rem'
                }}>Día</label>
                <select
                  onChange={(e) => handleSelectChange('consultationDay2', e.target.value)}
                  value={letterData.consultationDay2}
                  style={{
                    width: '102.5%',
                    padding: '0.75rem',
                    border: '1px solid #cbd5e1',
                    borderRadius: '0.5rem',
                    backgroundColor: '#f8f6ee',
                    outline: 'none',
                    boxShadow: '0 0 0 2px rgba(255, 165, 0, 0.5)'
                  }}
                >
                  <option value="" disabled>Select day</option>
                  {daysOfWeek.map(day => (
                    <option key={day} value={day.toLowerCase()}>{day}</option>
                  ))}
                </select>
              </div>

              {/* Mode */}
              <div style={{ marginBottom: '0.5rem' }}>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#64748b',
                  marginBottom: '0.5rem'
                }}>Mode</label>
                <select
                  onChange={(e) => handleSelectChange('consultationMode2', e.target.value)}
                  value={letterData.consultationMode2}
                  style={{
                    width: '102.5%',
                    padding: '0.75rem',
                    border: '1px solid #cbd5e1',
                    borderRadius: '0.5rem',
                    backgroundColor: '#f8f6ee',
                    outline: 'none',
                    boxShadow: '0 0 0 2px rgba(255, 165, 0, 0.5)'
                  }}
                >
                  <option value="" disabled>Select mode</option>
                  <option value="in-person">In Person</option>
                  <option value="virtual">Virtual</option>
                </select>
              </div>

              {/* Hora de Inicio */}
              <div style={{ marginBottom: '0.5rem' }}>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#64748b',
                  marginBottom: '0.5rem'
                }}>Hora de Inicio</label>
                <input
                  type="time"
                  name="consultationStartTime2"
                  value={letterData.consultationStartTime2}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #cbd5e1',
                    borderRadius: '0.5rem',
                    backgroundColor: '#f8f6ee',
                    outline: 'none',
                    boxShadow: '0 0 0 2px rgba(255, 165, 0, 0.5)'
                  }}
                  required
                />
              </div>

              {/* Hora de Finalización */}
              <div style={{ marginBottom: '0.5rem' }}>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#64748b',
                  marginBottom: '0.5rem'
                }}>Hora de Finalización</label>
                <input
                  type="time"
                  name="consultationEndTime2"
                  value={letterData.consultationEndTime2}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #cbd5e1',
                    borderRadius: '0.5rem',
                    backgroundColor: '#f8f6ee',
                    outline: 'none',
                    boxShadow: '0 0 0 2px rgba(255, 165, 0, 0.5)'
                  }}
                  required
                />
              </div>

              {/* Número de oficina */}
              <div className="md:col-span-2" style={{ marginBottom: '0.5rem' }}>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#64748b',
                  marginBottom: '0.5rem'
                }}>Número de oficina</label>
                <input
                  type="text"
                  name="officeNumber2"
                  value={letterData.officeNumber2}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #cbd5e1',
                    borderRadius: '0.5rem',
                    backgroundColor: '#f8f6ee',
                    outline: 'none',
                    boxShadow: '0 0 0 2px rgba(255, 165, 0, 0.5)'
                  }}
                  required
                />
              </div>
            </div>
          </div>

          {/* Class Time and Location */}
          <div style={{
            marginBottom: '1.5rem',
            padding: '1rem',
            height: '45rem',
            background: '#ffffff',
            borderRadius: '1rem',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            border: '1px solid #cbd5e1'
          }}>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              color: '#334155',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '2rem'
            }}>
              <span style={{ color: '#3b82f6' }}>③</span> Hora y Lugar de Clases
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8" style={{ rowGap: '6.5rem', height: '22rem' }}>
              {/* Day */}
              <div style={{ marginBottom: '0.5rem' }}>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#64748b',
                  marginBottom: '0.5rem'
                }}>Primer Día</label>
                <select
                  onChange={(e) => handleSelectChange('classDay', e.target.value)}
                  value={letterData.classDay}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #cbd5e1',
                    borderRadius: '0.5rem',
                    backgroundColor: '#f8fafc',
                    outline: 'none',
                    boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.5)'
                  }}
                >
                  <option value="" disabled>Select day</option>
                  {daysOfWeek.map(day => (
                    <option key={day} value={day.toLowerCase()}>{day}</option>
                  ))}
                </select>
              </div>

              {/* Hora de Inicio */}
              <div style={{ marginBottom: '0.5rem' }}>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#64748b',
                  marginBottom: '0.5rem'
                }}>Hora de Inicio</label>
                <input
                  type="time"
                  name="classStartTime"
                  value={letterData.classStartTime}
                  onChange={handleChange}
                  style={{
                    width: '98%',
                    padding: '0.75rem',
                    border: '1px solid #cbd5e1',
                    borderRadius: '0.5rem',
                    backgroundColor: '#f8fafc',
                    outline: 'none',
                    boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.5)'
                  }}
                  required
                />
              </div>

              {/* Hora de Finalización */}
              <div style={{ marginBottom: '0.5rem' }}>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#64748b',
                  marginBottom: '0.5rem'
                }}>Hora de Finalización</label>
                <input
                  type="time"
                  name="classEndTime"
                  value={letterData.classEndTime}
                  onChange={handleChange}
                  style={{
                    width: '98%',
                    padding: '0.75rem',
                    border: '1px solid #cbd5e1',
                    borderRadius: '0.5rem',
                    backgroundColor: '#f8fafc',
                    outline: 'none',
                    boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.5)'
                  }}
                  required
                />
              </div>

              {/* Day 2 */}
              <div style={{ marginBottom: '0.5rem' }}>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#64748b',
                  marginBottom: '0.5rem'
                }}>Segundo Día (Opcional)</label>
                <select
                  onChange={(e) => handleSelectChange('classDay2', e.target.value)}
                  value={letterData.classDay2}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #cbd5e1',
                    borderRadius: '0.5rem',
                    backgroundColor: '#f8fafc',
                    outline: 'none',
                     boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.5)'
                  }}
                >
                  <option value="" disabled>Select day</option>
                  {daysOfWeek.map(day => (
                    <option key={day} value={day.toLowerCase()}>{day}</option>
                  ))}
                </select>
              </div>

              {/* Hora de Inicio 2 */}
              <div style={{ marginBottom: '0.5rem' }}>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#64748b',
                  marginBottom: '0.5rem'
                }}>Hora de Inicio (Opcional)</label>
                <input
                  type="time"
                  name="classStartTime2"
                  value={letterData.classStartTime2}
                  onChange={handleChange}
                  style={{
                    width: '98%',
                    padding: '0.75rem',
                    border: '1px solid #cbd5e1',
                    borderRadius: '0.5rem',
                    backgroundColor: '#f8fafc',
                    outline: 'none',
                    boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.5)'
                  }}
                  required
                />
              </div>

              {/* Hora de Finalización 2 */}
              <div style={{ marginBottom: '0.5rem' }}>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#64748b',
                  marginBottom: '0.5rem'
                }}>Hora de Finalización (Opcional)</label>
                <input
                  type="time"
                  name="classEndTime2"
                  value={letterData.classEndTime2}
                  onChange={handleChange}
                  style={{
                    width: '98%',
                    padding: '0.75rem',
                    border: '1px solid #cbd5e1',
                    borderRadius: '0.5rem',
                    backgroundColor: '#f8fafc',
                    outline: 'none',
                    boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.5)'
                  }}
                  required
                />
              </div>

              {/* Building */}
              <div style={{ marginBottom: '0.5rem' }}>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#64748b',
                  marginBottom: '0.5rem'
                }}>Edificio</label>
                <select
                  onChange={(e) => handleSelectChange('building', e.target.value)}
                  value={letterData.building}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #cbd5e1',
                    borderRadius: '0.5rem',
                    backgroundColor: '#f8fafc',
                    outline: 'none',
                    boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.5)'
                  }}
                >
                  <option value="" disabled>Selecciona un Edificio</option>
                  <option value="ECCI">ECCI</option>
                  <option value="Anexo ECCI">Anexo ECCI</option>
                </select>
              </div>

              {/* Classroom */}
              <div style={{ marginBottom: '0.5rem' }}>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#64748b',
                  marginBottom: '0.5rem'
                }}>Aula</label>
                <input
                  type="text"
                  name="classroom"
                  value={letterData.classroom}
                  onChange={handleChange}
                  style={{
                    width: '98%',
                    padding: '0.75rem',
                    border: '1px solid #cbd5e1',
                    borderRadius: '0.5rem',
                    backgroundColor: '#f8fafc',
                    outline: 'none',
                    boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.5)'
                  }}
                  required
                />
              </div>

            </div>
          </div>

          {/* Methodology */}
          <div style={{
            marginBottom: '2.5rem',
            padding: '1rem',
            background: '#ffffff',
            borderRadius: '1rem',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            border: '1px solid #f8fafc'
          }}>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              color: '#334155',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '2rem'
            }}>
              <span style={{ color: '#fb923c' }}>④</span> Metodología
            </h3>

            <div style={{ marginBottom: '0.5rem' }}>
              <textarea
                name="methodology"
                value={letterData.methodology}
                onChange={handleChange}
                style={{
                  width: '97%',
                  padding: '1rem',
                  minHeight: '120px',
                  fontFamily: 'monospace',
                  border: '1px solid #cbd5e1',
                  borderRadius: '0.5rem',
                  backgroundColor: '#f8f6ee',
                  outline: 'none',
                  boxShadow: '0 0 0 2px rgba(255, 165, 0, 0.5)'
                }}
                placeholder="Ingrese la descripción general de la metodología"
                required
              />
            </div>
          </div>
          {/* Evaluation */}
          <div style={{
            marginBottom: '2.5rem',
            padding: '1rem',
            background: '#ffffff',
            borderRadius: '1rem',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            border: '1px solid #cbd5e1'
          }}>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              color: '#334155',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '2rem'
            }}>
              <span style={{ color: '#3b82f6' }}>⑤</span> Evaluación
            </h3>

            <div style={{ marginBottom: '0.5rem' }}>
              <textarea
                name="evaluation"
                value={letterData.evaluation}
                onChange={handleChange}
                style={{
                  width: '97%',
                  padding: '1rem',
                  minHeight: '120px',
                  fontFamily: 'monospace',
                  border: '1px solid #cbd5e1',
                    borderRadius: '0.5rem',
                    backgroundColor: '#f8fafc',
                  outline: 'none',
                  boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.5)'
                }}
                placeholder="Ingrese la descripción general de la evaluación"
                required
              />
              <TableSection
                section="evaluation"
                headers={['Aspecto Evaluativo', 'Porcentaje']}
                fields={['criteria', 'percentage']}
                style={{ marginTop: '2rem' }}
              />
            </div>
          </div>

          {/* Chronogram */}
          <div style={{
            marginBottom: '2.5rem',
            padding: '1rem',
            background: '#ffffff',
            borderRadius: '1rem',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            border: '1px solid #cbd5e1'
          }}>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              color: '#334155',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '2rem'
            }}>
              <span style={{ color: '#FFA500' }}>⑥</span> Cronograma
            </h3>

            <div style={{ marginBottom: '0.5rem' }}>
              <textarea
                name="chronogram"
                value={letterData.chronogram}
                onChange={handleChange}
                style={{
                  width: '97%',
                  padding: '1rem',
                  minHeight: '120px',
                  fontFamily: 'monospace',
                  border: '1px solid #cbd5e1',
                  borderRadius: '0.5rem',
                  backgroundColor: '#f8f6ee',
                  outline: 'none',
                  boxShadow: '0 0 0 2px rgba(255, 165, 0, 0.5)'
                }}
                placeholder="Ingrese la descripción general del cronograma"
                required
              />
              <TableSection
                section="chronogram"
                headers={['Actividad', 'Semana / Fecha']}
                fields={['week', 'topic']}
                style={{ marginTop: '2rem' }}
              />
            </div>
          </div>

          {/* General Info */}
          <div style={{
            marginBottom: '2.5rem',
            padding: '2rem',
            background: '#ffffff',
            borderRadius: '1rem',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            border: '1px solid #cbd5e1'
          }}>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              color: '#334155',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '2rem'
            }}>
              <span style={{ color: '#3b82f6' }}>⑦</span> Información General
            </h3>

            {/* Professor Name */}
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: '500',
                color: '#64748b',
                marginBottom: '0.5rem'
              }}>Nombre del/a Profesor/a</label>
              <input
                type="text"
                name="professorName"
                value={letterData.professorName}
                onChange={handleChange}
                style={{
                  width: '97.2%',
                  padding: '0.75rem',
                  border: '1px solid #cbd5e1',
                  borderRadius: '0.5rem',
                  backgroundColor: '#f8fafc',
                  outline: 'none',
                  boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.5)'
                }}
                required
              />
            </div>

            {/* Professor Email */}
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: '500',
                color: '#64748b',
                marginBottom: '0.5rem'
              }}>Correo Electrónico del/a Profesor/a</label>
              <input
                type="email"
                name="professorEmail"
                value={letterData.professorEmail}
                onChange={handleChange}
                style={{
                  width: '97.2%',
                  padding: '0.75rem',
                  border: '1px solid #cbd5e1',
                  borderRadius: '0.5rem',
                  backgroundColor: '#f8fafc',
                  outline: 'none',
                   boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.5)'
                }}
                required
              />
            </div>

            {/* Group Number */}
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: '500',
                color: '#64748b',
                marginBottom: '0.5rem'
              }}>Número de Grupo</label>
              <input
                type="text"
                name="groupNumber"
                value={letterData.groupNumber}
                onChange={handleChange}
                style={{
                  width: '97.2%',
                  padding: '0.75rem',
                  border: '1px solid #cbd5e1',
                  borderRadius: '0.5rem',
                  backgroundColor: '#f8fafc',
                  outline: 'none',
                  boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.5)'
                }}
                required
              />
            </div>

            {/* Course Modality */}
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: '500',
                color: '#64748b',
                marginBottom: '0.5rem'
              }}>Modalidad del Curso</label>
              <select
                name="courseModality"
                value={letterData.courseModality}
                onChange={handleChange}
                style={{
                  width: '99.5%',
                  padding: '0.75rem',
                  border: '1px solid #cbd5e1',
                  borderRadius: '0.5rem',
                  backgroundColor: '#f8fafc',
                  outline: 'none',
                  boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.5)'
                }}
                required
              >
                <option value="" disabled>Selecciona una Modalidad</option>
                <option value="virtual">Virtual</option>
                <option value="highly-virtual">Highly Virtual</option>
                <option value="bi-modal">Bi-Modal</option>
                <option value="low-virtual">Low Virtual</option>
                <option value="in-person">In-Person</option>
              </select>
            </div>

            {/* Assistant Name */}
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: '500',
                color: '#64748b',
                marginBottom: '0.5rem'
              }}>Nombre del/a Asistente del Curso</label>
              <input
                type="text"
                name="assistantName"
                value={letterData.assistantName}
                onChange={handleChange}
                style={{
                  width: '97%',
                  padding: '0.75rem',
                  border: '1px solid #cbd5e1',
                  borderRadius: '0.5rem',
                  backgroundColor: '#f8fafc',
                  outline: 'none',
                  boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.5)'
                }}
                required
              />
            </div>

            {/* Assistant Email */}
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: '500',
                color: '#64748b',
                marginBottom: '0.5rem'
              }}>Correo Electrónico del/a Asistente del Curso</label>
              <input
                type="email"
                name="assistantEmail"
                value={letterData.assistantEmail}
                onChange={handleChange}
                style={{
                  width: '97%',
                  padding: '0.75rem',
                  border: '1px solid #cbd5e1',
                  borderRadius: '0.5rem',
                  backgroundColor: '#f8fafc',
                  outline: 'none',
                  boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.5)'
                }}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              background: 'linear-gradient(to right, #3b82f6, #2563eb)',
              color: '#ffffff',
              padding: '1rem',
              borderRadius: '0.75rem',
              fontWeight: '600',
              fontSize: '1.125rem',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.2s',
              cursor: 'pointer',
              marginTop: '2rem'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            onClick={handleLetterSubmit}
          >
            Generate Letter
          </button>

          <button
            type="submit"
            style={{
              width: '100%',
              background: 'linear-gradient(to right, #3b82f6, #2563eb)',
              color: '#ffffff',
              padding: '1rem',
              borderRadius: '0.75rem',
              fontWeight: '600',
              fontSize: '1.125rem',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.2s',
              cursor: 'pointer',
              marginTop: '2rem'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            onClick={handleLetterSubmitMock}
          >
            Generate Mock Letter
          </button>

          {generateDocx && (
            <DocxGenerator tableData={tableData} letterData={letterData} />
          )}

          {generateMockDocx && (
            <DocxGenerator tableData={mockData.tableData} letterData={mockData.letterData} />
          )}
        </form>
      </div>
    </Card>

  );
};

export default LetterCreation;