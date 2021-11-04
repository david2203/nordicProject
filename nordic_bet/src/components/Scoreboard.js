import React, {useState, useEffect} from "react";
import axios from "axios";
import server from "./Global/config";
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
            // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
        <> 
        <img src="https://cdn-icons-png.flaticon.com/512/4489/4489657.png" width="50px" alt=""/>
        <h3 className=" bg-light w-25 border mx-auto mt-3">Topplista </h3>
            <table className="table table-hover w-50 border bg-light mt-3 mx-auto">
  <thead>
    <tr>
      <th scope="col">#Rank</th>
      <th scope="col"></th>
      <th scope="col">Användarnamn</th>
      <th scope="col">Poäng</th>
    </tr>
  </thead>
  <tbody>
  {users.map((user,i)=>{
            return(
                <Scorecard key={user.id} id={user.id}  username={user.username} score={user.Score} avatar={user.profilepicture} row={i}/>
            )
        })}
  </tbody>
</table>
    
            
        </>
    )
}

export default Scoreboard
