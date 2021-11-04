import React, { useState, useEffect } from "react";
import axios from "axios";
import server from "../Global/config";
import Game from "./Game";

import { Parallax } from "react-parallax";
import "bootstrap/dist/css/bootstrap.min.css";

function Games() {
  const instance = axios.create({ baseURL: server });
  const [games, setGames] = useState([]);
  const [loadPage, setLoadPage] = useState(5);

  useEffect(() => {
    const fetchGame = async () => {
      const response = await instance.get(
        `Euro_events?status=Not Started&&_limit=${loadPage}`
      );
      // &&grp_contains=EURO Grp.
      setGames(response.data);
    };
    fetchGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadPage]);

  function loadMore() {
    let dynamicPage = loadPage + 3;
    setLoadPage(dynamicPage);
  }
  function showLess() {
    setLoadPage(5);
  }

  const image1 =
    "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2670&q=80";

  return (
    <>
      <div>
        <Parallax bgImage={image1} strength={500} >
          <div style={{ height: "auto" }} className="min-vh-100">
            
            {games.map((game) => {
              return (
                <Game
                  key={game.eid_xml}
                  event_id={game.eid_xml}
                  eventname={game.eventname}
                  grp={game.grp}
                  odds_1={game.odds_1}
                  odds_x={game.odds_x}
                  odds_2={game.odds_2}
                  status={game.status}
                />
              );
            })}
            {/* pagination function */}
            {loadPage <= games.length ? (
              <button onClick={loadMore} className="mt-5 mb-5">
                Load more
              </button>
            ) : (
              <button onClick={showLess} className="mt-5 mb-5">
                Show less
              </button>
            )}
          </div>
        </Parallax>
      </div>
      {/* <Footer/> */}
    </>
  );
}

export default Games;
