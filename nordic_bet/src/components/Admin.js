import React, {useState, useEffect} from "react";
import axios from "axios";
import server from "./config";
import AdminGame from "./Admin_game";

function Admin() {
    const instance = axios.create({baseURL: server})
    const [games, setGames] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect( ()=>{
        const userId = localStorage.getItem('user_id');
        if(userId!==null){

            const fetchRole = async()=>{
            const response = await instance.get(`/users?id=${userId}`)
            setIsAdmin(response.data[0].isAdmin)
            console.log(response.data[0].isAdmin);
            }
            fetchRole()
        }
    },[])

    useEffect(()=> {
        const fetchGame = async()=>{
            const response = await instance.get(`Euro_events`)
                setGames(response.data)   
        }
        fetchGame()
    }, [])


    return (
        <>
        {isAdmin ?( 
            <div>
            {games.map((game)=>{
                return(
                    <AdminGame key={game.eid_xml} event_id={game.eid_xml}  eventname={game.eventname} grp={game.grp}  odds_1={game.odds_1} odds_x={game.odds_x} odds_2={game.odds_2} status={game.status} />
                )
            })}
            </div>
        ) : (<div>No permission</div>)}
        </>
    )
}

export default Admin