import React, {useState, useEffect} from "react";
import axios from "axios";
import server from "../Global/config"
import Flags from 'country-flag-icons/react/3x2'

// function ShowFlags() {
//     const [games, setGames] = useState([]);
//     useEffect(()=> {
//         const fetchGame = async()=>{
//             const response = await instance.get(`Euro_events`)
//                 setGames(response.data)   
//         }
//         fetchGame()
//     }, [])
//     games.map((game)=>{
//         const eventname = game.eventname
//         return(
//             eventname
//         )
//     })
//     const instance = axios.create({baseURL: server})
//     const playingTeams = eventname.split("-");
//     const home_team = playingTeams[0]
//     const away_team = playingTeams[1]
//     const [gameId, setGameId] = useState()
//     const [homeFlag, setHomeFlag] = useState("AQ")
//     const [awayFlag, setAwayFlag] = useState("AQ")

 function getTeamFlag(team) {

    let countries = {
        "Poland" : "PL", 
        "Albania" : "AL",
        "England" : "GB",
        "Germany" : "DE",
        "France" : "FR",
        "Ukraine":"UA",
        "Romania" : "RO",
        "Switzerland" : "CH",
        "Wales" : "WS",
        "Slovakia" : "SK",
        "Spain" : "ES",
        "Sweden" : "SE",
        "N.Ireland" : "JE",
        "Ireland" : "IE",
        "Russia" : "RU",
        "Belgium" : "BE",
        "Croatia": "HR",
        "Czech Republic" : "CZ",
        "Italy" : "IT",
        "Hungary": "HU",
        "Iceland" : "IS",
        "Portugal": "PT",
        "Turkey" : "TR",
        "Austria" : "AT"


    }

    let flag = 'AQ';

    if (countries.hasOwnProperty(team)) {
        flag = countries[team];
    }
    return flag;
}
console.log(getTeamFlag("Hungary"))
function setTeamFlag(side, team) {
    if (side === 'away') {
        console.log(`setting away flag to ${getTeamFlag(team)}`)
        return(
            getTeamFlag(team)
        )
    } else if (side === 'home') {
        console.log(`setting home flag to ${getTeamFlag(team)}`)
        return(
            getTeamFlag(team)
        )
    }
}
export default setTeamFlag
export {getTeamFlag}





