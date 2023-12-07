import React,{useState, useEffect} from "react";
import { Container } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import S_form from "./S_form";
import Student_list from "./Student_list";


function Student({studentData, fetchStudentData}) {

  //12/6 getting data from S_form.jsx
 
  const [datafromSForm, setDatafromSForm] = useState(null);
  const [allstudentData, setAllstudentData] = useState(studentData);
  



 

  const handleDatafromSForm = async() => {
    fetchStudentData();
  };

  return (
    <Container>
      <Row>
        <Col xs={8}>
          <Card style={{ height: '44rem' }} className="mt-3">
            <Card.Header className="bg-red-800 text-white font-bold" >student list</Card.Header>
            <Card.Body>
              <Student_list studentData={studentData} />
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card style={{ height: '44rem' }} className="m-3">
            <Card.Header className="bg-red-800 text-white font-bold" >Student Adding</Card.Header>
            <Card.Body>
              <Card.Text>
                <S_form executeParentFunction = {handleDatafromSForm}/>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Student;
