import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import server from "../Global/config";


function Groupsinfo() {
  const chunked = [];
  const useGetGames = () => {
    const [teamsArray, setTeamsArray] = useState([]);
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
    useEffect(() => {
      fetchTeams();
    }, []);
    return { loading, teamsArray };
  };
  const { loading, teamsArray } = useGetGames();
  if (!loading) {
    for (let i = 0; i < teamsArray.length; i += 4) {
      //chunked is an array with all groups as arrays inside
      chunked.push(teamsArray.slice(i, i + 4));
    }
  }

  return (
    <div>
      {chunked.map((groups) => {
        return (
          <>
            <table className="table table-hover w-50 border bg-light mt-3 mx-auto">
              <thead>
                <tr>
                  <th scope="col"> {groups[0].group} </th>
                  <th scope="col">Score</th>
                </tr>
              </thead>
              <tbody>
                {groups.map((group) => {
                  return (
                    <tr>
                      <td>{group.name}</td>
                      <td>{group.group_score}</td>
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
