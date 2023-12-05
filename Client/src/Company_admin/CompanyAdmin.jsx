import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./CompanyAdmin.css";

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
    Companyname: "",
    Total_interns: 0,
    Number_of_vacancies: "",
  });

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

  return (
    <Row>
      <Col>
        <Card className="MainTableCard my-3 ">
          <Card.Header className="bg-red-800 textincard text-white  ">Main Table</Card.Header>
          <Card.Body>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>COMPANY NAME</th>
                  <th>TOTAL INTERNS RECRUITED</th>
                  <th>NUMBER OF VACANCIES AVAILABLE</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {mainTableData.map((val, index) => (
                  <tr key={index}>
                    <td>{val.Companyname}</td>
                    <td>{val.Total_interns}</td>
                    <td>{val.Number_of_vacancies}</td>
                    <td>
                      <button className="B10" onClick={() => handleRemoveButtonClick(index)}>
                        Remove
                      </button>
                    </td>
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
            <Form>
            <Form.Group controlId="forName">
                <Form.Label>Company Name</Form.Label>
                <Form.Control
                  className="Textarea"
                  type="text"
                  placeholder="ATLAS"
                  name="CompanyName"
                  value={newCompany.CompanyEmail}
                  
                />
              </Form.Group>
              <Form.Group controlId="formID">
                <Form.Label className=" label ">Company ID</Form.Label>
                <Form.Control
                className="Textarea"
                  type="text"
                  placeholder="C53"
                  name="CompanyID"
                  value={newCompany.CompanyID}
                  
                />
              </Form.Group>
              <Form.Group controlId="formEmail">
                <Form.Label className=" label ">Email</Form.Label>
                <Form.Control
                className="Textarea"
                  type="text"
                  placeholder="lasanthachulabhaya@gmail.com"
                  name="CompanyEnmail"
                  value={newCompany.CompanyEmail}
                  
                />
              </Form.Group>
              <Form.Group controlId="forAddress">
                <Form.Label className=" label ">Address</Form.Label>
                <Form.Control
                className="Textarea"
                  type="text"
                  placeholder="221B Baker Street London"
                  name="CompanyAddress"
                  value={newCompany.CompanyAddress}
                  
                />
              </Form.Group>
              <Form.Group controlId="formContact">
                <Form.Label className=" label ">Contact Number</Form.Label>
                <Form.Control
                className="Textarea"
                  type="text"
                  placeholder="0000000000"
                  name="Contact_number"
                  value={newCompany.Contact_number}
                  
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
