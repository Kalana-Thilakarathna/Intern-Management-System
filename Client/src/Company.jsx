import React, { useState, useEffect } from "react";
import "./company.css";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "./Common/Footer";
import Header from "./Common/Header";
import { Container } from "react-bootstrap";
import { Tab } from "react-bootstrap";
import { Tabs } from "react-bootstrap";
import { Col, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import CompanyCv from "./Company/CompanyCv";
import CompanyProfile from "./Company/CompanyProfile";
import RequireAuth from "./requireAuth";
import axios from "axios";

function Company() {
  const { userName } = useParams();

  const navigate = useNavigate();
  const [jobs, setJobs] = useState([
    { id: 1, description: "Intern Software Developer" },
  ]);
  const [jobCounter, setJobCounter] = useState(2);
  const [selectedJob, setSelectedJob] = useState(null);

  function HandleLogout() {
    navigate("/");
  }

  //Insert jobs to the database
  async function insertJobsToDB(jobDescription) {
    try {
      const response = await axios.post(`/company/${userName}`, {
        vacancies: jobDescription,
      });
    } catch (err) {
      console.log(err);
    }
  }

  const handleAddJob = async () => {
    const jobDescription = document.getElementById("inputjob").value;
    if (jobDescription) {
      const newJob = {
        id: jobs.length > 0 ? jobs[jobs.length - 1].id + 1 : 1,
        description: jobDescription,
      };
      setJobs([...jobs, newJob]);
      setJobCounter(jobCounter + 1);
      await insertJobsToDB(jobDescription);
      fetchData();
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

  function handleAddJobFromResponse(jobFromRsponse) {
    const newJobs = jobFromRsponse.map((job, index) => ({
      id: index + 1, // Adjust the id based on your logic
      description: job,
    }));

    setJobs(newJobs);
  }

  //fetch data from the server to display the vacancies
  const fetchData = async () => {
    try {
      const response = await axios.get(`/company/${userName}`);
      console.log(response.data.vacancies);
      handleAddJobFromResponse(response.data.vacancies);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [key, setKey] = useState("Profile");

  return (
    <div>
      <Header />
      <div>
        <Container className="bg-red-800 p-3 my-20">
          <Tabs
            id="fill-tab-example"
            activeKey={key}
            onSelect={(k) => {
              setKey(k);
            }}
            className="tabback"
          >
            <Tab
              eventKey="Posts"
              title={
                <span style={{ color: "#800000", fontWeight: "bold" }}>
                  Post
                </span>
              }
              className="bg-w"
            >
              <Container className="bg-zinc-50 p-2" id="cont">
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
                <Button className="B2" onClick={handleRemoveJob}>
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
                      <tr
                        key={job.id}
                        onClick={() => handleJobSelection(job)}
                        className={
                          selectedJob && selectedJob.id === job.id
                            ? "selected"
                            : ""
                        }
                      >
                        <td>#{job.id}</td>
                        <td>{job.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Container>
            </Tab>
            <Tab
              eventKey="ReceivedCVs"
              title={
                <span style={{ color: "#800000", fontWeight: "bold" }}>
                  Received CVs
                </span>
              }
              className="bg-w"
            >
              <CompanyCv />
            </Tab>
            <Tab
              eventKey="Profile"
              title={
                <span style={{ color: "#800000", fontWeight: "bold" }}>
                  Profile
                </span>
              }
              className="bg-w"
            >
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
