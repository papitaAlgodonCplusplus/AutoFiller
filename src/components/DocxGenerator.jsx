import React from 'react';
import { saveAs } from 'file-saver';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
const expressionParser = require("docxtemplater/expressions.js");

const DocxGenerator = ({ tableData, letterData }) => {

  function convertEvalToOOXML(tableData) {
    let ooxml = `<w:tbl>
        <w:tblPr>
            <w:tblW w:w="5000" w:type="pct"/>
            <w:tblBorders>
                <w:top w:val="single" w:sz="8" w:color="000000"/>
                <w:left w:val="single" w:sz="8" w:color="000000"/>
                <w:bottom w:val="single" w:sz="8" w:color="000000"/>
                <w:right w:val="single" w:sz="8" w:color="000000"/>
                <w:insideH w:val="single" w:sz="8" w:color="000000"/>
                <w:insideV w:val="single" w:sz="8" w:color="000000"/>
            </w:tblBorders>
        </w:tblPr>`;

    ooxml += `
        <w:tr>
            <w:tc>
                <w:tcPr>
                    <w:shd w:val="clear" w:fill="E0FFFF"/>
                </w:tcPr>
                <w:p><w:r><w:t>Criteria</w:t></w:r></w:p>
            </w:tc>
            <w:tc>
                <w:tcPr>
                    <w:shd w:val="clear" w:fill="E0FFFF"/>
                </w:tcPr>
                <w:p><w:r><w:t>Percentage</w:t></w:r></w:p>
            </w:tc>
        </w:tr>`;

    tableData.forEach(row => {
      ooxml += `
            <w:tr>
                <w:tc>
                    <w:p>
                        <w:r>
                            <w:t>${row.criteria}</w:t>
                        </w:r>
                    </w:p>
                </w:tc>
                <w:tc>
                    <w:p>
                        <w:r>
                            <w:t>${row.percentage}%</w:t>
                        </w:r>
                    </w:p>
                </w:tc>
            </w:tr>`;
    });

    ooxml += `</w:tbl>`;

    return ooxml;
  }

  function convertChronogramToOOXML(tableData) {
    let ooxml = `<w:tbl>
          <w:tblPr>
              <w:tblW w:w="5000" w:type="pct"/>
              <w:tblBorders>
                  <w:top w:val="single" w:sz="8" w:color="000000"/>
                  <w:left w:val="single" w:sz="8" w:color="000000"/>
                  <w:bottom w:val="single" w:sz="8" w:color="000000"/>
                  <w:right w:val="single" w:sz="8" w:color="000000"/>
                  <w:insideH w:val="single" w:sz="8" w:color="000000"/>
                  <w:insideV w:val="single" w:sz="8" w:color="000000"/>
              </w:tblBorders>
          </w:tblPr>`;

    ooxml += `
          <w:tr>
              <w:tc>
                  <w:tcPr>
                      <w:shd w:val="clear" w:fill="E0FFFF"/>
                  </w:tcPr>
                  <w:p><w:r><w:t>Activity</w:t></w:r></w:p>
              </w:tc>
              <w:tc>
                  <w:tcPr>
                      <w:shd w:val="clear" w:fill="E0FFFF"/>
                  </w:tcPr>
                  <w:p><w:r><w:t>Week/Date</w:t></w:r></w:p>
              </w:tc>
          </w:tr>`;

    tableData.forEach(row => {
      ooxml += `
          <w:tr>
              <w:tc>
                  <w:p>
                      <w:r>
                          <w:t>${row.week}</w:t>
                      </w:r>
                  </w:p>
              </w:tc>
              <w:tc>
                  <w:p>
                      <w:r>
                          <w:t>${row.topic}</w:t>
                      </w:r>
                  </w:p>
              </w:tc>
          </w:tr>`;
    });

    ooxml += `</w:tbl>`;

    return ooxml;
  }

  const generateDocx = async () => {
    try {
      const ooxmlEvalTable = convertEvalToOOXML(tableData.evaluationTable);
      const ooxmlChronorgamTable = convertChronogramToOOXML(tableData.chronogramTable);
      const response = await fetch('/docx_templates/template2.docx');
      if (!response.ok) throw new Error('Network response was not ok');

      const arrayBuffer = await response.arrayBuffer();
      const zip = new PizZip(arrayBuffer);
      const doc = new Docxtemplater(zip, { parser: expressionParser, paragraphLoop: true, linebreaks: true });
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth() + 1;
      const currentYear = currentDate.getFullYear();

      let semester;
      if (currentMonth >= 2 && currentMonth <= 5) {
        semester = "I";
      } else if (currentMonth >= 6 && currentMonth <= 10) {
        semester = "II";
      } else {
        semester = "III";
      }

      // Prepare the document sections
      doc.render({
        // Consultation slots
        consultationDay1: letterData.consultationDay1,
        consultationStartTime1: letterData.consultationStartTime1,
        consultationEndTime1: letterData.consultationEndTime1,
        consultationMode1: letterData.consultationMode1,
        officeNumber1: letterData.officeNumber1,
        consultationDay2: letterData.consultationDay2,
        consultationStartTime2: letterData.consultationStartTime2,
        consultationEndTime2: letterData.consultationEndTime2,
        consultationMode2: letterData.consultationMode2,
        officeNumber2: letterData.officeNumber2,

        // Class details
        classDay: letterData.classDay,
        classStartTime: letterData.classStartTime,
        classEndTime: letterData.classEndTime,
        classDay2: letterData.classDay2,
        classStartTime2: letterData.classStartTime2,
        classEndTime2: letterData.classEndTime2,
        building: letterData.building,
        classroom: letterData.classroom,

        // Large text fields
        methodology: letterData.methodology,
        evaluation: letterData.evaluation,
        chronogram: letterData.chronogram,

        // General info
        professorName: letterData.professorName,
        professorEmail: letterData.professorEmail,
        groupNumber: letterData.groupNumber,
        courseModality: letterData.courseModality,
        assistantName: letterData.assistantName,
        assistantEmail: letterData.assistantEmail,

        // OOXML tables
        rawEvaluation: ooxmlEvalTable,
        rawChronogram: ooxmlChronorgamTable,

        // Semester and Year
        semester: semester,
        year: currentYear
      });
      const output = doc.getZip().generate({ type: 'blob' });
      saveAs(output, 'generated-letter.docx');
    } catch (error) {
      console.error('Error generating DOCX:', error);
    }
  };

  return (
    <button
      type="button"
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
        marginTop: '1rem'
      }}
      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
      onClick={generateDocx}
    >
      Download Local Copy
    </button>
  );
};

export default DocxGenerator;
