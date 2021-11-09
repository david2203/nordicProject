import React, { useState, useEffect } from "react";
import "../Brackets.css";
import server from "../Global/config";
import axios from "axios";
import Flags from "country-flag-icons/react/3x2";
import { getTeamFlag } from "./Flags";

function Brackets() {
  const useGetGames = () => {
    const [games16Array, set16GamesArray] = useState([]);
    const [gamesQuarter, setGamesQuarter] = useState([]);
    const [gamesSemi, setGamesSemi] = useState([]);
    const [gamesFinal, setGamesFinal] = useState([]);

    const [loading, setLoading] = useState(true);
    const instance = axios.create({ baseURL: server });

    const fetchCountries = async () => {
      try {
        const data = await instance.get(`euro_events?grp=EURO 1/8 finals`);
        set16GamesArray(data.data);
        const data2 = await instance.get(`euro_events?grp=EURO Quarter finals`);
        setGamesQuarter(data2.data);
        const data3 = await instance.get(`euro_events?grp=EURO Semi finals`);
        setGamesSemi(data3.data);
        const data4 = await instance.get(`euro_events?grp=EURO Final`);
        setGamesFinal(data4.data);
      } catch (err) {
        console.log(err);
      }

      setLoading(false);
    };

    useEffect(() => {
      fetchCountries();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { loading, games16Array, gamesQuarter, gamesSemi, gamesFinal };
  };

  const { loading, games16Array, gamesQuarter, gamesSemi, gamesFinal } =
    useGetGames();
  if (!loading) {
    console.log(games16Array);
  }

  return (
    <>
      <head />
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
      <meta name="viewport" content="width=device-width,initial-scale=1.0" />
      <link
        href="https://maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css?family=Holtwood+One+SC"
        rel="stylesheet"
        type="text/css"
      />
      <link
        href="https://fonts.googleapis.com/css?family=Kaushan+Script|Herr+Von+Muellerhoff"
        rel="stylesheet"
        type="text/css"
      />
      <link
        href="https://fonts.googleapis.com/css?family=Abel"
        rel="stylesheet"
        type="text/css"
      />
      <link
        href="https://fonts.googleapis.com/css?family=Istok+Web|Roboto+Condensed:700"
        rel="stylesheet"
        type="text/css"
      />
      <link rel="stylesheet" type="text/css" href="../Brackets.css" />

      <title>Uefa Euro 2016</title>
      <head />
      <body className="bracketsBody">
        <header className="hero">
          <div className="hero-wrap">
            <p className="intro" id="intro">
              Nordic Bet
            </p>
            <br />
            <h2 className="intro" id="intro">
              Presenterar...
            </h2>
            <h1 id="headline">Uefa Euro</h1>
            <p className="year">
              <i className="fa fa-star"></i> 2016 <i className="fa fa-star"></i>
            </p>
          </div>
        </header>

        <section id="bracket">
          <div className="container">
            <div className="split split-one">
              <div className="round round-one current">
                <div className="round-details">
                  Åttondelsfinal
                  <br />
                  <span className="date">"DATE"</span>
                </div>

                {games16Array.map((game) => {
                  let homeOpacity = ""
                  let awayOpacity = ""

                  const teams = game.eventname.split("-")
                  const home = teams[0]
                  const away = teams[1]
                  const HomeFlag = Flags[getTeamFlag(game.home_team)];
                  const AwayFlag = Flags[getTeamFlag(game.away_team)];
                  if(game.winner === game.home_team){
                    homeOpacity = "homeOpacity"
                  }else if(game.winner === game.away_team) {
                    awayOpacity = "awayOpacity"
                  }
                  if(game.home_team !== "" && game.away_team !== ""){
                    return (
                      <ul key={game.id} className="matchup"> 
                        <li className={`team team-top ${homeOpacity}`}>
                        <HomeFlag width="40px" />
                        <span>  </span>
                          {game.home_team}
                          <span className="score">{game.home_final}</span>
                        </li>
                        <li className={`team team-bottom ${awayOpacity}`}>
                        <AwayFlag width="40px" />
                        <span>  </span>
                          {game.away_team}
                          <span className="score">{game.away_final}</span>
                        </li>
                      </ul>
                    );
                  } else {
                    return (
                      <ul className="matchup">
                        <li className="team team-top">
                          {home}
                          <span className="score">{game.home_final}</span>
                        </li>
                        <li className="team team-bottom">
                          {away}
                          <span className="score">{game.away_final}</span>
                        </li>
                      </ul>
                    );
                  }
                })}
              </div>
              {/* <!-- END ROUND ONE --> */}

              <div className="round round-two">
                <div className="round-details">
                  Kvartsfinal
                  <br />
                  <span className="date">"DATE"</span>
                </div>
                {gamesQuarter.map((game) => {
                  const home = game.home_team;
                  const away = game.away_team;
                  const teams = game.eventname.split("-");
                  const home_pre = teams[0];
                  const away_pre = teams[1];
                  const HomeFlag = Flags[getTeamFlag(home)];
                  const AwayFlag = Flags[getTeamFlag(away)];
                  if (game.home_team !== "") {
                    return (
                      <ul key={game.id} className="matchup">
                        <li className="team team-top">
                          <span className="flag">
                            <HomeFlag width="40px" />
                          </span>
                          <span> </span>
                          {home}
                          <span className="score">{game.home_final}</span>
                        </li>
                        <li className="team team-bottom">
                          <span className="flag">
                            <AwayFlag width="40px" />
                          </span>
                          <span> </span>
                          {away}
                          <span className="score">{game.away_final}</span>
                        </li>
                      </ul>
                    );
                  } else {
                    return (
                      <ul className="matchup">
                        <li className="team team-top">
                          {home_pre}
                          <span className="score">{game.home_final}</span>
                        </li>
                        <li className="team team-bottom">
                          {away_pre}
                          <span className="score">{game.away_final}</span>
                        </li>
                      </ul>
                    );
                  }
                })}
              </div>
              {/* !-- END ROUND TWO --> */}

              <div className="round round-three">
                <div className="round-details">
                  Semi-Final
                  <br />
                  <span className="date">"DATE"</span>
                </div>
                {gamesSemi.map((game) => {
                  const home = game.home_team;
                  const away = game.away_team;
                  const teams = game.eventname.split("-");
                  const home_pre = teams[0];
                  const away_pre = teams[1];
                  const HomeFlag = Flags[getTeamFlag(home)];
                  const AwayFlag = Flags[getTeamFlag(away)];

                  if (game.home_team !== "") {
                    return (
                      <ul key={game.id} className="matchup">
                        <li className="team team-top">
                          <span className="flag">
                            <HomeFlag width="40px" />
                          </span>
                          <span> </span>
                          {home}
                          <span className="score">{game.home_final}</span>
                        </li>
                        <li className="team team-bottom">
                          <span className="flag">
                            <AwayFlag width="40px" />
                          </span>
                          <span> </span>
                          {away}
                          <span className="score">{game.away_final}</span>
                        </li>
                      </ul>
                    );
                  } else {
                    return (
                      <ul className="matchup">
                        <li className="team team-top">
                          {home_pre}
                          <span className="score">{game.home_final}</span>
                        </li>
                        <li className="team team-bottom">
                          {away_pre}
                          <span className="score">{game.away_final}</span>
                        </li>
                      </ul>
                    );
                  }
                })}
              </div>
              {/* <!-- END ROUND THREE -->		 */}
            </div>

            <div className="champion">
              <div className="final">
                <i className="fa fa-trophy"></i>
                <div className="round-details">
                  Final <br />
                  {gamesFinal.map((game) => {
                    const winner = game.winner;
                    const WinnerFlag = Flags[getTeamFlag(winner)];
                    if (game.winner !== "") {
                      return (
                        <>
                          <ul className="matchup">
                            <li className="team team-top">
                              <WinnerFlag width="40px" />
                              <span> </span>
                              Winner : {winner}
                            </li>
                          </ul>
                        </>
                      );
                    } else {
                      return (
                        <>
                          <span className="date"></span>
                        </>
                      );
                    }
                  })}
                </div>
                {gamesFinal.map((game) => {
                  const home = game.home_team;
                  const away = game.away_team;
                  const teams = game.eventname.split("-");
                  const home_pre = teams[0];
                  const away_pre = teams[1];
                  const HomeFlag = Flags[getTeamFlag(home)];
                  const AwayFlag = Flags[getTeamFlag(away)];

                  if (game.home_team !== "") {
                    return (
                      <ul key={game.id} className="matchup">
                        <li className="team team-top">
                          <span className="flag">
                            <HomeFlag width="40px" />
                          </span>
                          <span> </span>
                          {home}
                          <span className="score">{game.home_final}</span>
                        </li>
                        <li className="team team-bottom">
                          <span className="flag">
                            <AwayFlag width="40px" />
                          </span>
                          <span> </span>
                          {away}
                          <span className="score">{game.away_final}</span>
                        </li>
                      </ul>
                    );
                  } else {
                    return (
                      <ul className="matchup">
                        <li className="team team-top">
                          {home_pre}
                          <span className="score">{game.home_final}</span>
                        </li>
                        <li className="team team-bottom">
                          {away_pre}
                          <span className="score">{game.away_final}</span>
                        </li>
                      </ul>
                    );
                  }
                })}
              </div>
            </div>
            <div className="split split-two"></div>
          </div>
          <div />
        </section>
        <section className="share">
          <div className="share-wrap">
            <a className="share-icon" href="https://twitter.com/_joebeason">
              <i className="fa fa-twitter"></i>
            </a>
            {/* <a className="share-icon" href="#"><i className="fa fa-facebook"></i></a> */}
            {/* <a className="share-icon" href="#"><i className="fa fa-envelope"></i></a> */}
          </div>
        </section>
      </body>
    </>
  );
}

export default Brackets;
