
import {Link, useHistory} from "react-router-dom";
import React, {useState, useEffect} from "react";
import Button from '@mui/material/Button';
import axios from "axios";
import server from "./config";

function Header() {
    const history = useHistory()
    const [isAdmin, setIsAdmin] = useState(false);
    const instance = axios.create({baseURL: server})
    useEffect( ()=>{
        const userId = localStorage.getItem('user_id');
        if(userId!==null){

            const fetchRole = async()=>{
            const response = await instance.get(`/users?id=${userId}`)
            setIsAdmin(response.data[0].isAdmin)
            }
            fetchRole()
        }
    },[])
    const token = localStorage.getItem("jwt")
    function signOut() {
        localStorage.clear()
        history.push("/signin")
        window.location.reload()
    }
    return (
        <>
            {token ?(
            <>
                <Link to="/Profile"> Profile</Link>
                <Link to="/MyBets"> My Bets</Link>
                <Link to="/Games"> Uppcomming games </Link> 
                { isAdmin ?(
                    <Link to="/Admin"> Admin</Link>
                ):(
            <>
            </>
                )}
                <Button onClick={signOut}>Sign Out</Button>
            </>
            ):(
            <>
                <Link to="/SignIn"> Login</Link> 
                <Link to="/SignUp"> Sign Up</Link>
            </>
            )}
        </>
    )
}

export default Header
