

export const classer = (matchs) => {
    let players = getAllPlayers(matchs);

    const orderedMatches = matchs.sort((a, b) => a.matchDate < b.matchDate ? 1 : -1)
    orderedMatches.forEach(match => {
        if (match.result === "nul") {
            addInfo(match.team1, players, 'nul');
            addInfo(match.team2, players, 'nul');
        }
        if (match.result === "1") {
            addInfo(match.team1, players, 'win');
            addInfo(match.team2, players, 'loose');
        }
        if (match.result === "2") {
            addInfo(match.team2, players, 'win');
            addInfo(match.team1, players, 'loose');
        }

    })
    players.forEach(player => {
        player.absent = matchs.length - player.joue;
        player.points = player.win * 2 + player.nul;
        player.percJoue = Math.round(((player.joue / matchs.length) * 100) * 10) / 10;
        player.percWin = Math.round(((player.win / player.joue) * 100) * 10) / 10;
        player.percNul = Math.round(((player.nul / player.joue) * 100) * 10) / 10
        player.percLoose = Math.round(((player.loose / player.joue) * 100) * 10) / 10;
        player.tauxLopette = 1.5 + 100 * ((player.loose + (0.5 * player.nul) - (0.08 * player.win) + (0.25 * player.absent)) / matchs.length);
        player.tauxLopette = Math.round(player.tauxLopette * 10) / 10;
        /* 
        Taux =1.5+ 100((nbP + 0.5nbN - 0.08XnbG + 0.25nbA)/(nbJ + nbA))	 	 
        nb	nombre de...	 P	matches perdus	 N	matches nuls	 
        G	matches gagnés	 A	matches absents	 J	matches joués
        */
    });
    players = players.sort(ordonnerClassement);

    return players;
}
const ordonnerClassement = (a, b) => {
    if (a.tauxLopette > b.tauxLopette) return -1;
    if (a.tauxLopette < b.tauxLopette) return 1;
    if (a.percLoose > b.percLoose) return -1;
    if (a.percLoose < b.percLoose) return 1;
    if (a.points > b.points) return 1;
    if (a.points < b.points) return -1;
    if (a.percWin > b.percWin) return 1;
    if (a.percWin < b.percWin) return -1;
    if (a.name > b.name) return 1;
    if (a.name < b.name) return -1;
}
const addInfo = (team, players, result) => {
    team.forEach(player => {
        const foundIndex = players.findIndex(item => item.name === player);
        if (foundIndex !== -1) {
            players[foundIndex].joue = players[foundIndex].joue + 1;
            players[foundIndex][result] = players[foundIndex][result] + 1;
        }
    })
}
const getAllPlayers = (matchs) => {
    let players = [];
    matchs.forEach(match => {
        addPlayer(match.team1, players);
        addPlayer(match.team2, players);
    })
    const newPlayers = players.map(player => ({ name: player, win: 0, loose: 0, nul: 0, joue: 0, absent: 0 }));
    return (newPlayers)
}
const addPlayer = (team, players) => {
    team.forEach(player => {
        if (player && !players.includes(player)) {
            players.push(player);
        }
    })
}