import React, { useState, useContext, useEffect } from 'react';
import Header from "./Header";
import { Row, Col, Button, Form, FormGroup, Label, Input } from "reactstrap";
import Select from 'react-select';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { addJoueur, addMatch, nouvelleSaison } from '../database/database';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { DataContext } from '../context';


const dernierVendredi = () => {
  let dernierV = new Date();
  while (dernierV.getDay() !== 5) {
    dernierV.setDate(dernierV.getDate() - 1);
  }
  return dernierV.toISOString().substr(0, 10);
}
const defaultTeam = Array(5).fill("");


export const Saisie = (props) => {

  const [resultat, setResultat] = useState({ team1: defaultTeam, team2: defaultTeam, result: "", matchDate: dernierVendredi() })
  const [newPlayer, setNewPlayer] = useState(false)
  const [checkPassword, setCheckPassword] = useState(true)
  const [password, setPassword] = useState("");
  const [joueurs, setJoueurs] = useState([]);
  const [error, setError] = useState("")

  const contextData = useContext(DataContext);
  const joueursSaved = contextData.lopettes;

  useEffect(() => {
    const newJoueurs = [...joueursSaved].sort((a, b) => a > b ? 1 : -1)
    setJoueurs(newJoueurs)
  }, [joueursSaved])
  useEffect(() => {
    changeDate(resultat.matchDate)
  }, [])

  const filteredList = () => {
    let joueursLeft = [...joueurs];
    const { team1, team2 } = resultat;
    if (team1) { joueursLeft = joueursLeft.filter(joueur => !team1.some(j1 => j1 === joueur)) }
    if (team2) { joueursLeft = joueursLeft.filter(joueur => !team2.some(j1 => j1 === joueur)) }
    return joueursLeft
  }

  const onChange = (choice, index, field) => {
    let newTeam = [...resultat[field]];
    newTeam[index] = choice ? choice.value : '';
    if (field === "team1") { setResultat({ ...resultat, team1: newTeam }); }
    else { setResultat({ ...resultat, team2: newTeam }); }
  };
  const ajouterJoueur = (field) => {
    const newState = JSON.parse(JSON.stringify(resultat));
    newState[field][resultat[field].length] = '';
    setResultat(newState);
  }
  const DisplayTeam = (team, field, label) => {
    const lopettes = filteredList();
    const liste = lopettes.map(item => ({ value: item, label: item }));
    return (
      <Col xs="6">
        <FormGroup>
          <Label className="required">{label}</Label>
          {team.map((joueur, index) =>
            <Select key={index} value={{ label: joueur, value: joueur }} placeholder={`Lopette ${index + 1}`}
              searchable={true} clearable={true} options={liste} onChange={e => onChange(e, index, field)} />
          )}
          <div className="addOne" onClick={() => ajouterJoueur(field)}>Ajouter un joueur supplémentaire au match</div>
        </FormGroup>
      </Col>)
  }
  const changeResultat = (event) => setResultat({ ...resultat, result: event.currentTarget.value });
  const changeDate = (newDate) => {
    const matchFound = contextData.matchs.find(match => match.matchDate === newDate);
    if (matchFound) {
      const { team1, team2, result, matchDate } = matchFound
      setResultat({ team1, team2, result, matchDate })
    } else {
      setResultat({ team1: defaultTeam, team2: defaultTeam, result: "", matchDate: newDate });
    }
  }

  const addLopette = async () => {
    const name = newPlayer;
    if (joueurs.includes(name)) { toast("Nom déjà présent trouve un autre nom"); }
    const result = await addJoueur(name)
    if (result) {
      setJoueurs([...joueurs, name])
    }

  }
  const sendResult = async () => {
    const { team1, team2, result, matchDate } = resultat;
    // const token = localStorage.getItem('lopette-token');
    const resultInfo = { team1: team1, team2: team2, result, matchDate };
    if (team1.length < 5 || team2.length < 5 || !result || !matchDate) {
      toast.error("Il manque des données pour envoyer la sauce")
      return
    }
    const answer = await addMatch(resultInfo, contextData.annee);
    if (answer) {
      toast.success("C'est dans la boîte!");
      //Inform daddy that data needs to be updated
      props.updateData();
    } else {
      toast.error("Gros soucy ça a pas marché")
    }
  }
  const startNewSeason = () => {
    const year = new Date().getFullYear();
    confirmAlert({
      title: 'Une saison de plus',
      message: `C'est bien le démarrage de la saison ${year}/${year + 1} ?`,
      buttons: [{ label: 'Voui!', onClick: () => sendNewSeason(year) }]
    });
  }
  const sendLogin = async () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, "norbertkhalil@gmail.com", password)
      .then((userCredential) => {
        setCheckPassword(false)
        setError("")
      })
      .catch(() => {
        setError(" Nope ça ne marche pas, essaie encore")
      });
  }

  const sendNewSeason = async (year) => {
    const result = await nouvelleSaison();
    if (result) { toast(`C'est parti pour la saison ${year}/${year + 1}!`); }
  }

  const { team1, team2, result, matchDate } = resultat;
  return (
    <div className="Saisie">
      <Header />
      <ToastContainer />
      {!checkPassword && <Form className="Equipes">
        <Row >
          <Col xs="6">
            <Label>Jour du match</Label>
            <Input type="date" value={matchDate} onChange={e => changeDate(e.currentTarget.value)} />
          </Col>
          <Col xs="6">
            <FormGroup tag="fieldset" >
              <Label>Resultats</Label>
              <FormGroup check>
                <Input type="radio" value="nul" checked={result === "nul"} onChange={changeResultat} />
                Match Nul
              </FormGroup>
              <FormGroup check>
                <Input type="radio" value="1" checked={result === "1"} onChange={changeResultat} />
                Ouinner Equipe1
              </FormGroup>
              <FormGroup check disabled>
                <Input type="radio" value="2" checked={result === "2"} onChange={changeResultat} />
                Ouinner Equipe2
              </FormGroup>
            </FormGroup>
          </Col>
        </Row>
        <Row >
          {DisplayTeam(team1, "team1", "Equipe1")}
          {DisplayTeam(team2, "team2", "Equipe2")}
        </Row>

        {resultat && <Button className="send" onClick={() => sendResult()}>Envoi la sauce</Button>}
        <hr />
        <Row >
          <Col xs="6" className="AddPlayer" onClick={() => setNewPlayer("")}>
            Nouvelle Lopette ?
            {newPlayer !== false && <div>
              <Input type="text" placeholder="Nom lopette" value={newPlayer} className="newlopette"
                onChange={e => setNewPlayer(e.target.value)} />
              <Button onClick={() => addLopette()}>Ajouter</Button>
            </div>}
          </Col>
          <Col xs="6" className="AddPlayer" onClick={() => startNewSeason()}>Nouvelle Saison ?</Col>
        </Row>
      </Form>}
      {checkPassword && <div >
        <div className="Title">Le mot magique pour entrer dans la caverne: </div>
        <input type="password" onChange={e => setPassword(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter") sendLogin() }} />
        {!!error && <div style={{ color: "red" }}>{error}</div>}
        <Button onClick={() => sendLogin()}>Go</Button>
      </div>}
    </div>
  )
}