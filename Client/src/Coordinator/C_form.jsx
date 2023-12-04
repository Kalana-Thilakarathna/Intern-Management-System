import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import { Col, Row } from "react-bootstrap";
import "./Coo_ad.css";
import axios from "axios";

function C_form() {
  const [formData, setFormData] = useState({
    indexNo: "",
    userName: "",
    password: "",
    role: "Admin",
    email: "",
    
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    

    try{
      const response = await axios.post('/admin/Coordinators/Insert',formData);
      console.log(response.data);
      
    }catch(error){
      console.log(error);
    }
    setFormData({
      indexNo: "",
      userName: "",
      password: "",
      role: "Admin",
      email: "",
    });
  };

  return (
    <Container className="pl-0 ">
      <Row>
        <Col>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-5" controlId="formGroupuserName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name"
                className="input_ele"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mt-5" controlId="formGroupindexNo">
              <Form.Label>ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="ID"
                className="input_ele"
                name="indexNo"
                value={formData.indexNo}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mt-5" controlId="formGroupEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                className="input_ele"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="my-5" controlId="formGroupPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                className="input_ele"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </Form.Group>

            
            <button type="submit" className="bg-yellow-300 submit_button">
              Insert
            </button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default C_form;
