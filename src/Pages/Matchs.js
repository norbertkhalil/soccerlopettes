import { useState, useContext, useEffect } from 'react';
import { getOldMatchs } from '../data/data';
import { DataContext } from '../context';
import { Table } from "reactstrap";

export const Matchs = ({ year }) => {

  const contextData = useContext(DataContext);
  const [matchsAnnee, setMatchsAnnee] = useState([])

  useEffect(() => {
    const getData = () => {
      let matchs = []
      let lesMatchs = []
      if (year && year < 2022) {
        matchs = getOldMatchs(year);
      } else {
        if (contextData.annee && contextData.matchs.length) {
          matchs = contextData.matchs
        }
      }
      matchs.forEach(match => {
        let date = new Date(match.matchDate);
        const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        date = date.toLocaleDateString('fr-FR', dateOptions);
        const team1 = match.team1.join(' ').trim();
        const team2 = match.team2.join(' ').trim();
        const texte = match.result === "nul" ? "Match nul: " + team1 + team2 :
          match.result === "1" ? [`Ouinners: ${team1}`, `Lopettes: ${team2}`] :
            [`Ouinners: ${team2}`, `Lopettes: ${team1}`];
        lesMatchs.push({ date, texte });
      })
      setMatchsAnnee(lesMatchs)
    }
    getData()
  }, [contextData, year])

  return (
    <div className="Matchs">
      <div className="Titre">The matchs de la saison </div>
      <Table>
        <thead>
          <th>Date</th>
          <th>Résultats</th>
        </thead>
        <tbody>
          {matchsAnnee.map((match, index) =>
            <tr key={index}>
              <td>{match.date}</td>
              <td>{typeof match.texte === "string" ? match.texte : match.texte.map(item => <div>{item}</div>)}</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}