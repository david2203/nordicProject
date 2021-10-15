import React, {useState, useEffect} from "react";

function Game({eid_xml,eventname,grp,odds_1,odds_x,odds_2,status}) {

    // const [game, setGame] = useState()
    // const [gameId, setGameId] = useState()
    
    return (
        <>
           Game name: {eid_xml}
            {eventname}<br/>
            {grp}<br/>
            {odds_1}<br/>
            {odds_x}<br/>
            {odds_2}<br/>
            {status}<br/>
        </>
    )
}

export default Game
