import React, { useState, useEffect } from "react";

import server from "../Global/config";
import axios from "axios";

function Results_postGroup() {
    const instance = axios.create({ baseURL: server });

    const data16 = [
        
        {event:{
            id:1695460,
            home_team:"France",
            away_team:"Ireland",
            home_goals:2,
            away_goals:1,
            winner:"France"
        }
        },
        {event:{
            id:1695457,
            home_team:"Wales",
            away_team:"N.Ireland",
            home_goals:1,
            away_goals:0,
            winner:"Wales"
        }
    },
        {event:{
            id:1695459,
            home_team:"Germany",
            away_team:"Slovakia",
            home_goals:3,
            away_goals:0,
            winner:"Germany"
        }},
        {event:{
            id:1695456,
            home_team:"Croatia",
            away_team:"Portugal",
            home_goals:0,
            away_goals:1,
            winner:"Portugal"
        }},
        {event:{
            id:1695463,
            home_team:"Italy",
            away_team:"Spain",
            home_goals:2,
            away_goals:0,
            winner:"Italy"
        }},
        {event:{
            id:1695461,
            home_team:"Hungary",
            away_team:"Belgium",
            home_goals:0,
            away_goals:4,
            winner:"Belgium"
        }},
        {event:{
            id:1695462,
            home_team:"England",
            away_team:"Iceland",
            home_goals:1,
            away_goals:2,
            winner:"Iceland"
        }}
           
    ]

//     45) Jun/30 21:00   Poland       3-5 pen. 1-1 a.e.t. (0-0)   Portugal          @ Stade Vélodrome, Marseille
// (46) Jul/01 21:00   Wales        3-1              Belgium           @ Stade Pierre-Mauroy, Lille
// (47) Jul/02 21:00   Germany      6-5 pen. 1-1 a.e.t. (0-0)   Italy             @ Nouveau Stade de Bordeaux, Bordeaux
// (48) Jul/03 21:00   France       5-2              Iceland           @ Stade de France, Saint-Denis
// }
// $dataSemi = {
//     Semi-finals

// (49) Jul/06 21:00   Portugal     2-0              Wales             @ Parc Olympique Lyonnais, Lyon
// (50) Jul/07 21:00   Germany      0-2              France            @ Stade Vélodrome, Marseille

    const dataQuarter = [
         
        {event:{
            id:1695460,
            home_team:"France",
            away_team:"Ireland",
            home_goals:2,
            away_goals:1,
            winner:"France"
        }
        },
        {event:{
            id:1695457,
            home_team:"Wales",
            away_team:"N.Ireland",
            home_goals:1,
            away_goals:0,
            winner:"Wales"
        }
    },
        {event:{
            id:1695459,
            home_team:"Germany",
            away_team:"Slovakia",
            home_goals:3,
            away_goals:0,
            winner:"Germany"
        }},
        {event:{
            id:1695456,
            home_team:"Croatia",
            away_team:"Portugal",
            home_goals:0,
            away_goals:1,
            winner:"Portugal"
        }}
    ]

    function post16Results() {
        for(let i = 0; i< data16.length; i++){
            
            const eventId = data16[i].event.id
            const home_team = data16[i].event.home_team
            const away_team = data16[i].event.away_team
            const home_goals = data16[i].event.home_goals
            const away_goals = data16[i].event.away_goals
            const winner = data16[i].event.winner
            const put16Results = async() => {
                await instance.post(`results`, {
                    event_id: eventId,
                    home_team:home_team,
                    away_team:away_team,
                    winner_team:winner,
                    home_goals:home_goals,
                    away_goals:away_goals,
                   
                })
            }
            put16Results()
        }
    }
    function postQuarter() {

    }
    

    
    
    return (
        <div>
            already posted
            {/* <button onClick={post16Results}> Post</button> */}
        </div>
    )
}

export default Results_postGroup
