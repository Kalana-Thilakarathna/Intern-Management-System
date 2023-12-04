import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Layout from "../../Common/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import ListGroup from "react-bootstrap/ListGroup";
import "./SingleStudent.css";
import Form from "react-bootstrap/Form";

function SingleStudent() {
  const { id } = useParams();
  const [students, setStudets] = useState([]);
  //const student = students.find((student) => student.name === id);
  const [wishes,setWishes] = useState([]);

  //12/3 Fetching data from the server for a signle student
  useEffect( () => {
    const fetchData = async () => {
    
    try{
      const response = await axios.get(`/admin/Students/${id}`);
      setStudets(response.data);
    }catch(err){
      console.log(err)
    }
    }
    fetchData();


  },[id])
  

  

  /*
  useEffect(function (){
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => setWishes(response.data))
      .then(((error) => console.log(error)))
  })
  */

  const [formData, setFormData] = useState({
    name: "",
    index: "",
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
/*
  useEffect(function () {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => setStudets(response.data))
      .then((error) => console.log(error));
  }, []);
  */

  const pngUrl = "http://localhost:5173/ICT_Sem_TimeTable.pdf";

  const downloadPDF = (url) => {
    const fileName = url.split("/").pop();
    const aTag = document.createElement("a");
    aTag.href = url;
    aTag.setAttribute("download", fileName);
    document.body.appendChild(aTag);
    aTag.click();
    aTag.remove();
  };

  return (
    <div>
      <Layout>
        <Container>
          <Card className="p-3 background_st m-5">
            <Row>
              <Col>
                <h1 className="text-yellow-500 font-bold mb-2">
                  Student Details
                  {/* {student.name}  error cannot read name*/}
                </h1>
              </Col>
              <Col xs={8}></Col>
              <Col className="text-yellow-500 font-bold mb-2">
                state
                {/* state should be replace by this {student.name} */}
              </Col>
            </Row>
            <Row>
              <Col>
                <Card style={{ height: '38rem' }}>
                  <Card.Body>
                    <Form>
                      <Form.Group className="mb-5" controlId="formGroupName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Name"
                          className="input_ele"
                          name="name"
                          value={students.userName}
                          onChange={handleChange}
                        />
                      </Form.Group>

                      <Form.Group className="mt-5" controlId="formGroupIndex">
                        <Form.Label>Index</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Index"
                          className="input_ele"
                          name="index"
                          value={students.indexNo}
                          onChange={handleChange}
                        />
                      </Form.Group>

                      <Form.Group
                        className="mt-5"
                        controlId="formGroupDepartment"
                      >
                        <Form.Label>Department</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Department"
                          className="input_ele"
                          name="department"
                          value={students.department}
                          onChange={handleChange}
                        />
                      </Form.Group>

                      <Form.Group className="my-5" controlId="formGroupBatch">
                        <Form.Label>Batch</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Batch"
                          className="input_ele"
                          name="batch"
                          value={students.batch}
                          onChange={handleChange}
                        />
                      </Form.Group>

                      <Form.Group className="my-5" controlId="formGroupEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Email"
                          className="input_ele"
                          name="email"
                          value={students.email}
                          onChange={handleChange}
                        />
                      </Form.Group>

                      
                      <button className="bg-yellow-300 submit_button"
                        onClick={() => {
                          downloadPDF(pngUrl);
                        }}
                      >
                        Download CV
                      </button>
                      <div className="flex items-center justify-center">
                        <button
                          type="submit"
                          className="bg-yellow-300 submit_button"
                          // onClick={} need to create the onClick event
                        >
                          Update
                        </button>
                      </div>
                    </Form>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card  style={{ height: '38rem' }}>
                  <Card.Header>Wish List</Card.Header>
                  <Card.Body>
                    <ListGroup>
                      <ListGroup.Item>Cras justo odio</ListGroup.Item>
                      <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                      <ListGroup.Item>Morbi leo risus</ListGroup.Item>
                      <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
                      <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                    </ListGroup>
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
