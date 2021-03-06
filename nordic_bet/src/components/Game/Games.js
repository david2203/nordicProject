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
        `Euro_events?_limit=${loadPage}&&_sort=deadline:ASC&&status=Not Started`
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
  "https://images.unsplash.com/photo-1486286701208-1d58e9338013?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1740&q=80";

  return (
    <>
      <div>
        <Parallax key="" bgImage={image1} strength={500}>
          <div style={{ height: "auto" }} className="min-vh-100">
          <h2 className="header bg-light w-25 border mx-auto mt-3"> Kommande spel </h2>
            {games.length !== 0 ? (
              games.map((game, key) => {
                return (
                  <Game
                    key={key}
                    event_id={game.eid_xml}
                    eventname={game.eventname}
                    grp={game.grp}
                    odds_1={game.odds_1}
                    odds_x={game.odds_x}
                    odds_2={game.odds_2}
                    status={game.status}
                    home={game.home_team}
                    away={game.away_team}
                    deadline={game.deadline}

                  />
                );
              })
            ) : (
              <div className="bg-light w-25 mx-auto m-3">
                
                Eventet ??r avslutat! <br/>
                Det finns d??rf??r inga spel f??r nuvarande. <br/>
                G?? till v??r landingpage f??r att se n??r
                n??sta event startar.
              </div>
            )}
            {/* pagination function */}
            {loadPage <= games.length ? (
              <button onClick={loadMore} className="btn btn-light mt-5 mb-5">
                Load more
              </button>
            ) : games.length !== 0 && games.length > 5 ? (
              <button onClick={showLess} className="btn btn-light mt-5 mb-5">
                Show less
              </button>
            ) : (
              <></>
            )}
          </div>
        </Parallax>
      </div>
    </>
  );
}

export default Games;
