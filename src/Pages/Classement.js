import React, { useEffect, useState, useContext } from 'react';
import { Modal, Table } from "reactstrap";
import { Info } from '@mui/icons-material';
import { getOldJoueursClassements } from '../data/data';
import { classer } from '../classify/classify';
import { DataContext } from '../context';

export const Classement = ({ year }) => {
  const [explication, setExplication] = useState(false)
  const [joueursRang, setJoueursRang] = useState([])

  const contextData = useContext(DataContext);

  useEffect(() => {
    const getData = () => {
      if (year && year < 2022) {
        const joueursClassements = getOldJoueursClassements(year);
        setJoueursRang(joueursClassements)
      } else {
        if (contextData.annee && contextData.matchs.length) {
          const joueursClassements = classer(contextData.matchs)
          setJoueursRang(joueursClassements)
        }
      }
    }
    getData()
  }, [contextData, year])

  const checkExtremumTaux = (taux) => {
    const tauxBorne = taux > 100 ? 100 : taux < 0 ? 0 : taux;
    return tauxBorne
  }
  const sizeTable = window.innerWidth <= 550 ? "sm" : "md";
  return (

    <div className="Classement">
      <div className="content">
        <div className="title">Classement après  {contextData.matchs.length} journées </div>
        <Table striped size={sizeTable} >
          <thead><tr><th>Lopette</th>
            <th>J</th><th>G</th><th>N</th><th>P</th><th>Abs</th><th>Pts</th><th>%J</th>
            <th>%G</th><th>%N</th><th>%P</th><th>Taux<Info onClick={() => setExplication(true)} /></th></tr>
          </thead>
          <tbody>
            {joueursRang.map((joueur, index) =>
              <tr key={index}>
                {index === 0 && <td className="grosseLopette">{`${index + 1}) ${joueur.name}`}
                  <img className="Fleche" alt="Fleche" src={require("../assets/fleche.gif")} />
                  <img className="Insulte" alt="Grosse Lopette" src={require("../assets/grosselopette.gif")} />
                </td>}
                {(index !== 0) && <td>{`${index + 1}) ${joueur.name}`}</td>}
                <td>{joueur.joue}</td> <td>{joueur.win}</td> <td>{joueur.nul}</td> <td>{joueur.loose}</td>
                <td>{joueur.absent}</td> <td>{joueur.points}</td> <td>{joueur.percJoue}</td> <td>{joueur.percWin}</td>
                <td>{joueur.percNul}</td> <td>{joueur.percLoose}</td> <td className="red">{checkExtremumTaux(joueur.tauxLopette)}%</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
      <Modal isOpen={explication} toggle={() => setExplication(false)} className="Explication">
        <div className="title" >Le Taux de lopétisation</div>
        Formule magique = Taux =1.5+ 100((nbP + 0.5nbN - 0.08nbG + 0.25nbA)/(nbJ + nbA))	 <br />
        nb	nombre de...	 <br />
        P	matches perdus	 <br />
        N	matches nuls	  <br />
        G	matches gagnés	 <br />
        A	matches absents	  <br />
        J	matches joués <br />
        <div className="title" >Le Classement des lopettes</div>
        Les critères suivants s'appliquent dans l'ordre :<br />
        - Le plus grand taux de lopétisation<br />
        - Le plus grand porcentage de défaites<br />
        - Le plus petit nombre de points<br />
        - Le plus faible pourcentage de victoire<br />
        - L'ordre alphabétique,c'est injuste mais c'est comme ça!<br />
      </Modal>
    </div>
  )
}