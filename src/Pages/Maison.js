import React from 'react';
import Header from "./Header";
import { Classement } from "./Classement";
import { Matchs } from "./Matchs";
import { Row, Col } from 'reactstrap';

export const Maison = () => {

  return (
    <div className="Home">
      <Header />
      <Row>
        <Col sm={6} xs={12}>
          <Classement />
        </Col>
        <Col sm={6} xs={12}>
          <Matchs />
        </Col>
      </Row>
    </div>
  )
}