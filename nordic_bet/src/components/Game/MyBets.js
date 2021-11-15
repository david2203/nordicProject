import React, { useState, useEffect } from "react";
import axios from "axios";
import server from "../Global/config";
import Bet from "./Bet";
import "./Bet.css";
import { Link } from "react-router-dom";

import { Parallax } from "react-parallax";

function MyBets() {
  
  const instance = axios.create({ baseURL: server });
  const user = localStorage.getItem("user_id");
  const [activeLoadPage, setActiveLoadPage] = useState(3);
  const [finishedLoadPage, setFinishedLoadPage] = useState(3);

  const [activeBets, setActiveBets] = useState([]);
  const [finishedBets, setFinishedBets] = useState([]);


  useEffect(() => {
    const fetchActiveBets = async () => {
      const response = await instance.get(
        `bets?user=${user}&&_limit=${activeLoadPage}&&Active=true`
      );
      setActiveBets(response.data);
    };
    fetchActiveBets();
    const fetchFinishedBets = async () => {
      const response = await instance.get(
        `bets?user=${user}&&_limit=${finishedLoadPage}&&Active=false`
      );
      setFinishedBets(response.data);
    };
    fetchFinishedBets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeLoadPage,finishedLoadPage]);
  
  function loadMoreActive() {
    let dynamicPage = activeLoadPage + 2;
    setActiveLoadPage(dynamicPage);
  }
  function loadMoreFinished() {
    let dynamicPage = finishedLoadPage + 2;
    setFinishedLoadPage(dynamicPage);
  }
  function showLessActive() {
    setActiveLoadPage(3);
  }
  function showLessFinished() {
    setFinishedLoadPage(3);
  }

  const image1 =
  "https://images.unsplash.com/photo-1561034645-e6f28dfddd2c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80";

  if(activeBets.length === 0) {
    return(
      <Parallax key="" bgImage={image1} strength={500}>
      <div className="min-vh-100">

        
    
    <div className="flexcontainer d-flex justify-content-between"> 
    <div className="activeBets ml-0 " style={{width:"100vw"}}>
    <h2 className="header bg-light w-50 border mx-auto mt-3" style={{opacity: '70%'}}>Du har inga aktiva spel <div><br/><Link to="/Games" className="text-decoration-none text-black">Gå till spel här</Link></div> </h2>
    <div className="w-100">
   {activeBets.map((bet,key) => {
   
     return (
       <div key={key}>
       <br/>
       
       
       <Bet 
         id={bet.id}
         type={bet.type}
         grp={bet.grp}
         homeTeamGoals={bet.homeTeamGoals}
         awayTeamGoals={bet.awayTeamGoals}
         winner={bet.winner}
         euro_event={bet.euro_event}
         status={bet.Active}
         points_recieved={bet.recieved_points}
       />
     
      
       <br/>
       </div>
     )

   })}
   </div>
   </div>
   </div>
   </div>
   </Parallax>
    )
  }

  return (
    <>  

    
        
       <Parallax key="" bgImage={image1} strength={0}>
         <div className="min-vh-100">

           
       
       <div className="flexcontainer d-flex justify-content-between"> 
       <div className="activeBets ml-0 " style={{width:"100vw"}}>
       <h2 className="header bg-light w-50 border mx-auto mt-3"> Här är dina aktiva bets: </h2>
       <div className="w-100">
      {activeBets.map((bet, key2) => {
      
        return (
          <div  key={key2}>
          <br/>
          
          
          <Bet 

            id={bet.id}
            type={bet.type}
            grp={bet.grp}
            homeTeamGoals={bet.homeTeamGoals}
            awayTeamGoals={bet.awayTeamGoals}
            winner={bet.winner}
            euro_event={bet.euro_event}
            status={bet.Active}
            points_recieved={bet.recieved_points}
          />
        
         
          <br/>
          </div>
        )
 
      })}
      </div>
      {/* pagination function */}
      {activeLoadPage <= activeBets.length ? (
        <button onClick={loadMoreActive}>Load more</button>
      ) : (
        activeLoadPage > activeBets.length && activeLoadPage > 3? (
          <button onClick={showLessActive}>Show less</button>     
        ) :
        (
          <>
          </>
        )
        
      )
      }
      </div>
      <div className="finishedBets" style={{width:"100vw"}}>
      <h2 className="header bg-light w-50 border mx-auto mt-3"> Här är dina slutförda bets: </h2>
      {finishedBets.map((bet, key3) => {
        return (
          <div key={key3}>
          <br/>
          
          
          <Bet 
            
            id={bet.id}
            type={bet.type}
            grp={bet.grp}
            homeTeamGoals={bet.homeTeamGoals}
            awayTeamGoals={bet.awayTeamGoals}
            winner={bet.winner}
            euro_event={bet.euro_event}
            status={bet.Active}
            points_recieved={bet.recieved_points}
          />
        
         
          <br/>
          </div>
        )
       
        
      })}
      {/* pagination function */}
      {finishedLoadPage <= finishedBets.length  ? (
        <button onClick={loadMoreFinished}>Load more</button>
      ) : (
        finishedLoadPage > finishedBets.length && finishedLoadPage > 3? (
          <button onClick={showLessFinished}>Show less</button>     
        ) :
        (
          <>
          </>
        )
        
      )
      }
      </div>
      </div>
      </div>

      </Parallax>
     
    </>
  );
}

export default MyBets;
