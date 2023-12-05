import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Student.css";
import Header from "./Common/Header";
import Footer from "./Common/Footer";
import { Col, Container, Row } from "react-bootstrap";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Profile from "./Studentnew/Profile";
import Vacancies from "./Studentnew/Vacancies";

function Student() {
  const navigate = useNavigate();

  function HandleLogout() {
    navigate("/");
  }

  //12/5 -set tab navigation and root tab is profile
  const [key, setKey] = useState("Profile");

  return (
    <div>
      <Header />
      <div>
        <Container className="bg-red-800 p-3 my-20">
          <Tabs
            id="student-tab"
            activeKey={key}
            onSelect={(k) => {
              setKey(k);
            }}
            className="tabback"
          >
            <Tab eventKey="Profile" title={<span style={{ color: '#800000', fontWeight: 'bold' }}>Profile</span>} className="bg-w">
              <Profile />
            </Tab>
            <Tab eventKey="Vacavcies" title={<span style={{ color: '#800000', fontWeight: 'bold' }}>Vacancies</span>} className="bg-w">
              <Vacancies />
            </Tab>
          </Tabs>
        </Container>
      </div>

      <Footer />
    </div>
  );
}

export default Student;
