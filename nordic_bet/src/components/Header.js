
import {Link} from "react-router-dom";

import * as React from 'react';
import ReactDOM from 'react-dom';
import Button from '@mui/material/Button';

function Header() {
    return (
        <>
            <Link to="/SignIn"> Login</Link>
            <Link to="/Profile"> Profile</Link>
            <Link to="/MyBets"> My Bets</Link>

         <Button variant="contained">   <Link to="/Games"> Uppcomming games </Link> </Button>
        </>
    )
}

export default Header
