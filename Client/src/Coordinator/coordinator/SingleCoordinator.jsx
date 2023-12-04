import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Layout from "../../Common/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import ListGroup from "react-bootstrap/ListGroup";
import "./SingleCoordinator.css";
import Form from "react-bootstrap/Form";

function SingleStudent() {
  const { id } = useParams();
  const [coordinators, setCoordinator] = useState([]);
  const coordinator = coordinators.find(
    (coordinator) => coordinator.name === id
  );

  const [formData, setFormData] = useState({
    name: coordinator?coordinator.name : "",
    ID: coordinator?coordinator.ID :  "",
    email: coordinator?coordinator.email :  "",
    Password: coordinator?coordinator.Password :  "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Form data submitted:", formData);
    setFormData({
      name: "",
      ID: "",
      email: "",
      Password: "",
    });
  };

  useEffect(function () {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => setCoordinator(response.data))
      .then((error) => console.log(error));
  }, []);

  return (
    <div>
      <Layout>
        <Container>
          <Card className="p-3 background_st m-40 ">
            <Row>
              <Col>
                <h1 className="text-yellow-500 font-bold mb-2">
                  coordinator name
                  {/* {coordinator.name}  error cannot read name*/}
                </h1>
              </Col>
              <Col xs={8}></Col>
              <Col className="text-yellow-500 font-bold mb-2">
                {/* this is for maintain the layout */}
              </Col>
            </Row>
            <Row>
              <Col>
                <Card>
                  <Card.Body>
                    <Form>
                      <Form.Group className="mb-3" controlId="formGroupName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder={coordinator.name}
                          className="input_ele"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                        />
                      </Form.Group>

                      <Form.Group className="mt-5" controlId="formGroupID">
                        <Form.Label>ID</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder={coordinator.ID}
                          className="input_ele"
                          name="ID"
                          value={formData.ID}
                          onChange={handleChange}
                        />
                      </Form.Group>

                      <Form.Group
                        className="mt-5"
                        controlId="formGroupEmail"
                      >
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          placeholder={coordinator.email}
                          className="input_ele"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                        />
                      </Form.Group>

                      <Form.Group className="my-5" controlId="formGroupBatch">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Password"
                          className="input_ele"
                          name="Password"
                          value={formData.Password}
                          onChange={handleChange}
                        />
                      </Form.Group>
                      <div className="flex items-center justify-center">
                        <button
                          type="submit"
                          className="bg-yellow-300 submit_button"
                          onClick={handleSubmit}
                        >
                          edit
                        </button>
                      </div>
                    </Form>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Card>
        </Container>
      </Layout>
    </div>
  );
}

export default SingleStudent;
