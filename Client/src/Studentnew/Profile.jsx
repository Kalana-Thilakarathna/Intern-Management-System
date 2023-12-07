import React, { useEffect, useState } from 'react';
import { Container, Form } from 'react-bootstrap';
import './student.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Profile() {
  const { userName } = useParams();
  const [studentData, setStudentData] = useState({
    indexNo: "",
    userName: "",
    department: "",
    batch: "",
    email: "",
  });

  useEffect(() => {
    axios
      .get(`/student/${userName}`)
      .then((response) => {
        setStudentData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching student data:', error);
      });
  }, [userName]);

  return (
    <Container className="bg-zinc-50">
      <Form className="mainF">
        <Form.Group className="protext">
          <Form.Label className="procon">Name</Form.Label>
          <Form.Control
            className="probox"
            type="text"
            placeholder=""
            name='userName'
            value={studentData.userName}
            readOnly
          />
        </Form.Group>

        <Form.Group className="protext">
          <Form.Label className="procon">Email Address</Form.Label>
          <Form.Control
            className="probox"
            type="email"
            placeholder=""
            name='email'
            value={studentData.email}
            readOnly
          />
        </Form.Group>

        <Form.Group className="protext">
          <Form.Label className="procon">Index Number</Form.Label>
          <Form.Control
            className="probox"
            type="text"
            placeholder=""
            name='indexNo'
            value={studentData.indexNo}
            readOnly
          />
        </Form.Group>

        <Form.Group className="protext">
          <Form.Label className="procon ">Department</Form.Label>
          <Form.Control
            className="probox"
            type="text"
            placeholder=""
            name='department'
            value={studentData.department}
            readOnly
          />
        </Form.Group>

        <Form.Group className="protext">
          <Form.Label className="procon">Batch</Form.Label>
          <Form.Control
            className="probox"
            type="text"
            placeholder=""
            name='batch'
            value={studentData.batch}
            readOnly
          />
        </Form.Group>
      </Form>
    </Container>
  );
}

export default Profile;
