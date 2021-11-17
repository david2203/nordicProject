import React, { useState, useEffect } from "react";
import axios from "axios";
import server from "./Global/config";
import Scorecard from "./Scorecard";
import "bootstrap/dist/css/bootstrap.min.css";
import gif from "./img/confetti.gif";
import { Parallax } from "react-parallax";


//top list component that fetches the users and sorts them by score 
function Scoreboard() {
 
  const userId = Number(localStorage.getItem("user_id"));
  const current = [];
  const currentRank = [];
  const useGetGames = () => {
    
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const instance = axios.create({ baseURL: server });

    const fetchUsers = async () => {
      try {
        const response = await instance.get(`/users?_sort=Score:DESC`);
        setUsers(response.data);
        
      } catch (err) {
        console.log(err);
      }

      setLoading(false);
    };

    useEffect(() => {
      fetchUsers();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { users, loading};
  };

  const { users, loading} = useGetGames();

  if (!loading) {
    for (let i = 0; i < users.length; i++) {
      if (users[i].id === userId) {
        current.push(users[i]);
        currentRank.push(i);
      }
    }
  }

  const image1 =
    "https://images.unsplash.com/photo-1590764258299-0f91fa7f95e8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1740&q=80";

    
  //visuals of the toplist
  return (
    <>
      <Parallax key="" bgImage={image1} strength={150}>
        <div className="min-vh-100">
          <span>
            <span className="d-flex justify-content-center">
              <img
                alt=""
                src={gif}
                style={{ position: "absolute", zIndex: "3", width: "100%" }}
              />
            </span>
          </span>
          <div className="mt-5">
            <img
              src="https://cdn-icons-png.flaticon.com/512/4489/4489657.png"
              width="100px"
              alt=""
            />
            <h3 className=" bg-light w-25 border mx-auto mt-3">Topplista </h3>
            <table className="table table-hover w-50 border bg-light mt-3 mx-auto">
              <thead>
                <tr>
                  <th scope="col">#Rank</th>
                  <th scope="col"></th>
                  <th scope="col">Användarnamn</th>
                  <th scope="col">Poäng</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, i) => {
                  return (
                    <Scorecard
                      key={user.id}
                      id={user.id}
                      username={user.username}
                      score={user.Score}
                      avatar={user.profilepicture}
                      row={i}
                    />
                  );
                })}
              </tbody>
            </table>
            <h3 className=" bg-light w-25 border mx-auto mt-5">
              Din placering{" "}
            </h3>
            <table className="table table-hover w-50 border bg-light mt-3 mx-auto">
              <thead>
                <tr>
                  <th scope="col">#Rank</th>
                  <th scope="col"></th>
                  <th scope="col">Användarnamn</th>
                  <th scope="col">Poäng</th>
                </tr>
              </thead>
              <tbody>
                {current.map((user, i) => {
                  return (
                    <Scorecard
                      key={user.id}
                      id={user.id}
                      username={user.username}
                      score={user.Score}
                      avatar={user.profilepicture}
                      row={currentRank[0]}
                    />
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </Parallax>
    </>
  );
}

export default Scoreboard;
