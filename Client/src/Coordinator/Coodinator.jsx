import React from 'react'
import { Container } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import C_form from './C_form';
import C_list from './C_list';

function Coodinator({coordinatorsData}) {
  
  
  return (
    <Container>
      <Row>
        <Col xs={8}>
          <Card style={{ height: '30rem' }}className="m-3">
            <Card.Header className='bg-red-800 text-white font-bold'>Coordinator List</Card.Header>
            <Card.Body>
              <C_list coordinatorsData={coordinatorsData} />
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card style={{ height: '30rem' }} className="m-3">
            <Card.Header className='bg-red-800 text-white font-bold'>Coordinator Adding</Card.Header>
            <Card.Body>
              <Card.Text>
                <C_form />
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Coodinator