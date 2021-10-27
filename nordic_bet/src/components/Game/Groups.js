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
      chunked.push(gamesArray.slice(i, i + 6));
    }
  }
  return (
    <div>
      {chunked.map((games) => {
          const team12 = games[0].eventname.split("-")
          const team34 = games[1].eventname.split("-")
            team12.push(team34[0],team34[1])
            console.log(team12)
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
