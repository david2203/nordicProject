import React, {useState, useEffect} from "react";
import axios from "axios";
import server from "./config";
import Scorecard from "./Scorecard";
import { ThemeContext } from "@mui/styled-engine";

function Scoreboard() {
    const instance = axios.create({baseURL: server})
    const [users, setUsers] = useState([])
    
    
    

    useEffect( ()=>{
            const fetchUsers= async()=>{
            const response = await instance.get(`/users`)
            setUsers(response.data)
            }
            fetchUsers().then(console.log(users))
        },[])
    
    return (
        <>
            Top 10 <br/>
            {users.map((user)=>{
                return(
                    <Scorecard key={user.id} id={user.id}  username={user.username} score={user.Score} />
                )
            })}
        </>
    )
}

export default Scoreboard
