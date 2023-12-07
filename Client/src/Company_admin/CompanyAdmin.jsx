import React, { useState, useEffect } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./CompanyAdmin.css";
import axios from "axios";

const initialData = [
  { Companyname: "Virtusa", Total_interns: 19, Number_of_vacancies: "2" },
  { Companyname: "99x", Total_interns: 5, Number_of_vacancies: "3" },
  { Companyname: "Google", Total_interns: 2, Number_of_vacancies: "1" },
];

function CompanyAdmin() {
  const [mainTableData, setMainTableData] = useState([]);
  const [pendingCompanies, setPendingCompanies] = useState(initialData);
  const [selectedRows, setSelectedRows] = useState([]);
  const [newCompany, setNewCompany] = useState({
    indexNo: "",
    userName: "",
    password: "",
    role:"Company",
    email: "",
    contactNo: "",
  });

  // function to fetch company data
  const fetchCompanyData = async () => {
    try {
      const response = await axios.get('/admin/Companies');
      setMainTableData(response.data);
    }
    catch (err) {
      console.log(err);
    }
  }
  
  useEffect(function () {

    fetchCompanyData();


  },[]);
  





  const handleRowClick = (index) => {
    const row = pendingCompanies[index];
    setSelectedRows((prevSelectedRows) => [...prevSelectedRows, row]);
  };

  const handleAddButtonClick = () => {
    setMainTableData((prevMainTableData) => [...prevMainTableData, ...selectedRows]);
    setPendingCompanies((prevPendingCompanies) =>
      prevPendingCompanies.filter(
        (company) => !selectedRows.find((selected) => selected === company)
      )
    );
    setSelectedRows([]);
  };

  const handleRemoveButtonClick = (index) => {
    const updatedMainTableData = [...mainTableData];
    updatedMainTableData.splice(index, 1);
    setMainTableData(updatedMainTableData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCompany((prevNewCompany) => ({ ...prevNewCompany, [name]: value }));
  };

  const handleAddCompanySubmit = (e) => {
    e.preventDefault();
    setPendingCompanies((prevPendingCompanies) => [...prevPendingCompanies, newCompany]);
    setNewCompany({ Companyname: "", Total_interns: 0, Number_of_vacancies: "" });
  };

  //function to set values to null after submitting
  function  setNull() {
    setNewCompany({
      indexNo: "",
      userName: "",
      password: "",
      role:"Company",
      email: "",
      contactNo: "",
    });
  }

  // function to handle the submit button click
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/admin/Company/Insert', newCompany);
      setNull();
     fetchCompanyData();
      alert("Company Added Successfully")

    }
    catch (err) {
      console.log(err);
    }
  };

  return (
    <Row>
      <Col>
        <Card className="MainTableCard my-3 ">
          <Card.Header className="bg-red-800 textincard text-white  ">Main Table</Card.Header>
          <Card.Body>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>COMPANY ID</th>
                  <th>COMPANY NAME</th>
                  <th>NUMBER OF VACANCIES AVAILABLE</th>
                  
                </tr>
              </thead>
              <tbody>
                {mainTableData.map((company) => (
                  <tr key={company.indexNo}>
                    <td>{company.indexNo}</td>
                    <td>{company.userName}</td>
                    <td>{company.vacancies.length}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Col>
      <Col>
        <Card className="AddComapnyCard">
          <Card.Header className="bg-red-800 textincard text-white  ">Add Company</Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
            <Form.Group controlId="forName">
                <Form.Label>Company ID</Form.Label>
                <Form.Control
                  className="Textarea"
                  type="text"
                  placeholder="Company ID here"
                  name="indexNo"
                  value={newCompany.indexNo}
                  onChange={handleInputChange}
                  
                />
              </Form.Group>
              <Form.Group controlId="formID">
                <Form.Label className=" label ">Company Name</Form.Label>
                <Form.Control
                className="Textarea"
                  type="text"
                  placeholder="Company name here"
                  name="userName"
                  value={newCompany.userName}
                  onChange={handleInputChange}
                  
                />
              </Form.Group>
              <Form.Group controlId="formEmail">
                <Form.Label className=" label ">Password</Form.Label>
                <Form.Control
                className="Textarea"
                  type="password"
                  placeholder="Your password here"
                  name="password"
                  value={newCompany.password}
                  onChange={handleInputChange}
                  
                />
              </Form.Group>
              <Form.Group controlId="forAddress">
                <Form.Label className=" label ">email</Form.Label>
                <Form.Control
                className="Textarea"
                  type="text"
                  placeholder="Your email here"
                  name="email"
                  value={newCompany.email}
                  onChange={handleInputChange}
                  
                />
              </Form.Group>
              <Form.Group controlId="formContact">
                <Form.Label className=" label ">Contact Number</Form.Label>
                <Form.Control
                className="Textarea"
                  type="text"
                  placeholder="Your contact number here"
                  name="contactNo"
                  value={newCompany.contactNo}
                  onChange={handleInputChange}
                  
                />
              </Form.Group>
              <button  className="Submit-but my-20"type="submit">Submit</button>
            </Form>
          </Card.Body>
          
        </Card>
        
      </Col>
    </Row>
  );
}

export default CompanyAdmin;
