import React, { useState } from 'react';
import './CompanyCv.css';
import { useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { Tab } from 'react-bootstrap';
import { Tabs } from 'react-bootstrap';
import { Col, Row } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const data = [
  { name: 'Madara', University_name: 'USJ', Job_title: 'Software Developer' },
  { name: 'Sahan', University_name: 'UOK', Job_title: 'Network Engineer' },
  { name: 'Umanda', University_name: 'UOC', Job_title: 'QA' },
];

function CompanyCv() {
  const navigate = useNavigate();
  const [tableData, setTableData] = useState(data);

  const handleDownload = (name) => {
    // Implement download logic for the given name
    console.log(`Downloading CV for ${name}`);
  };

  const handleSendMail = (name) => {
    // Implement send mail logic for the given name
    console.log(`Sending mail to ${name}`);
  };

  const handleDeleteRow = (index) => {
    const updatedData = [...tableData];
    updatedData.splice(index, 1);
    setTableData(updatedData);
  };

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>NAME</th>
            <th>UNIVERSITY NAME</th>
            <th>JOB TITLE</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((val, index) => (
            <tr key={index}>
              <td>{val.name}</td>
              <td>{val.University_name}</td>
              <td>{val.Job_title}</td>
              <td>
                <button className='B3' variant="success" onClick={() => handleDownload(val.name)}>
                  Download
                </button>{' '}
                <button className='B4' variant="primary" onClick={() => handleSendMail(val.name)}>
                  Send Mail
                </button>{' '}
                <button className='B5' variant="danger" onClick={() => handleDeleteRow(index)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default CompanyCv;
