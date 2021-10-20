import React, {useState, useEffect} from "react";
import axios from "axios";
import Modal from 'react-modal';
import server from "./config"

function Game({event_id,eid_xml,eventname,grp,odds_1,odds_x,odds_2,status}) {
    
    const instance = axios.create({baseURL: server})
    const playingTeams = eventname.split("-");
    const home_team = playingTeams[0]
    const away_team = playingTeams[1]
    const [gameId, setGameId] = useState()
    const [gameResult, setGameResult] = useState()
    const [gameName, setGameName] = useState()
    const [betsOnGame, setBetsOnGame] = useState([])

    const user_id = localStorage.getItem("user_id")
    const token = localStorage.getItem("jwt")
 

    useEffect(()=> {
        const fetchGameId = async()=>{
            const response = await instance.get(`Euro_events?eid_xml=${event_id}`)
            setGameId(response.data[0].id)
            setGameName(response.data[0].eventname)
        }
        fetchGameId()
    }, [])
   


  
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
       putStatus()

       sendBetResults()
    }

    function sendBetResults() { 
        const promiseA = new Promise(fetchResults);
        const promiseB = promiseA.then(loopBets, handleRejected1);
        console.log(promiseA)
       function fetchResults() {
            const response = instance.get(`results?event_id=${event_id}`)
            setGameResult(response.data)
        }
        
        // fetchResults() 
        // const fetchBet = async()=>{
        //     const response = await instance.get(`bets?euro_event.eid_xml=${event_id}`)
        //     setBetsOnGame(response.data) 
        // }
        // fetchBet()
    
        
    }
    function handleRejected1() {
        console.log("hej")
    }
    function loopBets() {
        console.log(betsOnGame)
        // betsOnGame.forEach(bet => {
        //     console.log(bet)
        // });
    }
   
    return (
        <>
        <div className="game_info">
            <div>{eventname}<br/></div>
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
