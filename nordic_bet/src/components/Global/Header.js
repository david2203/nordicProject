
import {Link, useHistory} from "react-router-dom";
import React, {useState, useEffect} from "react";
import Button from '@mui/material/Button';
import axios from "axios";
import server from "./config";
import 'bootstrap/dist/css/bootstrap.min.css';

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    const token = localStorage.getItem("jwt")
    function signOut() {
        localStorage.clear()
        history.push("/signin")
        window.location.reload()
    }
    return (
        <>
<nav className="navbar navbar-expand-lg navbar-light bg-light mx-auto">
<Link to="/Games" className="navbar-brand ms-5"> Nordic Bet</Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse " id="navbarSupportedContent">
    <ul className="navbar-nav " >
    {token ?(
                <>
                <Link to="/Profile" className="nav-link "> Profile </Link>
                <Link to="/MyBets" className="nav-link "> My Bets</Link>
                <Link to="/Euro" className="nav-link "> Brackets </Link>
                { isAdmin ?(
                    <Link to="/Admin" className="nav-link"> Admin</Link>
                
                ):(
            <>
            </>
                )}
                <Link to="/Games" className="nav-link "> Uppcomming games </Link> 
                <Button onClick={signOut} className="nav-link ">Sign Out</Button>
            </>
            ):(
            <>
                <Link to="/SignIn" className="nav-link"> Login</Link> 
                <Link to="/SignUp" className="nav-link"> Sign Up</Link>
            </>
            )}
    </ul>
  </div>
</nav>
        </>
    )
}

export default Header
