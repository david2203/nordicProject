import React, {useState, useEffect} from "react";
import axios from "axios";
import server from "./config";
import Game from "./Game";


function Games() {

    const instance = axios.create({baseURL: server})
    const [games, setGames] = useState([]);
    const [loadPage, setLoadPage] = useState(3)

    useEffect(()=> {
        const fetchGame = async()=>{
            const response = await instance.get(`Euro_events?_limit=${loadPage}`)
            setGames(response.data)
            console.log(response.data)
        }
        fetchGame()
    }, [loadPage])

    function loadMore() {
        let dynamicPage = loadPage + 2
        setLoadPage(dynamicPage)
        
    }
    function showLess() {
        setLoadPage(3)
    }
    return (
        <div>
            {games.map((game)=>{
                return(
                    <Game key={game.eid_xml} event_id={game.eid_xml}  eventname={game.eventname} grp={game.grp}  odds_1={game.odds_1} odds_x={game.odds_x} odds_2={game.odds_2} status={game.status}/>
                )
            })}
            {/* pagination function */}
            { loadPage <= games.length ? 
                (<button onClick={loadMore}>Load more</button>):
                (<button onClick={showLess}>Show less</button>)
            }
           
        </div>
    )
}

export default Games
