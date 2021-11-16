import React, { useState, useEffect } from "react";
import "../Brackets.css";
import server from "../Global/config";
import axios from "axios";

import { Parallax } from "react-parallax";

function Update() {
  const chunkedGames = [];
  const chunkedCountries = [];

  const useGetGames = () => {
    const [gamesArray, setGamesArray] = useState([]);
    const [array16, setArray16] = useState([]);
    const [arrayQuarter, setArrayQuarter] = useState([]);
    const [arraySemi, setArraySemi] =useState([])
    



    const [countriesArray, setCountriesArray] = useState([]);

    const [loading, setLoading] = useState(true);

    const groups = [
      "EURO Grp. A",
      "EURO Grp. B",
      "EURO Grp. C",
      "EURO Grp. D",
      "EURO Grp. E",
      "EURO Grp. F",
    ];

    const instance = axios.create({ baseURL: server });

    const fetchCountries = async () => {
      try {
        const data2 = await instance.get(`countries?_sort=group:ASC`);
        setCountriesArray(data2.data);
      } catch (err) {
        console.log(err);
      }
    };
    const fetchGroupGames = async () => {
      try {
        for (let i = 0; i < groups.length; i++) {
          const { data } = await instance.get(`Euro_events?grp=${groups[i]}`);
          setGamesArray((games) => [...games, ...data]);
        }
      } catch (err) {
        console.log(err);
      }
    };
    
    const fetchSemiGames = async () => {
      try {
        
          const { data } = await instance.get(`Euro_events?grp=EURO Semi finals`);
          setArraySemi(data);
        
      } catch (err) {
        console.log(err);
      }
    };
    const fetchQuarterGames = async () => {
      try {
        
          const { data } = await instance.get(`Euro_events?grp=EURO Quarter finals`);
          setArrayQuarter(data);
        
      } catch (err) {
        console.log(err);
      }
    };
    const fetch16Games = async () => {
      try {
        
          const { data } = await instance.get(`Euro_events?grp=EURO 1/8 finals`);
          setArray16(data);
        
      } catch (err) {
        console.log(err);
      }

      setLoading(false);
    };

    useEffect(() => {
      
      fetchSemiGames();
      fetchQuarterGames();
      fetchCountries();
      fetchGroupGames();
      fetch16Games();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { loading, gamesArray, countriesArray, array16, arrayQuarter, arraySemi};
  };

  const { loading, gamesArray, countriesArray , array16, arrayQuarter, arraySemi} = useGetGames();
  function uppdateElim() {
    if (!loading) {
      // All data should be available
      const thirdPlaceArray = [];
      const instance = axios.create({ baseURL: server });
      for (let i = 0; i < gamesArray.length; i += 6) {
        chunkedGames.push(gamesArray.slice(i, i + 6));
      }
      for (let i = 0; i < countriesArray.length; i += 4) {
        chunkedCountries.push(countriesArray.slice(i, i + 4));
      }
      for (let j = 0; j < chunkedGames.length; j++) {
        var counter = 0;
        for (let i = 0; i < chunkedGames[j].length; i++) {
          if (chunkedGames[j][i].status === "Finished") {
            counter++;
          }
        }
        if (counter === 6) {
          const teamArray = [];
          const team1 = {
            country: chunkedCountries[j][0].name,
            score: chunkedCountries[j][0].group_score,
            grp: chunkedCountries[j][0].group,
            goals: chunkedCountries[j][0].group_goals,
          };
          const team2 = {
            country: chunkedCountries[j][1].name,
            score: chunkedCountries[j][1].group_score,
            goals: chunkedCountries[j][1].group_goals,
            grp: chunkedCountries[j][0].group,
          };
          const team3 = {
            country: chunkedCountries[j][2].name,
            score: chunkedCountries[j][2].group_score,
            goals: chunkedCountries[j][2].group_goals,
            grp: chunkedCountries[j][0].group,
          };
          const team4 = {
            country: chunkedCountries[j][3].name,
            score: chunkedCountries[j][3].group_score,
            goals: chunkedCountries[j][3].group_goals,
            grp: chunkedCountries[j][0].group,
          };
          teamArray.push(team1, team2, team3, team4);
          console.log(teamArray)
          let returnValue;
          teamArray.sort(function (a, b) {
            returnValue = (b.score - a.score);
            if(b.score === a.score){
              let matchOne = `${a.country}-${b.country}`
              let matchTwo = `${b.country}-${a.country}`
              returnValue = (b.goals - a.goals)
              console.log(matchTwo)
              console.log(chunkedGames[j])
              chunkedGames[j].forEach((game) => {
                if (game.eventname === matchOne || game.eventname === matchTwo) {
                  if (game.winner === a.country) {
                      console.log(`Winner found: ${game.winner}`)
                      returnValue = -1
                    }
                   else if(game.winner === b.country){
                    returnValue = -1
                  }else if(game.winner === "X") {
                    console.log(`no winner ${game.winner}`)
                    returnValue = (b.goals - a.goals)
                  }
                }
              }
              )
              // if (matchOne === chunkedGames[j])
              // console.log(chunkedGames[j])
            }
            return returnValue;
          });
          console.log(teamArray)
  
  
          const winner = teamArray[0].country;
          const secondPlace = teamArray[1].country;
          const thirdPlace = teamArray[2];
          thirdPlaceArray.push(thirdPlace);
          
          const qualifiedOne = []
        const fetchCountriesWinner = async() =>{
          try {
            for (let i = 0; i < 4; i++) {
              const response = await instance.get(`countries?name=${winner}`)
            qualifiedOne.push(response.data[0].id)
            }
            return qualifiedOne
          }
          catch (err) {
            console.log(err)
          }
        }
        fetchCountriesWinner().then((resp) => putQualifiedWinner(resp))

        const putQualifiedWinner = async() => {
          try {
            for(let i = 0; i< qualifiedOne.length; i++) {
              await instance.put(`countries/${qualifiedOne[i]}`, {
                Qualified:true
              })
            }
          } 
          catch (err){
            console.log(err)
          }
        }
        const qualifiedTwo = []
        const fetchCountriesSecond = async() =>{
          try {
            for (let i = 0; i < 4; i++) {
              const response = await instance.get(`countries?name=${secondPlace}`)
            qualifiedTwo.push(response.data[0].id)
            }
            return qualifiedTwo
          }
          catch (err) {
            console.log(err)
          }
        }
        fetchCountriesSecond().then((resp) => putQualifiedSecond(resp))

        const putQualifiedSecond = async() => {
          try {
            for(let i = 0; i< qualifiedTwo.length; i++) {
              await instance.put(`countries/${qualifiedTwo[i]}`, {
                Qualified:true
              })
            }
          } 
          catch (err){
            console.log(err)
          }
        }
          const groupsObject = {
            "EURO Grp. A": {
              games: ["1A-3CDE", "2A-2C"],
              side: ["home", "home"],
              place: [winner, secondPlace],
            },
            "EURO Grp. B": {
              games: ["1B-3ACD", "2B-2F"],
              side: ["home", "home"],
              place: [winner, secondPlace],
            },
            "EURO Grp. C": {
              games: ["1C-3ABF", "2A-2C"],
              side: ["home", "away"],
              place: [winner, secondPlace],
            },
            "EURO Grp. D": {
              games: ["1D-3BEF", "1E-2D"],
              side: ["home", "away"],
              place: [winner, secondPlace],
            },
            "EURO Grp. E": {
              games: ["1E-2D", "1F-2E"],
              side: ["home", "away"],
              place: [winner, secondPlace],
            },
            "EURO Grp. F": {
              games: ["1F-2E", "2B-2F"],
              side: ["home", "away"],
              place: [winner, secondPlace],
            },
          };
          const groupname = teamArray[0].grp;
         
          if (groupsObject.hasOwnProperty(groupname)) {
            const fetchGame1a = async (gamename) => {
              try {
                const response = await instance.get(
                  `euro_events?eventname=${gamename}`
                );
    
                const id1a = response.data[0].id;
                
                return id1a;
              } catch (err) {
                console.log(err);
              }
            };
            //Add team to event.
            //fetchGame1a().then((resp) => putWinner(resp))
            const putWinner = async (id, side, place) => {
              if (side === "home") {
                await instance.put(`euro_events/${id}`, {
                  home_team: place,
                  status:"Not Started"
                });
              } else if (side === "away") {
                await instance.put(`euro_events/${id}`, {
                  away_team: place,
                  status:"Not Started"

                });
              }
            };
            if (
              groupsObject[groupname].games.length &&
              groupsObject[groupname].side.length
            ) {
              groupsObject[groupname].games.forEach((game, index) => {
                fetchGame1a(game).then((id) =>
                  putWinner(
                    id,
                    groupsObject[groupname].side[index],
                    groupsObject[groupname].place[index]
                  )
                );
              });
            }
          }
        }
      }
      if (thirdPlaceArray.length === 6) {
        const letterArray= []
        const lineup16 = {
          "ABCD": {
            games: ["1A-3C", "1B-3D","1C-3A", "1D-3B"]
          },
          "ABCE": {
            games: ["1A-3C", "1B-3A","1C-3B", "1D-3E"]
          },
          "ABCF": {
            games: ["1A-3C", "1B-3A","1C-3B", "1D-3F"]
          },
          "ABDE": {
            games: ["1A-3D", "1B-3A","1C-3B", "1D-3E"]
          },
          "ABDF": {
            games: ["1A-3D", "1B-3A","1C-3B", "1D-3F"]
          },
          "ABEF": {
            games: ["1A-3E", "1B-3A","1C-3B", "1D-3F"]
          },
          "ACDE": {
            games: ["1A-3C", "1B-3D","1C-3A", "1D-3E"]
          },
          "ACDF": {
            games: ["1A-3C", "1B-3D","1C-3A", "1D-3F"]
          },
          "ACEF": {
            games: ["1A-3C", "1B-3A","1C-3F", "1D-3E"]
          },
          "ADEF": {
            games: ["1A-3D", "1B-3A","1C-3F", "1D-3E"]
          },
          "BCDE": {
            games: ["1A-3C", "1B-3D","1C-3B", "1D-3E"]
          },
          "BCDF": {
            games: ["1A-3C", "1B-3D","1C-3B", "1D-3F"]
          },
          "BCEF": {
            games: ["1A-3E", "1B-3C","1C-3B", "1D-3F"]
          },
          "BDEF": {
            games: ["1A-3E", "1B-3D","1C-3B", "1D-3F"]
          },
          "CDEF": {
            games: ["1A-3C", "1B-3D","1C-3F", "1D-3E"]
          },
        }
        let letter = ""
        
        thirdPlaceArray.sort(function (a, b) {
          if(b.score === a.score) {
            return b.goals - a.goals
          }
          return b.score - a.score;
        });
        
        for (let i = 0; i< thirdPlaceArray.length-2; i++) {
          letter = thirdPlaceArray[i].grp.split("Grp. ")[1]
          letterArray.push(letter)
        }
        letterArray.sort()
        const joined = letterArray.join('')
        
        
        const qualifiedThird = []
        const fetchCountries = async() =>{
          try {
            for (let i = 0; i < 4; i++) {
              const response = await instance.get(`countries?name=${thirdPlaceArray[i].country}`)
            qualifiedThird.push(response.data[0].id)
            }
            return qualifiedThird
          }
          catch (err) {
            console.log(err)
          }
        }
        fetchCountries().then((resp) => putQualified(resp))

        const putQualified = async() => {
          try {
            for(let i = 0; i< qualifiedThird.length; i++) {
              await instance.put(`countries/${qualifiedThird[i]}`, {
                Qualified:true
              })
            }
          } 
          catch (err){
            console.log(err)
          }
        }
        const fetchGame1 = async () => {
          try {
            const response = await instance.get(`euro_events?eventname=1A-3CDE`);
            const id31 = response.data[0].id;
            const sync = lineup16[joined].games[0].split("3")[1]
            let sendCountry = ""
            for(let i = 0; i<thirdPlaceArray.length; i++){
              const grp = thirdPlaceArray[i].grp.split(". ")[1]
              
              if(grp === sync){
                sendCountry = thirdPlaceArray[i].country
              }
            }
            return ({id31, sendCountry});
          } catch (err) {
            console.log(err);
          }
        };
  
        fetchGame1().then((resp) => putWinner(resp));
        const putWinner = async (resp) => {
    
          await instance.put(`euro_events/${resp.id31}`, {
            away_team: resp.sendCountry,
            status:"Not Started"

          });
        };
  
        const fetchGame2 = async () => {
          try {
            const response = await instance.get(`euro_events?eventname=1B-3ACD`);
            const id32 = response.data[0].id;
            const sync = lineup16[joined].games[1].split("3")[1]
            let sendCountry = ""
            for(let i = 0; i<thirdPlaceArray.length; i++){
              const grp = thirdPlaceArray[i].grp.split(". ")[1]
              if(grp === sync){
                sendCountry = thirdPlaceArray[i].country
              }
            }
            return ({id32, sendCountry});
          } catch (err) {
            console.log(err);
          }
        };
        fetchGame2().then((resp) => putSecond(resp));
        const putSecond = async (resp) => {
          
          await instance.put(`euro_events/${resp.id32}`, {
            away_team: resp.sendCountry,
            status:"Not Started"
          });
        };
        const fetchGame3 = async () => {
          try {
            const response = await instance.get(`euro_events?eventname=1C-3ABF`);
            const id33 = response.data[0].id;
            const sync = lineup16[joined].games[2].split("3")[1]
            let sendCountry = ""
            for(let i = 0; i<thirdPlaceArray.length; i++){
              const grp = thirdPlaceArray[i].grp.split(". ")[1]
              
              if(grp === sync){
                sendCountry = thirdPlaceArray[i].country
              }
            }
            return ({id33, sendCountry});
          } catch (err) {
            console.log(err);
          }
        };
        fetchGame3().then((resp) => putThird(resp));
        const putThird = async (resp) => {
          await instance.put(`euro_events/${resp.id33}`, {
            away_team: resp.sendCountry,
            status:"Not Started"

          });
        };
        const fetchGame4 = async () => {
          try {
            const response = await instance.get(`euro_events?eventname=1D-3BEF`);
            const id34 = response.data[0].id;
            const sync = lineup16[joined].games[3].split("3")[1]
            let sendCountry = ""
            for(let i = 0; i<thirdPlaceArray.length; i++){
              const grp = thirdPlaceArray[i].grp.split(". ")[1]
              
              if(grp === sync){
                sendCountry = thirdPlaceArray[i].country
              }
            }
            return ({id34, sendCountry});
          } catch (err) {
            console.log(err);
          }
        };
        fetchGame4().then((resp) => putFourth(resp));
        const putFourth = async (resp) => {
          await instance.put(`euro_events/${resp.id34}`, {
            away_team: resp.sendCountry,
            status:"Not Started"

          });
        };
  
        
  
        // const putHomeAway = async() => {
        //   const fetchRoundOf16 = async () => {
        //     try {
        //       const response = await instance.get(`euro_events?grp_contains=EURO 1/8 finals`);
        //       return(
        //         response
        //       )
        //     } catch (err) {
        //       console.log(err);
        //     }
        //   };
        //   fetchRoundOf16().then()
        // }
        // putHomeAway()
      }
    }
  }
  

  function updateElim16(){
    const   quarterLineup = {
      "2A-2C": {
        game:"Winner 2A/2C-Winner 1D/3BEF",
        side:"home" 
      },
      "1D-3BEF": {
        game:"Winner 2A/2C-Winner 1D/3BEF",
        side:"away"
      },
      "1B-3ACD": {
        game:"Winner 1B/3ACD-Winner 1F/2E",
        side:"home"
      },
      "1F-2E": {
        game:"Winner 1B/3ACD-Winner 1F/2E",
        side:"away"
      },
      "1C-3ABF": {
        game:"Winner 1C/3ABF-Winner 1E/2D",
        side:"home"
      },
      "1E-2D": {
        game:"Winner 1C/3ABF-Winner 1E/2D",
        side:"away"
      },
      "1A-3CDE": {
        game:"Winner 1A/3CDE-Winner 2B/2F",
        side:"home"
      },
      "2B-2F": {
        game:"Winner 1A/3CDE-Winner 2B/2F",
        side:"away"
      },
      
    };
    for(let i = 0; i<array16.length; i++){  
      const instance = axios.create({ baseURL: server });
      if(array16[i].status === "Finished"){
        const eventname = array16[i].eventname
        const winner = array16[i].winner
        const event = quarterLineup[eventname].game
        console.log(eventname)
        if(quarterLineup.hasOwnProperty(eventname)){
          const getEventId = async() =>{
            const response = await instance.get(`euro_events?eventname=${event}`)
            const home_team = response.data[0].home_team
            const away_team = response.data[0].away_team

            const eventId = response.data[0].id
            return (
              {eventId,home_team,away_team}
            )
        }
        getEventId().then((resp)=>sendToQuarter(resp))
         function sendToQuarter(resp) {
           const id=resp.eventId
           const home = resp.home_team
           const away = resp.away_team
           console.log(home,away)
           let status = ""
          if(away !== "" && home !== ""){
            status = "Not Started"
          }else (
            status = "Not Ready"
          )
           console.log(status)
           console.log(resp)
          const side = quarterLineup[eventname].side
          if(side === "home"){
            const sendWinner = async() =>{
              await instance.put(`euro_events/${id}`, {
                home_team:winner,
                status:status
              })
          }
          sendWinner()
          }else if (side === "away"){
            const sendWinner = async() =>{
              await instance.put(`euro_events/${id}`, {
                away_team:winner,
                status:status

              })
          }
          sendWinner()
          }
         } 
          

          
        }
       
      }
    }
   
  }

  function updateQuarter() {
    const   semiLineup = {
      "Winner 2A/2C-Winner 1D/3BEF": {
        game:"Winner QF 1-Winner QF 2",
        side:"home" 
      },
      "Winner 1B/3ACD-Winner 1F/2E": {
        game:"Winner QF 1-Winner QF 2",
        side:"away"
      },
      "Winner 1C/3ABF-Winner 1E/2D": {
        game:"Winner QF 3-Winner QF 4",
        side:"home"
      },
      "Winner 1A/3CDE-Winner 2B/2F": {
        game:"Winner QF 3-Winner QF 4",
        side:"away"
      }
      
    };
    for(let i = 0; i<arrayQuarter.length; i++){  
      const instance = axios.create({ baseURL: server });
      if(arrayQuarter[i].status === "Finished"){
        console.log(arrayQuarter[i])
        const eventname = arrayQuarter[i].eventname
        console.log(eventname)
        const winner = arrayQuarter[i].winner
        const event = semiLineup[eventname].game
        
        if(semiLineup.hasOwnProperty(eventname)){
          const getEventId = async() =>{
            const response = await instance.get(`euro_events?eventname=${event}`)
            const home_team = response.data[0].home_team
            const away_team = response.data[0].away_team
            const eventId = response.data[0].id
            return (
              {eventId,home_team,away_team}
            )
        }
        getEventId().then((resp)=>sendToSemi(resp))
         function sendToSemi(resp) {
          const id=resp.eventId
          const home = resp.home_team
          const away = resp.away_team
          let status = ""
         if(away !== "" && home !== ""){
           status = "Not Started"
         }else (
           status = "Not Ready"
         )
          const side = semiLineup[eventname].side
          if(side === "home"){
            const sendWinner = async() =>{
              await instance.put(`euro_events/${id}`, {
                home_team:winner,
                status:status
              })
          }
          sendWinner()
          }else if (side === "away"){
            const sendWinner = async() =>{
              await instance.put(`euro_events/${id}`, {
                away_team:winner,
                status:status
              })
          }
          sendWinner()
          }
         } 
          
      
          
        }
       
      }
    }
  }
  function updateSemi() {
    const   finalLineup = {
      "Winner QF 1-Winner QF 2": {
        game:"Winner SF 1-Winner SF 2",
        side:"home" 
      },
      "Winner QF 3-Winner QF 4": {
        game:"Winner SF 1-Winner SF 2",
        side:"away"
      }
      
    };
    console.log(arraySemi)
    for(let i = 0; i<arraySemi.length; i++){  
      
      const instance = axios.create({ baseURL: server });
      if(arraySemi[i].status === "Finished"){
        
        const eventname = arraySemi[i].eventname
        const winner = arraySemi[i].winner
        const event = finalLineup[eventname].game
        
        if(finalLineup.hasOwnProperty(eventname)){
          const getEventId = async() =>{
            const response = await instance.get(`euro_events?eventname=${event}`)
            const home_team = response.data[0].home_team
            const away_team = response.data[0].away_team
            const eventId = response.data[0].id
            return (
              {eventId,home_team,away_team}
            )
        }
        getEventId().then((resp)=>sendToFinal(resp))
         function sendToFinal(resp) {
          const id=resp.eventId
          const home = resp.home_team
          const away = resp.away_team
          let status = ""
         if(away !== "" && home !== ""){
           status = "Not Started"
         }else (
           status = "Not Ready"
         )
          const side = finalLineup[eventname].side
          if(side === "home"){
            const sendWinner = async() =>{
              await instance.put(`euro_events/${id}`, {
                home_team:winner,
                status:status
              })
          }
          sendWinner()
          }else if (side === "away"){
            const sendWinner = async() =>{
              await instance.put(`euro_events/${id}`, {
                away_team:winner,
                status:status
              })
          }
          sendWinner()
          }
         } 
          
      
          
        }
       
      }
    }
  }

  const imgAdmin = 'https://images.unsplash.com/photo-1570221622224-3bb8f08f166c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1460&q=80'

  return <Parallax key="" bgImage={imgAdmin} strength={100}><div>
    <div style={{ height: "auto"}} className="min-vh-100">
      <div style={{paddingTop: '15%'}}>
  <button className='btn btn-warning' onClick={uppdateElim}> Uppdatera från gruppspel till eliminering </button> <br/><br/>
  <button className='btn btn-warning' onClick={updateElim16}> Uppdatera från runda 16 till kvartsfinal</button><br/><br/>
  <button className='btn btn-warning' onClick={updateQuarter}> Uppdatera från kvartsfinal till semifinal</button><br/><br/>
  <button className='btn btn-warning'onClick={updateSemi}> Uppdatera från semifinal till final</button>
  </div>
  </div>
  </div>
  </Parallax>



}

export default Update;
