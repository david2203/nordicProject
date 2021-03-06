import React, { useState, useEffect } from "react";
import "./Brackets.css";
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

  const bracket16Sort = {
    "2A-2C":1,
    "1D-3BEF":2,
    "1B-3ACD":3,
    "1F-2E":4,
    "1C-3ABF":5,
    "1E-2D":6,
    "1A-3CDE":7,
    "2B-2F":8,
  }

  const sorted16 = []
  if (!loading) {


    for(let i=0; i<games16Array.length; i++) {
      if(bracket16Sort.hasOwnProperty(games16Array[i].eventname)){
        sorted16.push({teaminfo:games16Array[i],teamsort:bracket16Sort[games16Array[i].eventname]})
        
      }
    }
    sorted16.sort(function(a,b ){
      return (a.teamsort - b.teamsort)
    })
    // games16Array.sort(function (a, b) {
      
    // })

   
  }

  return (
    <>
      
    
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
      
      <div className="bracketsBody">
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
          <div className="container1">
            <div className="split split-one">
              <div className="round round-one current">
                <div className="round-details">
                  ??ttondelsfinal
                  <br />
                  <span className="date">"DATE"</span>
                </div>

                {sorted16.map((game, key) => {
                  let homeOpacity = ""
                  let awayOpacity = ""

                  const teams = game.teaminfo.eventname.split("-")
                  const home = teams[0]
                  const away = teams[1]
                  const HomeFlag = Flags[getTeamFlag(game.teaminfo.home_team)];
                  const AwayFlag = Flags[getTeamFlag(game.teaminfo.away_team)];
                  
                  if(game.teaminfo.winner === game.teaminfo.home_team){
                    awayOpacity = "awayOpacity"
                  }else if(game.teaminfo.winner === game.teaminfo.away_team) {
                    homeOpacity = "homeOpacity"
                  }
                  if(game.teaminfo.home_team !== "" && game.teaminfo.away_team !== ""){
                    return (
                      <ul key={key} className="matchup"> 
                        <li className={`team team-top ${homeOpacity}`}>
                          
                        <span className="flag">
                            <HomeFlag width="40px" />
                          </span>
                          {game.teaminfo.home_team}
                          <span className="score">{game.teaminfo.home_final}</span>
                        </li>
                        <li className={`team team-bottom ${awayOpacity}`}>
                        <span className="flag">
                            <AwayFlag width="40px" />
                          </span>
                          {game.teaminfo.away_team}
                          <span className="score">{game.teaminfo.away_final}</span>
                        </li>
                      </ul>
                    );
                  } else {
                    return (
                      <ul key={key} className="matchup">
                        <li className="team team-top">
                          {home}
                          <span className="score">{game.teaminfo.home_final}</span>
                        </li>
                        <li className="team team-bottom">
                          {away}
                          <span className="score">{game.teaminfo.away_final}</span>
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
                {gamesQuarter.map((game, key2) => {
                  let homeOpacity = ""
                  let awayOpacity = ""
                  if(game.winner === game.home_team){
                    awayOpacity = "awayOpacity"
                  }else if(game.winner === game.away_team) {
                    homeOpacity = "homeOpacity"
                  }
                  const home = game.home_team;
                  const away = game.away_team;
                  const teams = game.eventname.split("-");
                  const home_pre = teams[0];
                  const away_pre = teams[1];
                  const HomeFlag = Flags[getTeamFlag(home)];
                  const AwayFlag = Flags[getTeamFlag(away)];
                  
                  if (game.home_team !== "" && game.away_team !== "") {
                    return (
                      <ul key={key2} className="matchup">
                        <li className={`team team-top ${homeOpacity}`}>
                          <span className="flag">
                            <HomeFlag width="40px" />
                          </span>
                          <span> </span>
                          {home}
                          <span className="score">{game.home_final}</span>
                        </li>
                        <li className={`team team-bottom ${awayOpacity}`}>
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
                      <ul key={key2} className="matchup">
                        <li className={`team team-top ${homeOpacity}`}>
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
                {gamesSemi.map((game, key3) => {
                  let homeOpacity = ""
                  let awayOpacity = ""
                  if(game.winner === game.home_team){
                    awayOpacity = "awayOpacity"
                  }else if(game.winner === game.away_team) {
                    homeOpacity = "homeOpacity"
                  }
                  const home = game.home_team;
                  const away = game.away_team;
                  const teams = game.eventname.split("-");
                  const home_pre = teams[0];
                  const away_pre = teams[1];
                  const HomeFlag = Flags[getTeamFlag(home)];
                  const AwayFlag = Flags[getTeamFlag(away)];

                  if (game.home_team !== "" && game.away_team !== "") {
                    return (
                      <ul key={key3} className="matchup">
                        <li className={`team team-top ${homeOpacity}`}>
                          <span className="flag">
                            <HomeFlag width="40px" />
                          </span>
                          <span> </span>
                          {home}
                          <span className="score">{game.home_final}</span>
                        </li>
                        <li className={`team team-bottom ${awayOpacity}`}>
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
                      <ul key={key3} className="matchup">
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
                  {gamesFinal.map((game, key4) => {
                    
                    const winner = game.winner;
                    const WinnerFlag = Flags[getTeamFlag(winner)];
                    if (game.winner !== "") {
                      return (
                        
                          <ul key={key4} className="matchup">
                            <li className="team team-top">
                              <span className="flag">
                              <WinnerFlag width="40px" />
                              </span>
                              Winner : {winner}
                            </li>
                          </ul>
                        
                      );
                    } else {
                      return (
                        <div key={key4}>
                          <span className="date"></span>
                        </div>
                      );
                    }
                  })}
                </div>
                {gamesFinal.map((game, key5) => {
                  let homeOpacity = ""
                  let awayOpacity = ""
                  if(game.winner === game.home_team){
                    awayOpacity = "awayOpacity"
                  }else if(game.winner === game.away_team) {
                    homeOpacity = "homeOpacity"
                  }
                  const home = game.home_team;
                  const away = game.away_team;
                  const teams = game.eventname.split("-");
                  const home_pre = teams[0];
                  const away_pre = teams[1];
                  const HomeFlag = Flags[getTeamFlag(home)];
                  const AwayFlag = Flags[getTeamFlag(away)];

                  if (game.home_team !== "" && game.away_team !== "") {
                    return (
                      <ul key={key5} className="matchup">
                        <li className={`team team-top ${homeOpacity}`}>
                          <span className="flag">
                            <HomeFlag width="40px" />
                          </span>
                          <span> </span>
                          {home}
                          <span className="score">{game.home_final}</span>
                        </li>
                        <li className={`team team-bottom ${awayOpacity}`}>
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
                      <ul key={key5} className="matchup">
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
            
          </div>
        </section>
      </div>
    </>
  );
}

export default Brackets;
