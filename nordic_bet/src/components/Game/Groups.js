import React, {useState, useEffect, useRef} from "react";
import axios from "axios";
import server from "../Global/config"
import Brackets from "./Brackets"
import Group from "./Group"



function Groups() {

    const [gamesD, setGames] = useState([]);
    const notInitialRender = useRef(false)
    useEffect(()=> {
        const gamesArray = []
        const groups = ["EURO Grp. A","EURO Grp. B","EURO Grp. C","EURO Grp. D","EURO Grp. E","EURO Grp. F"]
        const instance = axios.create({baseURL: server})
        for(let i = 0; i < groups.length; i++) {
            const fetchGame = async()=>{
                const response = await instance.get(`Euro_events?grp=${groups[i]}`)
                gamesArray.push(response.data)
                    
            }
            fetchGame().then(setGames(gamesArray))
        }
    },[])
    useEffect(()=>{
        
        if (notInitialRender.current) {
            const timer = setTimeout(()=>{
                console.log(gamesD[0][0].eventname)
               }, 100)
               return () => clearTimeout(timer);
            
        }else {
            notInitialRender.current = true
        }  
    },[gamesD])
    

    function logEventsArray(el) {
        console.log("games")
    }

    return (
        <div>
             <table className="table table-hover w-25 border bg-light mt-3 mx-auto">
  <thead>
    <tr>
      <th scope="col">Eventname</th>
      <th scope="col">Status</th>   
    </tr>
  </thead>
  <tbody>

        {gamesD.map((games)=>{
            return(
                
                games.map((game)=>{
                  return (
                    <Group key={game.id} eventname={game.eventname} status={game.status}/>
                  )
                }) 
            )
       })}
    
    
  
  </tbody>
</table>
        </div>
    )
}

export default Groups
