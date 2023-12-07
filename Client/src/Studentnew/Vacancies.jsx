import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  Container,
  Row,
  ListGroup,
  Col,
} from "react-bootstrap";
import "./student.css";
import { Link, useParams } from "react-router-dom";
import CheckboxForm from "./Vacancie/CheckboxForm";
import { Form, FormGroup } from "react-bootstrap";

function Vacancies() {
  const {userName} = useParams();

  const [studentData, setStudentData] = useState();
  useEffect(() => {
    axios
      .get(`/student/${userName}`)
      .then((response) => {
        setStudentData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching student data:', error);
      });
  }, [userName]);
  // const [TotalVacancies, setTotalVacancies] = useState([

  // ]);

  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);

  const handleCheckboxChange = (companyName, vacancyLabel) => {
    const isChecked = selectedCheckboxes.some(
      (checkbox) => checkbox.companyName === companyName && checkbox.label === vacancyLabel
    );
  
    if (isChecked) {
      setSelectedCheckboxes((prevCheckboxes) =>
        prevCheckboxes.filter(
          (checkbox) => !(checkbox.companyName === companyName && checkbox.label === vacancyLabel)
        )
      );
    } else {
      setSelectedCheckboxes((prevCheckboxes) => [
        ...prevCheckboxes,
        { companyName, label: vacancyLabel },
      ]);
    }
  
    // console.log("Selected Checkboxes:", selectedCheckboxes);
  };


  const handleSubmit = () => {
    const outputArray = selectedCheckboxes.reduce((result, checkbox) => {
      // Check if the company name already exists in the result array
      const existingCompany = result.find((item) => item[0] === checkbox.companyName);
  
      if (existingCompany) {
        // If the company exists, add the vacancy to its array
        existingCompany[1].push(checkbox.label);
      } else {
        // If the company doesn't exist, create a new entry with the company name and the selected vacancy
        result.push([checkbox.companyName ,[checkbox.label]]);
        
      }
  
      return result;
    }, []);
    outputArray.push(["IndexNo", [studentData.indexNo]]);
    console.log("Output Array:", outputArray);
    alert("Submission Complete")
  }



  

  let maxPage = 10;
  let minPage = 0;

  const [maxpagestate, setMaxPage] = useState(maxPage);
  const [minpagestate, setMinPage] = useState(minPage);

  const handleLoadingForward = () => {
    setMaxPage(maxpagestate + maxPage);
    setMinPage(maxpagestate);
  };

  const handleLoadingBack = () => {
    setMinPage(minpagestate - maxPage);
    setMaxPage(minpagestate);
  };

  //12/5 usestate for vacancies to list down in the ListGroup
  const [Vacancies, setVacancies] = useState([]);

  //12/5 fake api for testin replace with the real one

  //12/5 fetch data from the api
  async function fetchData() {
    const response = await axios.get("/admin/student/Vacancies");
    setVacancies(response.data);
  }

  useEffect(function () {
    fetchData();
  }, []);

  

  return (
    <div className="p-2">
      <Container>
        <Row>
          <Card>
            <CardHeader className="bg-red-800 text-zinc-50 textinmaincard my-3">
              Available Vacancies
            </CardHeader>
            <Card.Body>
              <Row>
                <ListGroup>
                  {Vacancies.slice(minpagestate, maxpagestate)?.map(
                    (vacancie) => (
                      <React.Fragment key={vacancie.indexNo}>
                        <ListGroup.Item>{vacancie.userName}</ListGroup.Item>

                        {vacancie.vacancies.map((availableVacancy) => (
                          <ListGroup.Item key={availableVacancy.id}>
                            <Form.Check
                              type="checkbox"
                              label={availableVacancy}
                              className="mx-3"
                              onChange={() => handleCheckboxChange(vacancie.userName, availableVacancy)}
                              // You can add more props as needed, e.g., onChange, checked, etc.
                            />
                          </ListGroup.Item>
                        ))}
                      </React.Fragment>
                    )
                  )}
                </ListGroup>
              </Row>
              <Row className="align-items-center">
                <Col>
                  <button
                    type="submit"
                    className="bg-yellow-300 submit_button mr-3"
                    onClick={handleLoadingBack}
                  >
                    Back Page
                  </button>

                  <button
                    type="submit"
                    className="bg-yellow-300 submit_button"
                    onClick={handleLoadingForward}
                  >
                    Next Page
                  </button>
                </Col>
              </Row>
              <Row className="flex justify-content-end">
                <Col xs={10} />
                <Col>
                  <button
                    type="submit"
                    className="bg-yellow-300 submit_red mt-4"
                    onClick={handleSubmit}

                  >
                    Submit
                  </button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Row>
      </Container>
    </div>
  );
}

export default Vacancies;
