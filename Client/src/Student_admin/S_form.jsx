import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import { Col, Row } from "react-bootstrap";
import "./studentad.css";
import axios from "axios";

function S_form({executeParentFunction}) {

 

  


  const [formData, setFormData] = useState({
    indexNo: "",
    userName: "",
    password: "",
    role: "Student",
    department: "",
    batch: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //12/2 Submitting form data to the server
    try {
      const response = await axios.post("/admin/Students/Insert", formData);
      console.log(response.data);
      alert("Student is successfully added")
      executeParentFunction();

    } catch (err) {
      console.log(err);
    }

    //console.log("Form data submitted:", formData);
    setFormData({
      indexNo: "",
      userName: "",
      password: "",
      role: "Student",
      department: "",
      batch: "",
      email: "",
    });
  };

  return (
    <Container className="pl-0 ">
      <Row>
        <Col >
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-5" controlId="formGroupName">
              <Form.Label>Name</Form.Label>
              <Form.Control
              style={{ width: "100px !important" }}
                type="text"
                placeholder="Name without initals"
                className="input_ele"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mt-5" controlId="formGroupIndex">
              <Form.Label>Index</Form.Label>
              <Form.Control
                type="text"
                placeholder="Index ex:ICT/20/948"
                className="input_ele"
                name="indexNo"
                value={formData.indexNo}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mt-5" controlId="formGroupDepartment">
              <Form.Label>Department</Form.Label>
              <Form.Control
                type="text"
                placeholder="Department ex:ICT,EGT,BST"
                className="input_ele"
                name="department"
                value={formData.department}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="my-5" controlId="formGroupBatch">
              <Form.Label>Batch</Form.Label>
              <Form.Control
                type="text"
                placeholder="Batch ex:19/20"
                className="input_ele"
                name="batch"
                value={formData.batch}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="my-5" controlId="formGroupEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email ex:student@gmail.com"
                className="input_ele"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="my-5" controlId="formGroupEmail">
              <Form.Label>password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                className="input_ele"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="my-5" controlId="formGroupExcel">
              <Form.Label>Bulk insertion</Form.Label>
              <Form.Control
                type="file"
                name="excel"
                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                onChange={handleChange}
              />
            </Form.Group>

            <button type="submit" className="bg-yellow-300 submit_button">
              Insert
            </button>
          </Form>
        </Col>
        <Col>
          
          
        </Col>
      </Row>
    </Container>
  );
}

export default S_form;
