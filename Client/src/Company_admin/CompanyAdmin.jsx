import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
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

  return (
    <Row>
      <Col>
        <Card className="C1 mt-3 mb-3 ml-3">
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
                      <button
                      className="B10"
                        onClick={() => handleRemoveButtonClick(index)}
                      >
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
        <Card className="mt-3 me-3 mb-3 ">
          <Card.Header className="bg-red-800 textincard text-white" id = "C2">Pending Companies</Card.Header>
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
                {pendingCompanies.map((val, index) => (
                  <tr key={index} onClick={() => handleRowClick(index)}>
                    <td>{val.Companyname}</td>
                    <td>{val.Total_interns}</td>
                    <td>{val.Number_of_vacancies}</td>
                    <td>
                      <button className="B12">Select</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            {selectedRows.length > 0 && (
              <button className="B11" onClick={handleAddButtonClick}>
                Add Selected Rows
              </button>
            )}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default CompanyAdmin;
