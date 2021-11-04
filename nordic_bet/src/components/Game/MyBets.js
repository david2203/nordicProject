import React, { useState, useEffect } from "react";
import axios from "axios";
import server from "../Global/config";
import Bet from "./Bet";

import { Parallax } from "react-parallax";

function MyBets() {
  const username = localStorage.getItem("username")
  const instance = axios.create({ baseURL: server });
  const user = localStorage.getItem("user_id");
  const [loadPage, setLoadPage] = useState(3);
  const [bets, setBets] = useState([]);

  useEffect(() => {
    const fetchBets = async () => {
      const response = await instance.get(
        `bets?user=${user}&&_limit=${loadPage}`
      );
      setBets(response.data);
    };
    fetchBets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadPage]);

  function loadMore() {
    let dynamicPage = loadPage + 2;
    setLoadPage(dynamicPage);
  }
  function showLess() {
    setLoadPage(3);
  }

  const image1 =
  "https://images.unsplash.com/photo-1561034645-e6f28dfddd2c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80";
  return (
    <>  
    
       <Parallax className="min-vh-100" bgImage={image1} strength={500}>
       <h2 className=" bg-light w-25 border mx-auto mt-3">Välkommen {username}! <br/> Här är dina aktiva bets: </h2>
      {bets.map((bet) => {
       
        return (
          <>
          <br/>
          <Bet
            key={bet.id}
            id={bet.id}
            type={bet.type}
            grp={bet.grp}
            homeTeamGoals={bet.homeTeamGoals}
            awayTeamGoals={bet.awayTeamGoals}
            winner={bet.winner}
            euro_event={bet.euro_event}
            status={bet.Active}
          />
          <br/>
          </>
        );
      })}
      {/* pagination function */}
      {loadPage <= bets.length ? (
        <button onClick={loadMore}>Load more</button>
      ) : (
        <button onClick={showLess}>Show less</button>
      )}
      </Parallax>
     
    </>
  );
}

export default MyBets;
