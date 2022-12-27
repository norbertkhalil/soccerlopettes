import React from 'react';
import { Link } from "react-router-dom";
import { Home, History, Edit } from '@mui/icons-material';
import elderly from '../assets/elderly.svg';
import Tooltip from '@mui/material/Tooltip';

export default class Header extends React.Component {


  render() {
    return (
      <div className="Header">
        <img className="Lopette" alt="Lopette" src={require("../assets/lopette.gif")} />
        <img className="Ceinture" alt="Ceinture" src={require("../assets/ceinture-mini.jpeg")} />
        <Link to="/" className=" headerButton"><Tooltip title={<span style={{ fontSize: "13px" }}>Accueil</span>}><Home /></Tooltip></Link>
        <Link to="/recent" className="headerButton"><Tooltip title={<span style={{ fontSize: "13px" }}>Historique récent</span>}><History /></Tooltip></Link>
        <Link to="/historique" className="headerButton"><Tooltip title={<span style={{ fontSize: "13px" }}>Historique pour les vieux de la vieille</span>}><img alt="Vieux" src={elderly} /></Tooltip></Link>
        <Link to="/saisie" className="headerButton grey"><Tooltip title={<span style={{ fontSize: "13px" }}>Saisie des scores</span>}><Edit /></Tooltip></Link>
      </div>
    )
  }
}