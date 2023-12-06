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
import { Link } from "react-router-dom";

function Vacancies() {

  // const [TotalVacancies, setTotalVacancies] = useState([

  // ]);


  

  

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
                      <ListGroup.Item key={vacancie.indexNo}>
                        {/*12/5 vacancie name should change to the company name or id as acording fake endpoint thing*/}
                        <Link to = {`/student/company_vacancies/${vacancie.userName}`}> 
                        {vacancie.userName}
                        </Link>
                        
                      </ListGroup.Item>
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
                <Col xs = {10}/>
              <Col>
                  <button type="submit" className="bg-yellow-300 submit_red mt-4">
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
