import React, { useState, useEffect } from "react";
import server from "../Global/config";
import axios from "axios";
import { Button } from 'react-bootstrap'
function Reset() {
  const [message, setMessage] = useState("")
    const useGetGames = () => {
    const [countryArray,setCountryArray] = useState([]) 
    const [betsArray,setBetsArray] = useState([]) 
    const [gamesArray,setGamesArray] = useState([])
    const [usersArray,setUsersArray] = useState([])
    const instance = axios.create({ baseURL: server });
    const [loading, setLoading] = useState(true);
    const getAllGames = async() => {
        try {
            const response = await instance.get(`Euro_events`);
        
            setGamesArray(response.data)
        
          } catch (err) {
            console.log(err);
          }
    };
    const getAllUsers = async() => {
        try {
            const response = await instance.get(`Users`);
            
            setUsersArray(response.data)
        
          } catch (err) {
            console.log(err);
          }
    };
    const getAllCountries = async() => {
        try {
            const response = await instance.get(`Countries`);
            
            setCountryArray(response.data)
        
          } catch (err) {
            console.log(err);
          }
    };
    const getAllBets = async() => {
        try {
            const response = await instance.get(`Bets`);
            
            setBetsArray(response.data)
        
          } catch (err) {
            console.log(err);
          }
        setLoading(false);  
        
    };
    useEffect(() => {
        getAllGames()
        getAllUsers()
        getAllCountries()
        getAllBets()

        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
    
    return { loading, gamesArray, betsArray, countryArray, usersArray};
  };
  const { loading, gamesArray, betsArray , countryArray, usersArray} = useGetGames()
  
  
  function resetEvent2016() {

  if(!loading) {
    
     const instance = axios.create({ baseURL: server });
     const betsIdArray =[]
      const eventIdArray =[]
      const countryIdArray =[]
      const usersIdArray =[]
      const roundOf16 = []
      const msg = "EM 2016 ÄR ÅTERSTÄLLT"
      setMessage("EM blir återställt... Vänligen lämna inte detta fönster!")
      //reset user score
      for(let i = 0; i<usersArray.length;i++){
        usersIdArray.push(usersArray[i].id)
      }
      for(let i =0; i<usersIdArray.length;i++) {
         
          const resetUserScore = async ()=> {
            await instance.put(`Users/${usersIdArray[i]}`, {
                Score: 0
            })
          }
          resetUserScore()
      }
      //reset euro events
      for(let i = 0; i<gamesArray.length;i++){
        eventIdArray.push(gamesArray[i].id)
        if(gamesArray[i].grp === "EURO 1/8 finals"){
            roundOf16.push(gamesArray[i].id)
        }
      }
      for(let i =0; i<eventIdArray.length;i++) {
          const resetEvents = async ()=> {
            await instance.put(`Euro_events/${eventIdArray[i]}`, {
                status: "Not Started",
                score_given: "no",
                home_final: 0,
                away_final: 0,
                winner:""
            })
          }
          resetEvents()
      }
      for(let i =0; i<roundOf16.length;i++) {
        const resetRoundOf16 = async ()=> {
          await instance.put(`Euro_events/${roundOf16[i]}`, {
              home_team: "",
              away_team: ""
          })
        }
        resetRoundOf16()
    }
      //reset country score(group)
      for(let i = 0; i<countryArray.length;i++){
        countryIdArray.push(countryArray[i].id)
      }
      for(let i =0; i<countryIdArray.length;i++) {
          const resetCountryScore = async ()=> {
            await instance.put(`Countries/${countryIdArray[i]}`, {
                group_score: "0"
            })
          }
          resetCountryScore()
      }
      //reset bets
      for(let i = 0; i<betsArray.length;i++){
        betsIdArray.push(betsArray[i].id)
      }
      for(let i =0; i<betsIdArray.length;i++) {
        const resetBets = async ()=> {
          await instance.delete(`Bets/${betsIdArray[i]}`)
        }
        
        resetBets()
        .then(setMsg)
        function setMsg() {
          setMessage(msg)
          // window.location.reload()
        }
        
    }
      
  }
}
    return (
      <>
        <div className="min-vh-100 d-flex flex-column" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Button variant="danger" size="lg" onClick={resetEvent2016}>
      Återställ EM 2016 
      
    </Button>{' '}
    <h2 className="mt-5">{message}</h2>
        </div>

        </>
    )
}

export default Reset
