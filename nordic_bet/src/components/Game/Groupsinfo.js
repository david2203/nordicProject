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
    return { loading, teamsArray, gamesArray };
  };
  const { loading, teamsArray, gamesArray } = useGetGames();
  const chunkedGames = []
  const chunkedGroups = []
  if (!loading) {
    for (let i = 0; i < teamsArray.length; i += 4) {
      //chunked is an array with all groups as arrays inside
      chunked.push(teamsArray.slice(i, i + 4));
    }
    for(let i = 0; i< gamesArray.length; i += 6) {
      chunkedGames.push(gamesArray.slice(i, i + 6))
    }
    for(let i = 0; i< 6; i += 1) {
      chunkedGroups.push(chunkedGames[i])
    }
  }
  let returnValue;
  console.log(chunkedGroups)
  return (
    <div>
      {chunked.map((groups, key) => {
        groups.sort(function (a, b) {
          returnValue = b.group_score - a.group_score;
          if (b.group_score === a.group_score) {
            let matchOne = `${a.country}-${b.country}`;
            let matchTwo = `${b.country}-${a.country}`;
            returnValue = b.group_goals - a.group_goals;
            for (let i = 0; i < gamesArray.length; i++) {
              if (
                gamesArray[i].eventname === matchOne ||
                gamesArray[i].eventname === matchTwo
              ) {
                if (gamesArray[i].winner === a.country) {
                  returnValue = -1;
                } else if (gamesArray[i].winner === a.country) {
                  returnValue = -1;
                }
              }
            }
          }

          return returnValue;
        });
        
        return (
          <div key={key}>
            <table  className="table table-hover w-50 border bg-light mt-3 mx-auto  ">
              <thead>
                <tr >
                  <th scope="col"></th>
                  <th scope="col"> {groups[0].group} </th>
                  <th scope="col">Poäng</th>
                  <th scope="col">Mål i gruppen</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {groups.map((country, key2) => {
                  
                  const CountryFlag = Flags[getTeamFlag(country.name)];
                  
                  let color = 'bg-danger'
                  let textcolor = 'Diskvalificerad'
                  let textcolor2 = 'Ej möjligt ännu att ställa status'
                  if (groups[0].group_score < 6 || country.name === groups[0].name|| country.name === groups[1].name) {
                    color = 'bg-white'
                    textcolor = 'Går ej att bedöma ännu'

                  }
                  else {
                  if (country.name === groups[0].name|| country.name === groups[1].name) {
                    color = 'bg-success'
                    textcolor = 'Kvalificerad'
                  }
                  else if(country.name === groups[2].name) {
                    color = 'bg-warning'
                    textcolor = 'Möjligen Kvalificerad'
                  }
                }
                  return (
                    <tr key={key2}>
                      <td>
                        <CountryFlag width="40px" />
                      </td>
                      <td> {country.name}</td>
                      <td>{country.group_score} </td>
                      <td>{country.group_goals} </td>
                      <td className={` text-dark ${color}`}>{textcolor}</td>

                    </tr>
                  );
                })}
              </tbody>
            </table>
            <br />
            <br />
          </div>
        );
      })}
    </div>
  );
}

export default Groupsinfo;
