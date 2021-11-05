import React, { useState, useEffect } from "react";
import axios from "axios";
import server from "../Global/config";
import { getTeamFlag } from "./Flags";
import Flags from "country-flag-icons/react/3x2";

function Groupsinfo() {
  const chunked = [];

  const useGetGames = () => {
    const [teamsArray, setTeamsArray] = useState([]);
    const [gamesArray, setGamesArray] = useState([]);

    const [loading, setLoading] = useState(true);

    const instance = axios.create({ baseURL: server });

    const fetchTeams = async () => {
      try {
        const { data } = await instance.get(`countries?_sort=group:ASC`);
        setTeamsArray(data);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };
    const fetchGames = async () => {
      try {
        
          const { data } = await instance.get(`Euro_events`);
          setGamesArray((games) => [...games, ...data]);
       
      } catch (err) {
        console.log(err);
      }

      setLoading(false);
    };
    useEffect(() => {
      fetchTeams();
      fetchGames();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return { loading, teamsArray,gamesArray };
  };
  const { loading, teamsArray, gamesArray } = useGetGames();
  if (!loading) {
    console.log(gamesArray)
    for (let i = 0; i < teamsArray.length; i += 4) {
      //chunked is an array with all groups as arrays inside
      chunked.push(teamsArray.slice(i, i + 4));
    }
  }

  return (
    <div>
      {chunked.map((groups, index) => {
        groups.sort(function (a, b) {
          if(b.group_score === a.group_score){
            return(b.group_goals-a.group_goals)
          }
          return b.group_score - a.group_score;
        });
       
        return (
          <>
            <table className="table table-hover w-50 border bg-light mt-3 mx-auto  ">
              <thead>
                <tr key={index}>
                  <th scope="col"></th>
                  <th scope="col"> {groups[0].group} </th>
                  <th scope="col">Score</th>
                  <th scope="col">Total Group Goals</th>
                </tr>
              </thead>
              <tbody>
                {groups.map((country) => {
                  const CountryFlag = Flags[getTeamFlag(country.name)];
                  return (
                    <tr key={country.id}>
                      <td>
                        <CountryFlag width="40px" />
                      </td>
                      <td> {country.name}</td>
                      <td>{country.group_score} </td>
                      <td>{country.group_goals} </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <br />
            <br />
          </>
        );
      })}
    </div>
  );
}

export default Groupsinfo;
