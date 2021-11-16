import React, { useState, useEffect } from "react";
import server from "../Global/config";
import axios from "axios";
import { Button } from 'react-bootstrap'

// reset function to be able to reset the whole event if something should be changed or if it should be used for some other similar event 
function Reset() {
  const [message, setMessage] = useState("")


  //special kind of very clean function from stack overflow where many functions have own returns that are exported and put inside a const. 
  //all the data that comes from this function is certain to be renderd before anything else

  //function for getting every single event, country, bet and user in order to reset them to their original values
    const useGetGames = () => {
    const [countryArray,setCountryArray] = useState([]) 
    const [betsArray,setBetsArray] = useState([]) 
    const [gamesArray,setGamesArray] = useState([])
    const [usersArray,setUsersArray] = useState([])
    const instance = axios.create({ baseURL: server });
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    //fetching all events
    const getAllGames = async() => {
        try {
            const response = await instance.get(`Euro_events`);
        
            setGamesArray(response.data)
        
          } catch (err) {
            console.log(err);
          }
    };
    //fetching all users
    const getAllUsers = async() => {
        try {
            const response = await instance.get(`Users`);
            
            setUsersArray(response.data)
        
          } catch (err) {
            console.log(err);
          }
    };
    //fetching all countries
    const getAllCountries = async() => {
        try {
            const response = await instance.get(`Countries`);
            
            setCountryArray(response.data)
        
          } catch (err) {
            console.log(err);
          }
    };
    //fetching all bets
    const getAllBets = async() => {
        try {
            const response = await instance.get(`Bets`);
            
            setBetsArray(response.data)
        
          } catch (err) {
            console.log(err);
          }
        setLoading(false);  
        
    };
    //checking if user has admin authority
    const getAdmin = async() => {
      const instance = axios.create({ baseURL: server });
        const userId = localStorage.getItem("user_id");
        if(userId !== null) {
      try {
        const response = await instance.get(`/users?id=${userId}`);
            setIsAdmin(response.data[0].isAdmin);
      } catch(err) {
        console.log(err)
      }
    }}
    
    useEffect(() => {
        getAllGames()
        getAllUsers()
        getAllCountries()
        getAllBets()
        getAdmin()

        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
    
    return { loading, gamesArray, betsArray, countryArray, usersArray, isAdmin};
  };

  
  const { loading, gamesArray, betsArray , countryArray, usersArray, isAdmin} = useGetGames()
 
 
  // function for resetting all data
  function resetEvent2016() {

  if(!loading) {
    
     const instance = axios.create({ baseURL: server });
     const betsIdArray =[]
      const eventIdArray =[]
      const countryIdArray =[]
      const usersIdArray =[]
      const roundOf16 = []
      const quarter = []
      const semi = []
      const final = []

      //message for admin to see when the function is still running and when he can leave the window
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
        if(gamesArray[i].grp === "EURO Quarter finals"){
          quarter.push(gamesArray[i].id)
        }
        if(gamesArray[i].grp === "EURO Semi finals"){
          semi.push(gamesArray[i].id)
        }
        if(gamesArray[i].grp === "EURO Final"){
          final.push(gamesArray[i].id)
        }
        
        
      }
      //resetting elimination date 
      for(let i =0; i<eventIdArray.length;i++) {
        const date = new Date(2021,10,20,16,44,i,0 )
          const resetEvents = async ()=> {

            await instance.put(`Euro_events/${eventIdArray[i]}`, {
                status: "Not Started",
                score_given: "no",
                home_final: 0,
                away_final: 0,
                winner:"",
                deadline: date
               
            })
          }
          resetEvents()
      }
      for(let i =0; i<roundOf16.length;i++) {
        const resetRoundOf16 = async ()=> {
          await instance.put(`Euro_events/${roundOf16[i]}`, {
              home_team: "",
              away_team: "",
              status:"Not Ready"
            
          })
        }
        resetRoundOf16()
    }
    //reset quarter games
    for(let i = 0; i<quarter.length; i++) {
      const resetQuarter = async ()=> {
        await instance.put(`Euro_events/${quarter[i]}`, {
            home_team: "",
            away_team: "",
            status:"Not Ready"
        })
      }
      resetQuarter()
    }
    //reset semi games
    for(let i = 0; i<semi.length; i++) {
      const resetSemi = async ()=> {
        await instance.put(`Euro_events/${semi[i]}`, {
            home_team: "",
            away_team: "",
            status:"Not Ready"
        })
      }
      resetSemi()
    }
    //reset final game
    for(let i = 0; i<final.length; i++) {
      const resetFinal = async ()=> {
        await instance.put(`Euro_events/${final[i]}`, {
            home_team: "",
            away_team: "",
            status:"Not Ready"
          
        })
      }
      resetFinal()
    }
      //reset country score(group)
      for(let i = 0; i<countryArray.length;i++){
        countryIdArray.push(countryArray[i].id)
      }
      for(let i =0; i<countryIdArray.length;i++) {
          const resetCountryScore = async ()=> {
            await instance.put(`Countries/${countryIdArray[i]}`, {
                group_score: 0,
                group_goals: 0,
                Qualified: ''
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
        }
        
    }
      
  }
}
    return (
      /*Visuals and buttons for admin to be able to reset the event and see when he can continue (leave window/ reset finished) */
      <>
      <div style={{ height: "auto", color:'black'}} className="min-vh-100">
      {isAdmin ? (
        
        <div className="min-vh-100 d-flex flex-column" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Button variant="danger" size="lg" onClick={resetEvent2016}>
      Återställ EM 2016 
      
    </Button>{' '}
    <h2 className="mt-5">{message}</h2>
        </div>
     ) : (
      <h1 className="pt-5 display-1">404: <br/>Not Found</h1>
    )}
    </div>
        </>

    )
}

export default Reset
