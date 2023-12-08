import React, { useState, useEffect } from "react";
import { Container, Card } from "react-bootstrap";
import CheckboxForm from "./CheckboxForm"; //dynamic form
import axios from "axios";
import { useParams } from "react-router-dom";
import Layout from "../../Common/Layout";

const CompanyVacancies = () => {
  const [selectedVacancies, setSelectedVacancies] = useState([]);

  const handleSelectedVacanciesChange = (newSelectedVacancies) => {
    setSelectedVacancies(newSelectedVacancies);
  };

  const { id } = useParams();
  //to set the company's vacancies
  const [companyVacancies, setCompanyVacancies] = useState([]);

  const [companyData, setCompanyData] = useState({
    name: "",
    vacancies: [],
  });

  //12/6 this is a fake api
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        setCompanyVacancies(response.data);

        const companyDetails = response.data;

        setCompanyData({
          name: companyDetails.name,
          vacancies: companyDetails.vacancies, // Assuming the API returns vacancies for each company
        });

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-2">
      <Layout>
        <Container>
          <Card>
            <Card.Header className="bg-red-800 text-zinc-50 textinmaincard mt-3">
              {id} {/*company name */}
            </Card.Header>
            <Card.Body>
              <CheckboxForm Vacancies={companyData.vacancies} />{" "}  
              
              {/* 12/6 pass the companyvacancies to the checkboxForm */}
            </Card.Body>
          </Card>
        </Container>
      </Layout>
    </div>
  );
};

export default CompanyVacancies;
