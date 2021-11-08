import { useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";

import axios from "axios";
import server from "./config";
import "bootstrap/dist/css/bootstrap.min.css";



import { Nav, Navbar, NavDropdown, Container } from 'react-bootstrap'


function Header() {
  const history = useHistory();
  const [isAdmin, setIsAdmin] = useState(false);
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
  return (
    <>


    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top" className="py-4">
  <Container fluid>
  <Navbar.Brand href="/Games">Nordic Bet </Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    
    {token ? (
        <>  
        <Nav className="me-auto">    
      <Nav.Link href="/MyBets">Mina bets</Nav.Link>
      <Nav.Link href="/Euro">Brackets</Nav.Link>
      <Nav.Link href="/Games">Spel</Nav.Link>
      <Nav.Link href="/Scoreboard">Topplista</Nav.Link>
      
      {/* {isAdmin ? ( 
      <Nav.Link href="/Admin">Admin</Nav.Link>
      ) : (
       <></>
      )} */}
      
      {isAdmin ? ( 
      <NavDropdown title="Adminpanel" id="collasible-nav-dropdown">
        <NavDropdown.Item href="/Admin">Rätta spel</NavDropdown.Item>
        <NavDropdown.Item href="/Update">Updatera elimination</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="/Reset" style={{color: 'red'}}> <i className="bi bi-exclamation-triangle"></i> Nollställ event</NavDropdown.Item>
      </NavDropdown>
       ) : (
        <></>
       )}
      </Nav>
      <Nav >    

      <Nav.Link href="/Profile">Profil</Nav.Link>
      <Nav.Link eventKey={2} onClick={signOut}>
        Logga ut
      </Nav.Link>
    </Nav>
      </>
    
            ) : (
              <>
              <Nav className="me-auto" >
                </Nav>
        <Nav >    

      <Nav.Link href="/SignIn">Login</Nav.Link>
      <Nav.Link eventKey={2} href="/SignUp">
        Registrera
      </Nav.Link>
    </Nav>
  
</>)}

);
</Navbar.Collapse>
  </Container>
</Navbar>
</>
     
   
  )}

export default Header;
