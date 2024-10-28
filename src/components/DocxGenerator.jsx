import React from 'react';
import { Document, Packer, Paragraph, Table, TableCell, TableRow } from 'docx';
import { saveAs } from 'file-saver';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';

const DocxGenerator = ({ tableData, letterData }) => {

  function convertToOOXML(tableData) {
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

  const generateDocx = async () => {
    try {
      const ooxmlTable = convertToOOXML(tableData.evaluationTable);
      const response = await fetch('/docx_templates/template.docx');
      if (!response.ok) throw new Error('Network response was not ok');

      const arrayBuffer = await response.arrayBuffer();
      const zip = new PizZip(arrayBuffer);
      const doc = new Docxtemplater(zip, { paragraphLoop: true, linebreaks: true });

      // Prepare the document sections
      doc.render({
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
        classDay: letterData.classDay,
        classStartTime: letterData.classStartTime,
        classEndTime: letterData.classEndTime,
        classroom: letterData.classroom,
        methodology: letterData.methodology,
        evaluation: letterData.evaluation,
        chronogram: letterData.chronogram,
        rawXml: ooxmlTable
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
      className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors"
      onClick={generateDocx}
    >
      Generate DOCX
    </button>
  );
};

export default DocxGenerator;
