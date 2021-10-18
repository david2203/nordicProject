
import {Link} from "react-router-dom";

import * as React from 'react';
import ReactDOM from 'react-dom';
import Button from '@mui/material/Button';

function Header() {
    function signOut() {
        localStorage.clear()
        window.location.reload()
    }
    return (
        <>
            <Link to="/Register"> Register</Link>
            <Link to="/Profile"> Profile</Link>
            <Link to="/MyBets"> My Bets</Link>
            <Link to="/SignIn"> Sign In</Link>
            <Link to="/SignUp"> Sign Up</Link>
            <Link to="/Admin"> Admin</Link>

            


         <Button variant="contained">   <Link to="/Games"> Uppcomming games </Link> </Button>

            <br/>
        <Button onClick={signOut}>Sign Out</Button>
        </>
    )
}

export default Header
