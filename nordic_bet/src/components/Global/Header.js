import { useHistory, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

import axios from "axios";
import server from "./config";
import "bootstrap/dist/css/bootstrap.min.css";



import { Nav, Navbar, NavDropdown, Container } from 'react-bootstrap'


function Header() {
  const history = useHistory();
  const [isAdmin, setIsAdmin] = useState(false);
  const active = useState("active")
  const [activeBets, setActiveBets] = useState(false)

  const instance = axios.create({ baseURL: server });
  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    if (userId !== null) {
      const fetchRole = async () => {
        const response = await instance.get(`/users?id=${userId}`);
        setIsAdmin(response.data[0].isAdmin);
      };
      fetchRole();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const token = localStorage.getItem("jwt");
  function signOut() {
    localStorage.clear();
    history.push("/signin");
    window.location.reload();
  }

  function activeMyBets() {
    setActiveBets(true)
  }
   
  return (
    <>


    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top" className="py-4 ">
  <Container fluid>
  <Navbar.Brand href="/Games">Nordic Bet </Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    
    {token ? (
        <>  
        <Nav className="me-auto "> 
        {activeBets? <Link to="/MyBets" className={active} onClick={activeMyBets}>Mina bets</Link> :
         <Link to="/MyBets" className="" onClick={activeMyBets}>Mina bets</Link>
         }   
     
      <Link to="/Euro">Brackets</Link>
      <Link to="/Games">Spel</Link>
      <Link to="/Scoreboard">Topplista</Link>
      
      {/* {isAdmin ? ( 
      <Link to="/Admin">Admin</Link>
      ) : (
       <></>
      )} */}
      
      {isAdmin ? ( 
      <NavDropdown title="Adminpanel" id="collasible-nav-dropdown">
        <Link to="/Admin">Rätta spel</Link><br/>
        <Link to="/Update">Updatera elimination</Link>
        <NavDropdown.Divider />
        <Link to="/Reset" style={{color: 'red'}}> <i className="bi bi-exclamation-triangle"></i> Nollställ event</Link>
      </NavDropdown>
       ) : (
        <></>
       )}
      </Nav>
      <Nav >    

      <Link to="/Profile">Profil</Link>
      <Link eventKey={2} onClick={signOut}>
        Logga ut
      </Link>
    </Nav>
      </>
    
            ) : (
              <>
              <Nav className="me-auto" >
                </Nav>
        <Nav >    

      <Link to="/SignIn">Login</Link>
      <Link eventKey={2} to="/SignUp">
        Registrera
      </Link>
    </Nav>
  
</>)}

);
</Navbar.Collapse>
  </Container>
</Navbar>
</>
     
   
  )}

export default Header;
