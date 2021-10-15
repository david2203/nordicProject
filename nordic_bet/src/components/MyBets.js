import React, {useState, useEffect} from "react";
import axios from "axios";
import server from "./config";
import Game from "./Game";
import Bet from "./Bet";

function MyBets() {

    const instance = axios.create({baseURL: server})
    const [games, setGames] = useState([]);
    const [loadPage, setLoadPage] = useState(3)
    const [bets, setBets] = useState([])

    useEffect(()=> {
        const fetchGame = async()=>{
            const response = await instance.get(`Euro_events`)
            setGames(response.data)
        }
        fetchGame()
    }, [])

    useEffect(()=> {
        const fetchBets = async()=>{
            const response = await instance.get(`bets`)
            setBets(response.data)
        }
        fetchBets()
    }, [loadPage])


    function loadMore() {
        let dynamicPage = loadPage + 2
        setLoadPage(dynamicPage)
        
    }
    function showLess() {
        setLoadPage(3)
    }
    return (
        <>
        <div>
        {/* {games.map((game)=>{
            return(
                <Game key={game.xml_eid} eventname={game.eventname} grp={game.grp}  odds_1={game.odds_1} odds_x={game.odds_x} odds_2={game.odds_2} status={game.status}/>
            )
        })} */}
        {bets.map((bet)=>{
            return(
                <Bet key={bet.id} type={bet.type} grp={bet.grp}  homeTeamGoals={bet.homeTeamGoals} awayTeamGoals={bet.awayTeamGoals} winner={bet.winner}/>
            )
        })}
        {/* pagination function */}
        { loadPage <= bets.length ? 
            (<button onClick={loadMore}>Load more</button>):
            (<button onClick={showLess}>Show less</button>)
        }
    </div>
        </>
    )
}

export default MyBets
