import React, {useState, useEffect} from "react";
import axios from "axios";
import server from "../Global/config";
import Bet from "./Bet";
import Scoreboard from "../Scoreboard"

function MyBets() {

    const instance = axios.create({baseURL: server})
    const user = localStorage.getItem("user_id")  
    const [loadPage, setLoadPage] = useState(3)
    const [bets, setBets] = useState([])
    

    useEffect(()=> {
        const fetchBets = async()=>{
            const response = await instance.get(`bets?user=${user}`)
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
        <Scoreboard/>
        {bets.map((bet)=>{
            return(
                <Bet key={bet.id} type={bet.type} grp={bet.grp}  homeTeamGoals={bet.homeTeamGoals} awayTeamGoals={bet.awayTeamGoals} winner={bet.winner}/>
            )
        })}
        {/* pagination function */}
        {/* { loadPage <= bets.length ? 
            (<button onClick={loadMore}>Load more</button>):
            (<button onClick={showLess}>Show less</button>)
        } */}
        </>
    )
}

export default MyBets
