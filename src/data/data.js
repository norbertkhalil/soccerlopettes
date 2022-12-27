//  classements
import c2019 from "./c2019.json"
import c2020 from "./c2020.json"
import c2021 from "./c2021.json"


// matchs
import m2019 from "./m2019.json"
import m2020 from "./m2020.json"
import m2021 from "./m2021.json"

const previousStubData = {
  "2019": { classement: c2019, match: m2019 },
  "2020": { classement: c2020, match: m2020 },
  "2021": { classement: c2021, match: m2021 },
}

export const getJoueurs = async () => {
  return (["Anatole", "Cyril", "David", "Didier", "Didieu", "Enzo", "Fabrice", "Henri",
    "JCHam", "Joseph", "Josselin", "LoloB", "Manu", "Marchoune", "Marine", "Mister", "Nico",
    "Pablo", "Palou", "Patrick", "Raf", "Renaud", "Ronan", "SebastienD", "Stephane", "YMarie",
    "Norbert", "Sam", "Lolotte", "Lena", "Damien", "Killian", "Kelvin", "Anthony", "Dom", "Nico2",
    "Fabite", "Mick", "Elouan", "Thomas", "Mathias", "Victor", "Killian 2", "AmiNico2", "Pacome",
    "Jb", "Melaine", "Mathys", "Merlin", "Thomas2"
  ])
}
export const getOldJoueursClassements = (saison) => {
  return (previousStubData[saison].classement)
}
export const getOldMatchs = (saison) => {
  return (previousStubData[saison].match)
}
