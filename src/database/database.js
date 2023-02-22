
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../firebase";

export const getSeasons = async () => {
    const docRef = doc(db, "Saisons", "Saisons");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        const saisons = docSnap.data();
        if (saisons?.annee) {
            return saisons.annee.sort((a, b) => a < b ? 1 : -1)
        }
    }
    return true;
}
export const getMatchs = async (annee) => {
    if (annee) {
        const docRef = doc(db, "Matchs", annee);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const matchs = docSnap.data();
            const orderedMatches = Object.keys(matchs).sort().reduce(
                (obj, key) => { obj[key] = matchs[key]; return obj; }, {});
            let storedMatches = []
            for (const [key, values] of Object.entries(orderedMatches)) {
                storedMatches.push({ matchDate: key, ...values })
            }
            return (storedMatches)
        }
    }
    return ([]);
}

export const getLopettes = async () => {
    const docRef = doc(db, "Lopettes", "lopettes");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        const lopettes = docSnap.data();
        if (lopettes?.noms?.length) {
            return lopettes.noms
        }
    }
    return ([]);
}
export const addMatch = async (matchInfo, year) => {
    const { matchDate, result, team1, team2 } = matchInfo
    let dataToStore = {}
    dataToStore[matchDate] = { result, team1, team2 }
    try {
        await setDoc(doc(db, "Matchs", year), dataToStore, { merge: true });
        return true
    } catch (e) {
        return false
    }
}

export const addJoueur = async (nom) => {
    const lopetteRef = doc(db, "Lopettes", "lopettes");
    try {
        await updateDoc(lopetteRef, { noms: arrayUnion(nom) });
        return true
    } catch (e) {
        return false
    }
}
export const nouvelleSaison = async (saisons) => {
    const currentYear = new Date().getFullYear().toString();
    if (!saisons.includes(currentYear)) {
        try {
            await updateDoc(doc(db, "Saisons", "Saisons"), { annee: arrayUnion(currentYear) });
            return true
        } catch (e) {
            return false
        }
    }
    return false
}