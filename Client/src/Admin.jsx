import React,{useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Common/Header";
import Footer from "./Common/Footer";
import { Col, Container, Row } from "react-bootstrap";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./admin.css";
import Student from "./Student_admin/Student_ad.jsx";
import Layout from "./Common/Layout";
import axios from "axios";
import Coordinator from "./Coordinator/Coodinator.jsx"
import CompanyAdmin from "./Company_admin/CompanyAdmin.jsx";



function Admin() {
  const navigate = useNavigate();
  function HandleLogout() {
    navigate("/");
  }



//12/2 -STUDENT COMPONENT STARTS HERE

//useState variables to send data to each Student, Company and Coordinator tabs
const [studentData, setStudentData] = React.useState("");
  const [companiesData, setCompaniesData] = React.useState("");
  const [coordinatorsData, setCoordinatorsData] = React.useState("");
  
  

  //12/2 - Fetch data from the database to the home TAB
  const fetchData = async () => {
    try{
      const response = await axios.get("/admin");

      setegt_Student_count(response.data.etCount);
      setict_Student_count(response.data.ictCount);
      setbst_Student_count(response.data.bstCount);
      setaccepted_letter_count(response.data.sentLetters);
      setpending_letter_count(response.data.pendingLetters);
      setID(response.data.userID);
      setName(response.data.userName);
      setactive_internship_count(response.data.active_internships)
      setpending_internship_count(response.data.pending_internships)
      setrejected_internship_count(response.data.rejected_interships)
      setwithout_internship_count(response.data.without_interships)


      
    }
    catch(error){
      console.log(error);
    }
  };


  useEffect(() => {
    
  }, [studentData]);

  useEffect(() => {
      
    }, [coordinatorsData]);

  //12/2 - Fetch data from the database to the Student TAB
  const fetchStudentData = async () => {
    try{
      const response = await axios.get("/admin/Students");

      setStudentData(response.data);
      
    }
    catch(error){
      console.log(error);
    }
  };

  //12/2 - Fetch data from the database to the Coordinator TAB
  const fetchCoordinatorData = async () => {
    try{
      const response = await axios.get("/admin/Coordinators");
      setCoordinatorsData(response.data);
      
    }
    catch(error){
      console.log(error);
    }
  }
  

  




  //12/2 - Send  HTTP request according to the tab selection
  function handleStudentData(selectedTab){

    switch(selectedTab){
      case "Home":
        fetchData();
        break;
      case "Students":
        fetchStudentData();
        break;
      case "Coordinators":
        fetchCoordinatorData();
        break;
      
    }


    
  }
//12/2 -STUDENT COMPONENT ENDS HERE




  const [departmentCounts, setDepartmentCounts] = React.useState({
    ET:0,
    ICT:0,
    BST:0
   });


  //12/2 - Fetch data from the database when the page loads for the first time
   useEffect(() => {
   
    fetchData();
  }
  , []);




  const [key, setKey] = React.useState("Home");
  const [ID, setID] = React.useState("34");
  const [Name, setName] = React.useState("Harshana");
  const [egt_student_count, setegt_Student_count] = React.useState("20");
  const [ict_student_count, setict_Student_count] = React.useState("30");
  const [bst_student_count, setbst_Student_count] = React.useState("60");
  const [internship_count, setinternship_count] = React.useState("50");
  const [offered_internship_count, setoffered_internship_count] =
    React.useState("90");
  const [accepted_letter_count, setaccepted_letter_count] =
    React.useState("100");
  const [pending_letter_count, setpending_letter_count] = React.useState("345");
  const [active_internship_count, setactive_internship_count] =
    React.useState("56");
  const [pending_internship_count, setpending_internship_count] =
    React.useState("34");
  const [rejected_internship_count, setrejected_internship_count] =
    React.useState("65");
  const [without_internship_count, setwithout_internship_count] =
    React.useState("12");

  return (
    <div>
      <Header/>
      <div>
        <Container className="bg-red-800 p-3 my-20">
          <Tabs
            id="dashboard-tabs"
            activeKey={key}
            onSelect={(k) => {
              setKey(k)
              handleStudentData(k)// tab selection is passed to the handleStudentData function to get data according to the tab
            }}
            className=" tabback"
          >
            <div className="tabbodyback"></div>
            <Tab eventKey="Home" title={<span style={{ color: '#800000', fontWeight: 'bold' }}>Home</span>} className="bg-w">
              <div className="p-2">
                <Row className="g-2">
                  <Col md="9">
                    <Card>
                      <Card.Header className="bg-red-800 text-zinc-50 textinmaincard">
                        Summery
                      </Card.Header>
                      <Card.Body>
                        <Row className="g-2">
                          <Col>
                            <Card className>
                              <Card.Header className="bg-yellow-400 textincard">
                                EGT
                              </Card.Header>
                              <Card.Body>
                                <Card.Text>
                                  <p>No of students: {egt_student_count}</p>
                                </Card.Text>
                              </Card.Body>
                            </Card>
                          </Col>
                          <Col>
                            <Card>
                              <Card.Header className="bg-yellow-400 textincard">
                                ICT
                              </Card.Header>
                              <Card.Body>
                                <Card.Text>
                                  <p>No of students: {ict_student_count}</p>
                                </Card.Text>
                              </Card.Body>
                            </Card>
                          </Col>
                          <Col>
                            <Card>
                              <Card.Header className="bg-yellow-400 textincard">
                                BST
                              </Card.Header>
                              <Card.Body>
                                <Card.Text>
                                  <p>No of students: {bst_student_count}</p>
                                </Card.Text>
                              </Card.Body>
                            </Card>
                          </Col>
                        </Row>
                        <p className="card-para">
                          Total No of students:{" "}
                          {parseInt(egt_student_count) +
                            parseInt(ict_student_count) +
                            parseInt(bst_student_count)}
                        </p>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col>
                    <Card className="fixed-height-card-summery">
                      <Card.Header className="bg-red-800  text-zinc-50 textinmaincard decoration-2">
                        Admin Info
                      </Card.Header>
                      <Card.Body>
                        <Table striped bordered hover>
                          <tbody>
                            <tr>
                              <td>ID</td>
                              <td>{ID}</td>
                            </tr>
                            <tr>
                              <td>Name</td>
                              <td>{Name}</td>
                            </tr>
                          </tbody>
                        </Table>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
                <Row className="my-3">
                  <Col>
                    <Card>
                      <Card.Header className="bg-red-800  text-zinc-50 textinmaincard">
                        Intern-Ship Summery
                      </Card.Header>
                      <Card.Body>
                        <Row className="g-2">
                          <Col md="4">
                            <Card className="fixed-height-card-intern">
                              <Card.Header className="bg-yellow-400 textincard">
                                Internship Placement
                              </Card.Header>
                              <Card.Body>
                                <Card.Text className="card-para">
                                  <h7>
                                    Total number of internships:
                                    {internship_count}
                                  </h7>
                                  <br />
                                  <h7>
                                    Offered internships :
                                    {offered_internship_count}{" "}
                                  </h7>
                                </Card.Text>
                              </Card.Body>
                            </Card>
                          </Col>
                          <Col md="3">
                            <Card className="fixed-height-card-intern">
                              <Card.Header className="bg-yellow-400 textincard">
                                Student Respond
                              </Card.Header>
                              <Card.Body>
                                <Card.Text className="card-para">
                                  <h7>
                                    Accepted letters:{accepted_letter_count}
                                  </h7>
                                  <br />
                                  <h7>
                                    pending letters :{pending_letter_count}{" "}
                                  </h7>
                                </Card.Text>
                              </Card.Body>
                            </Card>
                          </Col>
                          <Col>
                            <Card>
                              <Card.Header className="bg-yellow-400 textincard">
                                Internship State
                              </Card.Header>
                              <Card.Body>
                                <Card.Text>
                                  <div className=""></div>
                                  <h7>
                                    No of active internships:
                                    {active_internship_count}
                                  </h7>
                                  <br />
                                  <h7>
                                    Pending internships :{" "}
                                    {pending_internship_count}
                                  </h7>
                                  <br />
                                  <h7>
                                    Rejected internships:
                                    {rejected_internship_count}
                                  </h7>
                                  <br />
                                  <h7>
                                    Without any internships :
                                    {without_internship_count}
                                  </h7>
                                </Card.Text>
                              </Card.Body>
                            </Card>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </div>
            </Tab>

            <Tab eventKey="Students" title={<span style={{ color: '#800000', fontWeight: 'bold' }}>Students</span>} className="bg-w" >
              <Student studentData={studentData} />
            </Tab>
            <Tab eventKey="Companies" title={<span style={{ color: '#800000', fontWeight: 'bold' }}>Companies</span>} className="bg-w">
              <CompanyAdmin/>
            </Tab>
            <Tab eventKey="Coordinators" title={<span style={{ color: '#800000', fontWeight: 'bold' }}>Coordinators</span>} className="bg-w">
              <Coordinator coordinatorsData={coordinatorsData}/>
            </Tab>
          </Tabs>
        </Container>
      </div>
      <Footer/>
    </div>
  );
  
}

export default Admin;
