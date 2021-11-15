import React, { useState, useEffect } from "react";
import axios from "axios";
import server from "../Global/config";
import Flags from "country-flag-icons/react/3x2";
import setTeamFlag from "../Game/Flags";
import Styled from "styled-components";

 const MediaQgames = Styled.span
  `
  font-size: 30px;
  @media (max-width: 1030px ) {
    font-size: 20px;
  }
  @media (max-width: 825px ) {
    font-size: 10px;
    font-weight: 900;
  }
  @media (max-width: 637px ) {
    content: '.';
    display: inline-block;
    width: 100%;
  }
  @media (max-width: 375px ) {
    content: '.';
    display: inline-block;
    width: 100%;
  }

  `;

function Game({ event_id, eventname, status, score_given, deadline }) {
  const instance = axios.create({ baseURL: server });
  const playingTeams = eventname.split("-");
  const home_team = playingTeams[0];
  const away_team = playingTeams[1];
  const [gameId, setGameId] = useState();
  const [gameGrp, setGameGrp] = useState();
  const [clicked, setClicked] = useState(false);


  const [gameResult, setGameResult] = useState();
  const [homeFlag, setHomeFlag] = useState("AQ");
  const [awayFlag, setAwayFlag] = useState("AQ");
  const token = localStorage.getItem("jwt");


 
  var counter = 0; 
  useEffect(() => {
    const fetchGameId = async () => {
      const response = await instance.get(`Euro_events?eid_xml=${event_id}`);
      setGameGrp(response.data[0].grp)
      setGameId(response.data[0].id);
    };
    fetchGameId();

    setHomeFlag(setTeamFlag("home", home_team));
    setAwayFlag(setTeamFlag("away", away_team));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    
  }, [gameResult]);
  
  function updateGameStatus() {
    setClicked(true)
  
  
    counter +=1;
    if (counter === 1){
    const putStatus = async () => {
      await instance.put(
        `euro_events/${gameId}`,
        {
          status: "Finished",
        },
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      );
      
    };
    putStatus().then(sendBetResults());
  }
  }

  function sendBetResults() {
    const fetchResults = async () => {
      const response = await instance.get(`results?event_id=${event_id}`);

      const home_goals = response.data[0].home_goals;
      const away_goals = response.data[0].away_goals;
      const winner = response.data[0].winner_team;
      const playingTeams = eventname.split("-");
      const home_team = playingTeams[0];
      const away_team = playingTeams[1];
      const response2 = await instance.get(`countries?name=${home_team}`);
      const home_id = response2.data[0].id;
      const grpGoalsHome = Number(response2.data[0].group_goals)
      const home_score = Number(response2.data[0].group_score);
      const response3 = await instance.get(`countries?name=${away_team}`);
      const away_id = response3.data[0].id;
      const grpGoalsAway = Number(response3.data[0].group_goals)
      const away_score = Number(response3.data[0].group_score);

      setGameResult(response.data[0]);

      if (score_given === "no" && gameGrp.includes("Grp.")) {
        if (winner === home_team) {
          //give home team 3 points and away team 0 points and set active to false
          const putHomePoints = async () => {
            await instance.put(`countries/${home_id}`, {
              group_score: home_score + 3,
              group_goals: grpGoalsHome + home_goals
            });
          };
          putHomePoints();
          const putAwayPoints = async () => {
            await instance.put(`countries/${away_id}`, {
              group_goals: grpGoalsAway + away_goals
            });
          };
          putAwayPoints();
        } else if (winner === away_team) {
          //give away team 3 points and home team 0 points and set active to false
          const putHomePoints = async () => {
            await instance.put(`countries/${home_id}`, {
              group_goals: grpGoalsHome + home_goals
            });
          };
          putHomePoints();
          const putAwayPoints = async () => {
            await instance.put(`countries/${away_id}`, {
              group_score: away_score + 3,
              group_goals: grpGoalsAway + away_goals
            });
          };
          putAwayPoints();
        } else if (winner === "X") {
          //give both teams 1 point and set active to false
          const putHomePoints = async () => {
            await instance.put(`countries/${home_id}`, {
              group_score: home_score + 1,
              group_goals: grpGoalsHome + home_goals
            });
          };
          putHomePoints();
          const putAwayPoints = async () => {
            await instance.put(`countries/${away_id}`, {
              group_score: away_score + 1,
              group_goals: grpGoalsAway + away_goals
            });
          };
          putAwayPoints();
        }
        const putInactive = async () => {
          await instance.put(`euro_events/${gameId}`, {
            score_given: "yes",
          });
        };
        putInactive();
      } else {
        // does not send points
      }

      const putResult = async () => {
        await instance.put(
          `euro_events/${gameId}`,
          {
            winner: winner,
            home_final: home_goals,
            away_final: away_goals,
          },
          {
            headers: {
              Authorization: `bearer ${token}`,
            },
          }
        );
      };
      putResult();

      const resultData = response.data;
      return resultData;
    };
    fetchResults()
      .then((resp) => fetchBet(resp))
      .then((resp) => compareBetsWithResult(resp))
      .then((resp) => sendScores(resp));

    const fetchBet = async (resultData) => {
      const response = await instance.get(
        `bets?euro_event.eid_xml=${event_id}`
      );
      const bets = response.data;
      
      return [bets, resultData];
      
    };
  }

  function compareBetsWithResult(resp) {
      if(resp[0].length > 0) {
        const bets = resp[0];
        const gameResult = resp[1];
        const resultHomeGoals = gameResult[0].home_goals;
        const resultAwayGoals = gameResult[0].away_goals;
        const resultWinner = gameResult[0].winner_team;
        var score = 0;
        var betOwner = "";
        bets.forEach((bet) => {
          betOwner = bet.user.id;
  
          if (bet.Active === true) {
            const bettedHomeGoals = Number(bet.homeTeamGoals);
            const bettedAwayGoals = Number(bet.awayTeamGoals);
            const bettedWinner = bet.winner;
            if (bet.type === "BetOnResult") {
              if (resultHomeGoals === bettedHomeGoals) {
                score = score + 1;
                console.log("Right home goals");
              }
              if (resultAwayGoals === bettedAwayGoals) {
                score = score + 1;
                console.log("Right away goals");
              }
              if (resultWinner === bettedWinner) {
                score = score + 3;
                console.log("Right winner");
              }
            } else if (bet.type === "BetOnGoals") {
              if (resultHomeGoals === bettedHomeGoals) {
                score = score + 1;
  
                console.log("Right home goals");
              }
              if (resultAwayGoals === bettedAwayGoals) {
                score = score + 1;
  
                console.log("Right away goals");
                return;
              }
            } else if (bet.type === "BetOnWinner") {
              if (resultWinner === bettedWinner) {
                score = score + 3;
  
                console.log("Right winner");
              }
            }
          } else {
            return false;
          }
        });
        return [bets, score, betOwner];
      }
      else {
        return(console.log("Inga bets"))
      }
    
  }

  function sendScores(resp) {
    console.log(resp)
    if (resp === undefined) {
      console.log("inga bets")
    } else {
      const userBetId = resp[2];
      const fetchScore = async () => {
        const response = await instance.get(`/users?id=${userBetId}`);
        const userScore = response.data[0].Score;
        return [userScore, resp];
      };
      fetchScore().then((resp2) => calcScore(resp2));
    }
  }
  function calcScore(resp2) {
    const betId = resp2[1][0][0].id;
    const userBetId = resp2[1][2];
    const userScore = resp2[0];
    const scoreToAdd = resp2[1][1];
    const newScore = Number(userScore) + Number(scoreToAdd);

    const updateScore = async () => {
      await instance.put(`users/${userBetId}`, {
        Score: newScore,
      });
    };
    updateScore();
    const updateBet = async () => {
      await instance.put(`bets/${betId}`, {
        Active: false,
        recieved_points:scoreToAdd
      });
    };
    updateBet().then(console.log("Active set to false korv"));
  }
  const HomeFlag = Flags[homeFlag];
  const AwayFlag = Flags[awayFlag];

  const dateArray = deadline.split("T")
  const date = dateArray[0]
  // const year = dateArray[0].split("-")[0]
  // const month = dateArray[0].split("-")[1]
  // const day = dateArray[0].split("-")[2]
  // const hour = dateArray[1].split(":")[0]
  // const min = dateArray[1].split(":")[1]
  // const sek = dateArray[1].split(":")[2].split(".")[0]
  const timeArray = dateArray[1].split(":")
  const time = timeArray[0] + ":" + timeArray[1]
//   var now = new Date();

// var correctGame = new Date(year,month -1,day,hour,min,sek,0) - now;
// if (correctGame < 0) {
//   correctGame += 86400000; // it's after 10am, try 10am tomorrow.
// }

// useEffect(() => {
  
//   const timer = setTimeout(() => {
    
//       updateGameStatus()
//   }, correctGame);

//   return () => {
//     clearTimeout(timer);
//   }
// }, [gameId]);


  return (
    <>
      <div className="game_info mt-3 mb-3 bg-secondary w-50 center" style={{ backgroundColor: 'rgba(52, 52, 52, 0.8)', border: '2px solid black', color: 'white', padding: '35px',}}>


        <HomeFlag width="60px" title="United States" className="..."/>

        <MediaQgames> {eventname} </MediaQgames>
        <AwayFlag width="60px" title="United States" className="..." />

        
        <h3>{status}</h3>
        <br />
        <h3>{date}</h3>
        <br />
        <h3>{time}</h3>
        <br />
        {status === "Not Started"? 
         
            !clicked ? 
           ( <button onClick={updateGameStatus} className="btn btn-success mt-4"> Update Game Status</button> ) : 
            ( <div>Updated</div>)
              
          
         : 
          <> </>
        }
        <br />
      </div>
    </>
  );
}

export default Game;
