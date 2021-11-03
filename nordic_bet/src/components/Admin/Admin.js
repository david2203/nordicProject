import React, { useState, useEffect } from "react";
import axios from "axios";
import server from "../Global/config";
import AdminGame from "./Admin_game";
import Update from "./Update";
import { Parallax } from "react-parallax";

function Admin() {
  const [games, setGames] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const instance = axios.create({ baseURL: server });
    const userId = localStorage.getItem("user_id");
    if (userId !== null) {
      const fetchRole = async () => {
        const response = await instance.get(`/users?id=${userId}`);
        setIsAdmin(response.data[0].isAdmin);
        console.log(response.data[0].isAdmin);
      };
      fetchRole();
    }
  }, []);

  useEffect(() => {
    const instance = axios.create({ baseURL: server });
    const fetchGame = async () => {
      const response = await instance.get(`Euro_events`);
      setGames(response.data);
    };
    fetchGame();
  }, []);
  const image1 =
    "https://images.unsplash.com/photo-1531819318554-84abdf082937?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2246&q=80";

  return (
    <>
      <Parallax bgImage={image1} strength={1500}>
        <div cstyle={{ height: "auto" }}></div>
        <div className="d-flex flex-column align-items-center">
          {isAdmin ? (
            <>
              {games.map((game) => {
                return (
                  <AdminGame
                    key={game.eid_xml}
                    event_id={game.eid_xml}
                    eventname={game.eventname}
                    grp={game.grp}
                    odds_1={game.odds_1}
                    odds_x={game.odds_x}
                    odds_2={game.odds_2}
                    status={game.status}
                    score_given={game.score_given}
                  />
                );
              })}
              <Update />
            </>
          ) : (
            <div>No permission</div>
          )}
        </div>
      </Parallax>
    </>
  );
}

export default Admin;
