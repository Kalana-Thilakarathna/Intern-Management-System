import React, { useState } from 'react';
import './company.css';
import { useNavigate } from 'react-router-dom';
import Footer from './Common/Footer';
import Header from './Common/Header';
import { Container } from 'react-bootstrap';
import { Tab } from 'react-bootstrap';
import { Tabs } from 'react-bootstrap';
import { Col, Row } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import CompanyCv from './Company/CompanyCv';
import CompanyProfile from './Company/CompanyProfile';

function Company() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([
    { id: 1, description: 'Intern Software Developer' },
  ]);
  const [jobCounter, setJobCounter] = useState(2);
  const [selectedJob, setSelectedJob] = useState(null);

  function HandleLogout() {
    navigate('/');
  }

  const handleAddJob = () => {
    const jobDescription = document.getElementById('inputjob').value;
    if (jobDescription) {
      const newJob = {
        id: jobCounter,
        description: jobDescription,
      };
      setJobs([...jobs, newJob]);
      setJobCounter(jobCounter + 1);
    }
  };
  const handleRemoveJob = () => {
    if (selectedJob !== null) {
      const updatedJobs = jobs.filter((job) => job.id !== selectedJob.id);
      setJobs(updatedJobs);
      setSelectedJob(null);
    }
  };
  const handleJobSelection = (job) => {
    setSelectedJob(job);
  };

  return (
    <div>
      <Header />
      <div>
        <Container className="bg-red-800 p-3 my-20">
          <Tabs
            defaultActiveKey="profile"
            id="fill-tab-example"
            className="mb-3"
            fill
          >
            <Tab eventKey="Posts" title="Posts">
              <Container className="bg-zinc-50 p-2 my-10" id="cont">
                <Card className="cardA">
                  <Card.Header className="bg-yellow-400 textincard">
                    Company Vacancies and Job Descriptions
                  </Card.Header>
                  <Card.Body className="cardb">
                    <Form.Label htmlFor="job">Enter here</Form.Label>
                    <Form.Control
                      type="job"
                      id="inputjob"
                      aria-describedby="job"
                    />
                  </Card.Body>
                </Card>
                <Button className="B1" onClick={handleAddJob}>
                  ADD
                </Button>
                <Button className="B2" onClick={handleRemoveJob} >
                  Remove
                </Button>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Job ID</th>
                      <th>Job Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jobs.map((job) => (
                      <tr key={job.id}
                      onClick={() => handleJobSelection(job)}
                      className={selectedJob && selectedJob.id === job.id ? 'selected' : ''}>
                        <td>#{job.id}</td>
                        <td>{job.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Container>
            </Tab>
            <Tab eventKey="ReceivedCVs" title="Received CVs" className='mb-3'>
              <CompanyCv />
            </Tab>
            <Tab eventKey="Profile" title="Profile" className='mb-3'>
              <CompanyProfile />
            </Tab>
          </Tabs>
        </Container>
      </div>
      <Footer />
    </div>
  );
}

export default Company;
