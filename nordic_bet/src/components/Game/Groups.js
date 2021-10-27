import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import server from "../Global/config";
import Brackets from "./Brackets";


function Groups() {
  const chunked = [];
  const useGetGames = () => {
    const [gamesArray, setGamesArray] = useState([]);
    const [loading, setLoading] = useState(true);

    const groups = [
      "EURO Grp. A",
      "EURO Grp. B",
      "EURO Grp. C",
      "EURO Grp. D",
      "EURO Grp. E",
      "EURO Grp. F",
    ];

    const instance = axios.create({ baseURL: server });

    const fetchGames = async () => {
      try {
        for (let i = 0; i < groups.length; i++) {
          const { data } = await instance.get(`Euro_events?grp=${groups[i]}`);
          setGamesArray((games) => [...games, ...data]);
        }
      } catch (err) {
        console.log(err);
      }

      setLoading(false);
    };

    useEffect(() => {
      fetchGames();
    }, []);

    return { loading, gamesArray };
  };

  const { loading, gamesArray } = useGetGames();
  
  if (!loading) {
    // All data should be available
    console.log(gamesArray);
    for (let i = 0; i < gamesArray.length; i += 6) {
        //chunked is an array with all groups as arrays inside
      chunked.push(gamesArray.slice(i, i + 6));
    }

    
    
    for(let i = 0; i < chunked[0].length; i++) {
       
        if(chunked[0][i].status === "Finished"){
            const playingTeams = chunked[0][i].eventname.split("-")
            const home_team = playingTeams[0]
            const away_team = playingTeams[1]
            if (chunked[0][i].winner === home_team) {
                //give home team 3 points and away team 0 points and set active to false
                
            } else if(chunked[0][i].winner === away_team){
                //give away team 3 points and home team 0 points and set active to false
            } else {
                //give both teams 1 point and set active to false
            }
            
        }
    }
		
  }
  return (
    <div>
      {chunked.map((games) => {
          const team12 = games[0].eventname.split("-")
          const team34 = games[1].eventname.split("-")
            team12.push(team34[0],team34[1])
           
            const instance = axios.create({ baseURL: server });
            //Function for putting all teams into strapi
        // team12.forEach((team)=>{
        //     instance.post(`Countries`,{
        //         name:team

        //       })
        // })
        return (
            <>
            <table className="table table-hover w-25 border bg-light mt-3 mx-auto">
            <thead>
              <tr>
                <th scope="col"> Participating teams in {games[0].grp}</th>
              </tr>
            </thead>
            <tbody>
              {team12.map((game) => {
                  
                return (
                    <tr>
                    <td>{game}</td>
                
                  </tr> 
                );
              })}
            </tbody>
          </table>
          <table className="table table-hover w-25 border bg-light mt-3 mx-auto">
            <thead>
              <tr>
                <th scope="col">Games {games[0].grp}</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {games.map((game) => {
                return (
                    <tr>
                    <td>{game.eventname}</td>
                    <td>{game.status}</td>   
                  </tr> 
                );
              })}
            </tbody>
          </table>
          <br/>
          <br/>

          </>
        );
      })}
    </div>
  );
}

export default Groups;
