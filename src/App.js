import React, { useState, useEffect } from 'react';
import './App.css';
import { HashRouter as Router, Route, Redirect } from "react-router-dom";
import { Maison } from "./Pages/Maison";
import { Matchs } from "./Pages/Matchs";
import { Classement } from './Pages/Classement';
import { Saisie } from './Pages/Saisie';
import Historique from './Pages/Historique';
import { Recent } from './Pages/Recent';
import { getSeasons, getMatchs, getLopettes } from './database/database';
import { DataContext } from './context';

function App() {
  const [data, setData] = useState({ annee: "", annees: [], lopettes: [], matchs: [] })
  // To know if data needs to be updated
  const [updateData, setUpdateData] = useState(true);


  useEffect(() => {
    const loadData = async () => {
      const annees = await getSeasons()
      const derniereAnnee = annees?.length ? annees[0] : "2022"
      const lopettes = await getLopettes()
      const matchs = await getMatchs(derniereAnnee)
      setData({ annee: derniereAnnee, annees, lopettes, matchs })
    }
    if (updateData) {
      loadData();
      setUpdateData(false)
    }

  }, [updateData])
  const { annee, annees, lopettes, matchs } = data;
  return (
    <div className="App">
      <DataContext.Provider value={{ annees, annee, lopettes, matchs }}>
        <Router >
          <div>
            <Redirect path="*" to="/" />
            <Route exact path="/" component={Maison} />
            <Route exact path="/matchs" component={Matchs} />
            <Route exact path="/saisie" render={() => <Saisie updateData={() => setUpdateData(true)} />} />
            <Route exact path="/classement" component={Classement} />
            <Route exact path="/historique" component={Historique} />
            <Route exact path="/recent" component={Recent} />
          </div>
        </Router>
      </DataContext.Provider>
    </div>
  );
}

export default App;
