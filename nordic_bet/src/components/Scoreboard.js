import React, {useState, useEffect} from "react";
import axios from "axios";
import server from "./Global/config";
import { DataGrid } from '@mui/x-data-grid';
import { borderRight, textAlign } from "@mui/system";
import Scorecard from "./Scorecard";


function Scoreboard() {
    const instance = axios.create({baseURL: server})

    const [users, setUsers] = useState([])
    const [rowcount, setRowcount] = useState()


    useEffect( ()=>{
            const fetchUsers= async()=>{
            const response = await instance.get(`/users?_sort=Score:DESC`)
            setUsers(response.data)
            setRowcount(response.data.length)
            }
            fetchUsers()
            for (let i = 0; i<rowcount; i++) {
                
                return (
                    i    
                )      
            }
    },[])

    return (
        <> 
            <table className="table table-hover w-25 border bg-light mt-3 mx-auto">
  <thead>
    <tr>
      <th scope="col"># Rank</th>
      <th scope="col">Username</th>
      <th scope="col">Score</th>
    </tr>
  </thead>
  <tbody>
  {users.map((user,i)=>{
            return(
                <Scorecard key={user.id} id={user.id}  username={user.username} score={user.Score} row={i}/>
            )
        })}
  </tbody>
</table>
    
            
        </>
    )
}

export default Scoreboard
