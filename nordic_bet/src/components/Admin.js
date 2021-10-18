import React, {useState, useEffect} from "react";
import axios from "axios";
import server from "./config";
import Admin_game from "./Admin_game";

function Admin() {
    const instance = axios.create({baseURL: server})
    const [games, setGames] = useState([]);

    useEffect(()=> {
        const fetchGame = async()=>{
            const response = await instance.get(`Euro_events`)
                setGames(response.data)   
        }
        fetchGame()
    }, [])
    return (
        <div>
            {games.map((game)=>{
                return(
                    <Admin_game key={game.eid_xml} event_id={game.eid_xml}  eventname={game.eventname} grp={game.grp}  odds_1={game.odds_1} odds_x={game.odds_x} odds_2={game.odds_2} status={game.status}/>
                )
            })}
        </div>
    )
}

export default Admin
