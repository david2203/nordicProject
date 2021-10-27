// import React, {useState, useEffect} from "react";
// import axios from "axios";
// import server from "../Global/config"
// import Flags from 'country-flag-icons/react/3x2'

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

//     useEffect(()=> {
//         const fetchGameId = async()=>{
//             const response = await instance.get(`Euro_events?eid_xml=${event_id}`)
//             setGameId(response.data[0].id)
//         }
//         fetchGameId()
//         if (home_team === "Poland"){
//             setHomeFlag("PL")
//         } 
//         else if (home_team === "Albania") {
//            setHomeFlag("AL");
//         }
//         else if (home_team === "England") {
//             setHomeFlag("GB");
//          }
//          else if (home_team === "Germany") {
//             setHomeFlag("DE");
//          }
//          else if (home_team === "France") {
//             setHomeFlag("FR");
//          }
//          else if (home_team === "Romania") {
//             setHomeFlag("RO");
//          }
//          else if (home_team === "Switzerland") {
//             setHomeFlag("CH");
//          }
//          else if (home_team === "Wales") {
//             setHomeFlag("WS");
//          }
//          else if (home_team === "Slovakia") {
//             setHomeFlag("SK");
//          }
//          else if (home_team === "Spain") {
//             setHomeFlag("ES");
//          }
//          else if (home_team === "Sweden") {
//             setHomeFlag("SE");
//          }
//          else if (home_team === "Ukraine") {
//             setHomeFlag("UA");
//          }
//          else if (home_team === "N.Ireland") {
//             setHomeFlag("JE");
//          }
//          else if (home_team === "Ireland") {
//             setHomeFlag("IE");
//          }
//          else if (home_team === "Russia") {
//             setHomeFlag("RU");
//          }
//          else if (home_team === "Belgium") {
//             setHomeFlag("BE");
//          }
//          else if (home_team === "Croatia") {
//             setHomeFlag("HR");
//          }
//          else if (home_team === "Czech Republic") {
//             setHomeFlag("CZ");
//          }
//          else if (home_team === "Italy") {
//             setHomeFlag("IT");
//          }
//          else if (home_team === "Hungary") {
//             setHomeFlag("HU");
//          }
//          else if (home_team === "Iceland") {
//             setHomeFlag("IS");
//          }
//          else if (home_team === "Portugal") {
//             setHomeFlag("PT");
//          }
//          else if (home_team === "Turkey") {
//             setHomeFlag("TR");
//          }
//          else if (home_team === "Austria") {
//             setHomeFlag("AT");
//          }



//          if (away_team === "Poland"){
//             setAwayFlag("PL")
//         } 
//         else if (away_team === "Albania") {
//            setAwayFlag("AL");
//         }
//         else if (away_team === "England") {
//             setAwayFlag("GB");
//          }
//          else if (away_team === "Germany") {
//             setAwayFlag("DE");
//          }
//          else if (away_team === "France") {
//             setAwayFlag("FR");
//          }
//          else if (away_team === "Romania") {
//             setAwayFlag("RO");
//          }
//          else if (away_team === "Switzerland") {
//             setAwayFlag("CH");
//          }
//          else if (away_team === "Wales") {
//             setAwayFlag("WS");
//          }
//          else if (away_team === "Slovakia") {
//             setAwayFlag("SK");
//          }
//          else if (away_team === "Spain") {
//             setAwayFlag("ES");
//          }
//          else if (away_team === "Sweden") {
//             setAwayFlag("SE");
//          }
//          else if (away_team === "Ukraine") {
//             setAwayFlag("UA");
//          }
//          else if (away_team === "N.Ireland") {
//             setAwayFlag("JE");
//          }
//          else if (away_team === "Ireland") {
//             setAwayFlag("IE");
//          }
//          else if (away_team === "Russia") {
//             setAwayFlag("RU");
//          }
//          else if (away_team === "Belgium") {
//             setAwayFlag("BE");
//          }
//          else if (away_team === "Croatia") {
//             setAwayFlag("HR");
//          }
//          else if (away_team === "Czech Republic") {
//             setAwayFlag("CZ");
//          }
//          else if (away_team === "Italy") {
//             setAwayFlag("IT");
//          }
//          else if (away_team === "Hungary") {
//             setAwayFlag("HU");
//          }
//          else if (away_team === "Iceland") {
//             setAwayFlag("IS");
//          }
//          else if (away_team === "Portugal") {
//             setAwayFlag("PT");
//          }
//          else if (away_team === "Turkey") {
//             setAwayFlag("TR");
//          }
//          else if (away_team === "Austria") {
//             setAwayFlag("AT");
//          }
        
//     }, [])
//     const HomeFlag = Flags[homeFlag]
//     const AwayFlag = Flags[awayFlag]
    
    
//     return (
//         <div>
            
//         </div>
//     )
// }

// export default ShowFlags
