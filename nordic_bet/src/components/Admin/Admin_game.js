import React, {useState, useEffect} from "react";
import axios from "axios";
import server from "../Global/config"
import Flags from 'country-flag-icons/react/3x2'
import setTeamFlag from "../Game/Flags"

function Game({event_id,eventname,status,score_given}) {
    
    const instance = axios.create({baseURL: server})
    const playingTeams = eventname.split("-");
    const home_team = playingTeams[0]
    const away_team = playingTeams[1]
    const [gameId, setGameId] = useState()
    const [gameResult, setGameResult] = useState()
    const [homeFlag, setHomeFlag] = useState("AQ")
    const [awayFlag, setAwayFlag] = useState("AQ")
    const token = localStorage.getItem("jwt")
 

    useEffect(()=> {
        const fetchGameId = async()=>{
            const response = await instance.get(`Euro_events?eid_xml=${event_id}`)

            setGameId(response.data[0].id)
            
        }
        fetchGameId()
       
        setHomeFlag(setTeamFlag("home",home_team))
        setAwayFlag(setTeamFlag("away",away_team))
        
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
   
    
    useEffect(() => {
        console.log(gameResult);
      }, [gameResult]);
  
    function updateGameStatus() {
        const putStatus = async()=>{
            await instance.put(`euro_events/${gameId}`, {
                status:"Finished"
            },{
                    headers: {
                        Authorization: `bearer ${token}` 
                    }
                }) 
        }
       putStatus().then(sendBetResults())

    }

    function sendBetResults() { 
        const fetchResults = async()=>{
            const response = await instance.get(`results?event_id=${event_id}`)
   
            
            const home_goals = response.data[0].home_goals
            const away_goals = response.data[0].away_goals
            const winner = response.data[0].winner_team
            const playingTeams = eventname.split("-");
            const home_team = playingTeams[0]
            const away_team = playingTeams[1]
            const response2 = await instance.get(`countries?name=${home_team}`)
            const home_id = response2.data[0].id
            const home_score = Number(response2.data[0].group_score)
            const response3 = await instance.get(`countries?name=${away_team}`)
            const away_id = response3.data[0].id
            const away_score = Number(response3.data[0].group_score)
            
            


            setGameResult(response.data[0])
            
            if(score_given !== "yes" ) {
               if (winner === home_team) {
                  //give home team 3 points and away team 0 points and set active to false
                  const putPoints = async()=>{
                     await instance.put(`countries/${home_id}`, {
                         group_score: home_score + 3
                     })
                  }
                  putPoints()
              } else if(winner === away_team ){
                  //give away team 3 points and home team 0 points and set active to false
                  const putPoints = async()=>{
                     await instance.put(`countries/${away_id}`, {
                         group_score: away_score + 3
                     })
                  }
                  putPoints()
              } else if(winner === "X") {
                  //give both teams 1 point and set active to false
                  const putHomePoints = async()=>{
                     await instance.put(`countries/${home_id}`, {
                         group_score: home_score + 1
                     })
                  }
                  putHomePoints()
                  const putAwayPoints = async()=>{
                     await instance.put(`countries/${away_id}`, {
                         group_score: away_score + 1
                     })
                  }
                  putAwayPoints()
              }
              const putInactive = async()=>{
               await instance.put(`euro_events/${gameId}`, {
                   score_given:"yes"
               })
            }
            putInactive()
            }else {
               // doesnt send points
            }
            
            const putResult = async()=>{
               await instance.put(`euro_events/${gameId}`, {
                   winner:winner,
                   home_final:home_goals,
                   away_final:away_goals,
               },{
                       headers: {
                           Authorization: `bearer ${token}` 
                       }
                   }) 
           }
           putResult()
            
            
            const resultData = response.data
            return ( 
                resultData 
            )
        }
        fetchResults().then((resp)=>fetchBet(resp)).then((resp)=>compareBetsWithResult(resp)).then((resp)=>sendScores(resp))
                     
        
        const fetchBet = async(resultData)=>{
            const response = await instance.get(`bets?euro_event.eid_xml=${event_id}`)
            const bets = response.data
            if (bets.length === 0) {
               return(
                  false
               )
            }else{
               return (
                  [bets, resultData]
             )
            }
              
        }
        
        
    }
    
    function compareBetsWithResult(resp) {
            if (resp === false ){
               return (
                  false
               )
            } else {
               const bets = resp[0]
            const gameResult = resp[1]
            const resultHomeGoals = gameResult[0].home_goals
            const resultAwayGoals = gameResult[0].away_goals
            const resultWinner = gameResult[0].winner_team
            var score = 0;
            var betOwner = ""
            bets.forEach(bet => {
            betOwner = bet.user.id
            
               if(bet.Active === true) {
            
            
            const bettedHomeGoals = Number(bet.homeTeamGoals)
            const bettedAwayGoals = Number(bet.awayTeamGoals)
            const bettedWinner = bet.winner
            if(bet.type === "BetOnResult") {
               if(resultHomeGoals === bettedHomeGoals) {
                  score = score +1
                  console.log("Right home goals")
               }
               if(resultAwayGoals === bettedAwayGoals) {
                  score = score +1
                  console.log("Right away goals")
               }
               if(resultWinner === bettedWinner) {
                  score = score +3
                  console.log("Right winner")
               }
            } else if (bet.type === "BetOnGoals") {
               if(resultHomeGoals === bettedHomeGoals) {
                  score = score + 1

                  console.log("Right home goals")
               }
               if(resultAwayGoals === bettedAwayGoals) {
                  score = score + 1

                  console.log("Right away goals")
                  return 
               }
            }else if (bet.type === "BetOnWinner") {
               if(resultWinner === bettedWinner) {
                  score = score + 3

                  console.log("Right winner")
               }
            }
            }else {
               return ( 
                  false
               )
            } 
        });
        return (
         [bets, score, betOwner]
      )
          
            }
               
    }
    
    function sendScores(resp) {
      if (resp === false ){
         return (
            alert("No bets on this game")
         )
      } else {
      
      const userBetId= resp[2]
      const fetchScore = async()=>{
         const response = await instance.get(`/users?id=${userBetId}`)
         const userScore = response.data[0].Score
         console.log(response.data[0].Score)
         return(
            [userScore, resp]
            )
      }
      fetchScore().then((resp2)=>calcScore(resp2))
   }
    }
    function calcScore(resp2) {
       
       const betId= resp2[1][0][0].id
       const userBetId = resp2[1][2]
       const userScore = resp2[0]
       const scoreToAdd = resp2[1][1]
       const newScore = Number(userScore) + Number(scoreToAdd)

       const updateScore = async()=>{
         await instance.put(`users/${userBetId}`, {
             Score:newScore
         })
         }
      updateScore()
      const updateBet = async()=>{
         await instance.put(`bets/${betId}`, {
             Active:false
         })
         }
      updateBet()
    }
    const HomeFlag = Flags[homeFlag]
    const AwayFlag = Flags[awayFlag]

    
    return (
        <>
        <div className="game_info mt-3 bg-light w-25 center ">
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
