import React, {useState, useEffect} from "react";

function Game({eid_xml,eventname,grp,odds_1,odds_x,odds_2,status}) {

    // const [game, setGame] = useState()
    // const [gameId, setGameId] = useState()
    
    return (
        <div>
            {eid_xml},
            {eventname},
            {grp},
            {odds_1},
            {odds_x},
            {odds_2}
            {status},  
        </div>
    )
}

export default Game
