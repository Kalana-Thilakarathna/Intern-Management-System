import axios from "axios";
import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import "./studentad.css";

function Student_list({ studentData }) {
  let maxPage = 10;
  let minPage = 0;
  const [students, setStudet] = useState([]);

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

  useEffect(() => {
    setStudet(studentData);
  }, [studentData]);

  return (
    <Container>
      <Row className="flex">
        <Col>
          <div className="m-5">
            <Table striped bordered hover>
              <thead>
                <tr className="custom-row">
                  <th>Name</th>
                  <th>State</th>
                </tr>
              </thead>
              <tbody>
                {students &&
                  students
                    .slice(minpagestate, maxpagestate)
                    ?.map((student) => (
                      <tr className="custom-row" key={student._id}>
                        <td>
                          <Link to={`/single_student/${student.userName}`}>
                            {student.userName}
                          </Link>
                        </td>
                        <td>{student.intern_Status}</td>
                      </tr>
                    ))}
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>
      <Row>
        <Col xs={3}></Col>
        <Col xs={3}>
          <div>
            <button
              type="submit"
              className="bg-yellow-300 submit_button"
              onClick={handleLoadingBack}
            >
              Back Page
            </button>
          </div>
        </Col>
        <Col xs={3}>
          <div>
            <button
              type="submit"
              className="bg-yellow-300 submit_button"
              onClick={handleLoadingForward}
            >
              Next Page
            </button>
          </div>
        </Col>
        <Col xs={3}></Col>
      </Row>
    </Container>
  );
}

export default Student_list;
