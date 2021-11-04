import React, { useState, useEffect } from "react";
import "../Brackets.css";
import server from "../Global/config";
import axios from "axios";

function Brackets() {
  const useGetGames = () => {
    const [gamesArray, setGamesArray] = useState([]);
    const [loading, setLoading] = useState(true);
    const instance = axios.create({ baseURL: server });

    const fetchCountries = async () => {
      try {
        const data = await instance.get(`euro_events?grp=Euro 1/8 finals`);
        setGamesArray(data.data);
      } catch (err) {
        console.log(err);
      }

      setLoading(false);
    };

    useEffect(() => {
      fetchCountries();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { loading, gamesArray };
  };

  const { loading, gamesArray } = useGetGames();
  if (!loading) {
    console.log(gamesArray);
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

                {gamesArray.map((game) => {
                  const teams = game.eventname.split("-")
                  const home = teams[0]
                  const away = teams[1]

                  if(game.home_team !== ""){
                    return (
                      <ul className="matchup">
                        <li className="team team-top">
                          {game.home_team}
                          <span className="score">{game.home_final}</span>
                        </li>
                        <li className="team team-bottom">
                          {game.away_team}
                          <span className="score">{game.away_final}</span>
                        </li>
                      </ul>
                    );
                  }else {
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
                <ul className="matchup">
                  <li className="team team-top">
                    &nbsp;<span className="score">&nbsp;</span>
                  </li>
                  <li className="team team-bottom">
                    &nbsp;<span className="score">&nbsp;</span>
                  </li>
                </ul>
                <ul className="matchup">
                  <li className="team team-top">
                    &nbsp;<span className="score">&nbsp;</span>
                  </li>
                  <li className="team team-bottom">
                    &nbsp;<span className="score">&nbsp;</span>
                  </li>
                </ul>
                <ul className="matchup">
                  <li className="team team-top">
                    &nbsp;<span className="score">&nbsp;</span>
                  </li>
                  <li className="team team-bottom">
                    &nbsp;<span className="score">&nbsp;</span>
                  </li>
                </ul>
                <ul className="matchup">
                  <li className="team team-top">
                    &nbsp;<span className="score">&nbsp;</span>
                  </li>
                  <li className="team team-bottom">
                    &nbsp;<span className="score">&nbsp;</span>
                  </li>
                </ul>
              </div>
              {/* !-- END ROUND TWO --> */}

              <div className="round round-three">
                <div className="round-details">
                  Semi-Final
                  <br />
                  <span className="date">"DATE"</span>
                </div>
                <ul className="matchup">
                  <li className="team team-top">
                    &nbsp;<span className="score">&nbsp;</span>
                  </li>
                  <li className="team team-bottom">
                    &nbsp;<span className="score">&nbsp;</span>
                  </li>
                </ul>
                <ul className="matchup">
                  <li className="team team-top">
                    &nbsp;<span className="score">&nbsp;</span>
                  </li>
                  <li className="team team-bottom">
                    &nbsp;<span className="score">&nbsp;</span>
                  </li>
                </ul>
              </div>
              {/* <!-- END ROUND THREE -->		 */}
            </div>

            <div className="champion">
              <div className="final">
                <i className="fa fa-trophy"></i>
                <div className="round-details">
                  Final <br />
                  <span className="date">"DATE"</span>
                </div>
                <ul className="matchup championship">
                  <li className="team team-top">
                    &nbsp;<span className="vote-count">&nbsp;</span>
                  </li>
                  <li className="team team-bottom">
                    &nbsp;<span className="vote-count">&nbsp;</span>
                  </li>
                </ul>
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
