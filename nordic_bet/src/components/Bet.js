import React from 'react'

function Bet({id,type,homeTeamGoals,awayTeamGoals,winner,eid_xml,eventname,grp,odds_1,odds_x,odds_2,status}) {
    return (
        <>
        <div className="bet_info">
            {id}
            Type of bet: {type}
            Home goals: {homeTeamGoals}
            Away goals: {awayTeamGoals}
            Winning team: {winner}

            

            
        </div>
        </>
    )
}

export default Bet
