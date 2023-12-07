import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import './student.css';

function Profile() {
  const [file, setFile] = useState(null);

  // Dummy data, replace this with actual data from another interface
  const userData = {
    name: '',
    email: '',
    Registration_Number: '',
    department: '',
    specializedSubject: '',
  };

  

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here, including the file data (if needed)
    console.log('Form submitted!', file);
  };

  return (
    <Container className="bg-zinc-50">
      <Form className="mainF" onSubmit={handleSubmit}>
        <Form.Group className="protext">
          <Form.Label className="procon">Name</Form.Label>
          <Form.Control
            className="probox"
            type="text"
            placeholder=""
            defaultValue={userData.name}
            readOnly
          />
        </Form.Group>

        <Form.Group className="protext">
          <Form.Label className="procon">Email Address</Form.Label>
          <Form.Control
            className="probox"
            type="email"
            placeholder=""
            defaultValue={userData.email}
            readOnly
          />
        </Form.Group>

        <Form.Group className="protext">
          <Form.Label className="procon">Registration Number</Form.Label>
          <Form.Control
            className="probox"
            type="text"
            placeholder=""
            defaultValue={userData.Registration_Number}
            readOnly
          />
        </Form.Group>

        <Form.Group className="protext">
          <Form.Label className="procon ">Department</Form.Label>
          <Form.Control
            className="probox"
            type="text"
            placeholder=""
            defaultValue={userData.department}
            readOnly
          />
        </Form.Group>

        <Form.Group className="protext">
          <Form.Label className="procon">Specialized Subject Area</Form.Label>
          <Form.Control
            className="probox"
            type="text"
            placeholder=""
            defaultValue={userData.specializedSubject}
            readOnly
          />
        </Form.Group>
      </Form>
    </Container>
  );
}

export default Profile;
