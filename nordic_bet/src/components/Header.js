import React from 'react'
import {Link} from "react-router-dom";

function Header() {
    return (
        <>
            <Link to="/Register"> Register</Link>

            <Link to="/Games"> Uppcomming games </Link>
        </>
    )
}

export default Header
