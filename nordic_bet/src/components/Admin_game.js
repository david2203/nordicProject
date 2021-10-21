import React, {useState, useEffect} from "react";
import axios from "axios";
import Modal from 'react-modal';
import server from "./config"
import Flags from 'country-flag-icons/react/3x2'

function Game({event_id,eid_xml,eventname,grp,odds_1,odds_x,odds_2,status}) {
    
    const instance = axios.create({baseURL: server})
    const playingTeams = eventname.split("-");
    const home_team = playingTeams[0]
    const away_team = playingTeams[1]
    const [gameId, setGameId] = useState()
    const [gameResult, setGameResult] = useState()
    const [gameName, setGameName] = useState()
    const [betsOnGame, setBetsOnGame] = useState([])
    const [homeFlag, setHomeFlag] = useState("AQ")
    const [awayFlag, setAwayFlag] = useState("AQ")
    const user_id = localStorage.getItem("user_id")
    const token = localStorage.getItem("jwt")
 

    useEffect(()=> {
        const fetchGameId = async()=>{
            const response = await instance.get(`Euro_events?eid_xml=${event_id}`)
            setGameId(response.data[0].id)
            setGameName(response.data[0].eventname)
        }
        fetchGameId()
        if (home_team === "Poland"){
            setHomeFlag("PL")
        } 
        else if (home_team === "Albania") {
           setHomeFlag("AL");
        }
        else if (home_team === "England") {
            setHomeFlag("GB");
         }
         else if (home_team === "Germany") {
            setHomeFlag("DE");
         }
         else if (home_team === "France") {
            setHomeFlag("FR");
         }
         else if (home_team === "Romania") {
            setHomeFlag("RO");
         }
         else if (home_team === "Switzerland") {
            setHomeFlag("CH");
         }
         else if (home_team === "Wales") {
            setHomeFlag("WS");
         }
         else if (home_team === "Slovakia") {
            setHomeFlag("SK");
         }
         else if (home_team === "Spain") {
            setHomeFlag("ES");
         }
         else if (home_team === "Sweden") {
            setHomeFlag("SE");
         }
         else if (home_team === "Ukraine") {
            setHomeFlag("UA");
         }
         else if (home_team === "N.Ireland") {
            setHomeFlag("JE");
         }
         else if (home_team === "Ireland") {
            setHomeFlag("IE");
         }
         else if (home_team === "Russia") {
            setHomeFlag("RU");
         }
         else if (home_team === "Belgium") {
            setHomeFlag("BE");
         }
         else if (home_team === "Croatia") {
            setHomeFlag("HR");
         }
         else if (home_team === "Czech Republic") {
            setHomeFlag("CZ");
         }
         else if (home_team === "Italy") {
            setHomeFlag("IT");
         }
         else if (home_team === "Hungary") {
            setHomeFlag("HU");
         }
         else if (home_team === "Iceland") {
            setHomeFlag("IS");
         }
         else if (home_team === "Portugal") {
            setHomeFlag("PT");
         }
         else if (home_team === "Turkey") {
            setHomeFlag("TR");
         }
         else if (home_team === "Austria") {
            setHomeFlag("AT");
         }



         if (away_team === "Poland"){
            setAwayFlag("PL")
        } 
        else if (away_team === "Albania") {
           setAwayFlag("AL");
        }
        else if (away_team === "England") {
            setAwayFlag("GB");
         }
         else if (away_team === "Germany") {
            setAwayFlag("DE");
         }
         else if (away_team === "France") {
            setAwayFlag("FR");
         }
         else if (away_team === "Romania") {
            setAwayFlag("RO");
         }
         else if (away_team === "Switzerland") {
            setAwayFlag("CH");
         }
         else if (away_team === "Wales") {
            setAwayFlag("WS");
         }
         else if (away_team === "Slovakia") {
            setAwayFlag("SK");
         }
         else if (away_team === "Spain") {
            setAwayFlag("ES");
         }
         else if (away_team === "Sweden") {
            setAwayFlag("SE");
         }
         else if (away_team === "Ukraine") {
            setAwayFlag("UA");
         }
         else if (away_team === "N.Ireland") {
            setAwayFlag("JE");
         }
         else if (away_team === "Ireland") {
            setAwayFlag("IE");
         }
         else if (away_team === "Russia") {
            setAwayFlag("RU");
         }
         else if (away_team === "Belgium") {
            setAwayFlag("BE");
         }
         else if (away_team === "Croatia") {
            setAwayFlag("HR");
         }
         else if (away_team === "Czech Republic") {
            setAwayFlag("CZ");
         }
         else if (away_team === "Italy") {
            setAwayFlag("IT");
         }
         else if (away_team === "Hungary") {
            setAwayFlag("HU");
         }
         else if (away_team === "Iceland") {
            setAwayFlag("IS");
         }
         else if (away_team === "Portugal") {
            setAwayFlag("PT");
         }
         else if (away_team === "Turkey") {
            setAwayFlag("TR");
         }
         else if (away_team === "Austria") {
            setAwayFlag("AT");
         }
    }, [])
   
    
    useEffect(() => {
        console.log(gameResult);
      }, [gameResult]);
  
    function updateGameStatus() {
        const putStatus = async()=>{
            await instance.put(`euro_events/${gameId}`, {
                status:"Not Started"
            },{
                    headers: {
                        Authorization: `bearer ${token}` 
                    }
                }) 
        }
       putStatus()

       sendBetResults()
    }

    function sendBetResults() { 
        const fetchResults = async()=>{
            const response = await instance.get(`results?event_id=${event_id}`)
            setGameResult(response.data[0])
            const resultData = response.data

            return ( 
                resultData 
            )
        }
        fetchResults().then((resp)=>fetchBet(resp)).then((resp)=>loopBets(resp))
                     
        
        const fetchBet = async(resultData)=>{
            const response = await instance.get(`bets?euro_event.eid_xml=${event_id}`)
            setBetsOnGame(response.data) 
            const bets = response.data
            
            return (
                 [bets, resultData]
            )
              
        }
        
        
    }
    
    function loopBets(resp) {
      const bets = resp[0]
      const gameResult = resp[1]

      const resultHomeGoals = gameResult[0].home_goals
      const resultAwayGoals = gameResult[0].away_goals
      const resultWinner = gameResult[0].winner_team

        bets.forEach(bet => {
      const bettedHomeGoals = Number(bet.homeTeamGoals)
      const bettedAwayGoals = Number(bet.awayTeamGoals)
      const bettedWinner = bet.winner
console.log(bettedWinner)
console.log(resultWinner)

           var score = 0;
            if(bet.type === "BetOnResult") {
               if(resultHomeGoals === bettedHomeGoals) {
                  score =+ 1
                  

                  console.log("Right home goals")
               }
               if(resultAwayGoals === bettedAwayGoals) {
                  score =+1
                  console.log(score)
                  console.log("Right away goals")
               }
               if(resultWinner === bettedWinner) {
                  console.log("Right winner")
               }
            } else if (bet.type === "BetOnGoals") {
               if(resultHomeGoals === bettedHomeGoals) {
                  console.log("Right home goals")
               }
               if(resultAwayGoals === bettedAwayGoals) {
                  console.log("Right away goals")
               }
            }else if (bet.type === "BetOnWinner") {
               if(resultWinner === bettedWinner) {
                  console.log("Right winner")
               }
            }
            console.log(score)
        });
    }   
    const HomeFlag = Flags[homeFlag]
    const AwayFlag = Flags[awayFlag]

    
    return (
        <>
        <div className="game_info">
            <HomeFlag width="30px" title="United States" className="..."/> 
            {eventname}
            <AwayFlag width="30px" title="United States" className="..."/>
            <br/>
            {status}<br/>
            { status === "Not started" || "Finished" ? (<> <button onClick={updateGameStatus}> UpdateGameStatus</button> <br/> </>)
            :
            (<> </>)}
            <br/>
           
            
            
        </div>

       
        </>
    )
}

export default Game
