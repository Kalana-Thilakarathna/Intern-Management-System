import axios from "axios";
import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import Table from 'react-bootstrap/Table';

function C_list({coordinatorsData}) {
  let maxPage = 4;
  let minPage = 0;
  const [coordinators, setCoordinator] = useState([]);

  const [maxpagestate, setMaxPage] = useState(maxPage);
  const [minpagestate, setMinPage] = useState(minPage);

  const handleloardingforward = () => (
    setMaxPage(maxpagestate + maxPage), setMinPage(maxpagestate)
  );

  const handleloardingback = () => (
    setMinPage(minpagestate - maxPage), setMaxPage(minpagestate)
  );

  

  useEffect(function () {
    setCoordinator(coordinatorsData);
  }, [coordinatorsData]);

  return (
    <Container>
      <Row>
        <div>
          
          <Table>
            <tr>
              <th>Name</th>
              <th>Email</th>
            </tr>
            {coordinators &&
              coordinators.slice(minpagestate, maxpagestate)?.map((coordinator) => (
                <tr key={coordinator._id}>
                  <td>
                    <Link to={`/single_coordinator/${coordinator.userName}`}>
                      {coordinator.userName}
                    </Link>
                  </td>
                  <td>{coordinator.email}</td>
                </tr>
              ))}
          </Table>
        </div>
      </Row>
      <Row>
        <Col xs={3}></Col>
        <Col xs={3}>
          <div>
            <button
              type="submit"
              className="bg-yellow-300 submit_button"
              onClick={handleloardingback}
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
              onClick={handleloardingforward}
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

export default C_list;
