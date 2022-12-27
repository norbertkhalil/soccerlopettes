import React, { useContext, useState } from 'react';
import Header from "./Header";
import { Classement } from "./Classement";
import { Matchs } from "./Matchs";
import { Row, Col } from 'reactstrap';
import Select from 'react-select';
import { DataContext } from '../context';

export const Recent = () => {
  const [choisi, setChoisi] = useState(0)

  const contextData = useContext(DataContext);

  const liste = contextData.annees.map(item => ({ value: item, label: item }));
  return (
    <div className="Home">
      <Header />
      <div className="SelectSeason">
        <span className="Title">Saison</span>
        <Select searchable={true} options={liste} value={{ label: choisi, value: choisi }}
          onChange={e => setChoisi(parseInt(e.value, 10))} />
      </div>
      <Row>
        <Col sm={6} xs={12}><Classement year={choisi} /></Col>
        <Col sm={6} xs={12}><Matchs year={choisi} /></Col>
      </Row>
    </div>
  )
}