
import {Link} from "react-router-dom";

import * as React from 'react';
import ReactDOM from 'react-dom';
import Button from '@mui/material/Button';

function Header() {
    return (
        <>
            <Link to="/Register"> Register</Link>
            <Link to="/Profile"> Profile</Link>
            <Link to="/MyBets"> My Bets</Link>

         <Button variant="contained">   <Link to="/Games"> Uppcomming games </Link> </Button>
            <Button variant="contained">Hello World</Button>
        </>
    )
}

export default Header
