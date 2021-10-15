import React, {useState, useEffect} from "react";
import axios from "axios";
import server from "./config";
import Game from "./Game";


function Games() {
    const [games, setGames] = useState([]);
    const [loadPage, setLoadPage] = useState(3)

    useEffect(()=> {
        const fetchGame = async()=>{
            console.log(`${server}Euro_events?_limit{loadPage}`);
            const response = await axios.get(`http:/localhost:1337/Euro_events`)
            setGames(response.data)
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
                    <Game key={game.xml_eid} eventname={game.eventname} grp={game.grp}  odds_1={game.odds_1} odds_x={game.odds_x} odds_2={game.odds_2} status={game.status}/>
                )
            })}
            hej
        </div>
    )
}

export default Games
