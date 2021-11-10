import { useHistory, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

import axios from "axios";
import server from "./config";
import "bootstrap/dist/css/bootstrap.min.css";



import { Nav, Navbar, NavDropdown, Container } from 'react-bootstrap'


function Header() {
  const history = useHistory();
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeBets, setActiveBets] = useState(false)
  const [activeBrackets, setActiveBrackets] = useState(false)
  const [activeGames, setActiveGames] = useState(false)
  const [activeAdmin, setActiveAdmin] = useState(false)
  const [activeLogin, setActiveLogin] = useState(false)
  const [activeScore, setActiveScore] = useState(false)
  const [activeUpdate, setActiveUpdate] = useState(false)
  const [activeReset, setActiveReset] = useState(false)
  const [activeProfile, setActiveProfile] = useState(false)








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
function setAllFalse() {
  setActiveBets(false)
  setActiveBrackets(false)
  setActiveGames(false)
  setActiveAdmin(false)
  setActiveLogin(false)
  setActiveScore(false)
  setActiveUpdate(false)
  setActiveReset(false)
  setActiveProfile(false)
}
  function activeMyBets() {
    setAllFalse()
    setActiveBets(true)
    
  }
  function activeMyBrackets() {
    setAllFalse()
    setActiveBrackets(true)
   
  }
  function activeMyGames() {
    setAllFalse()
    setActiveGames(true)
  }
  function activeMyAdmin() {
    setAllFalse()
    setActiveAdmin(true)
    
  }
  function activeMyScore() {
    setAllFalse()
    setActiveScore(true)
    
  }
  function activeMyUpdate() {
    setAllFalse()
    setActiveUpdate(true)
    
  }
   
  function activeMyReset() {
    setAllFalse()
    setActiveReset(true)
    
  }
  function activeMyProfile() {
    setAllFalse()
    setActiveProfile(true)
    
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
        {activeBets? <Link to="/MyBets" className="active" onClick={activeMyBets}>Mina bets</Link> :
         <Link to="/MyBets" className="text-decoration-none " onClick={activeMyBets}>Mina bets</Link>
         }   
        {activeBrackets? <Link to="/Euro" className="active" onClick={activeMyBrackets} >Brackets</Link> :
        <Link to="/Euro" className="text-decoration-none pl-3 ml-3" onClick={activeMyBrackets}>Brackets</Link>
        }
        {activeGames? <Link to="/Games" className="active" onClick={activeMyGames} >Spel</Link> :
        <Link to="/Games" className="text-decoration-none pl-3 ml-3" onClick={activeMyGames}>Spel</Link>
        }
        {activeScore? <Link to="/Scoreboard" className="active" onClick={activeMyScore} >Top-lista</Link> :
        <Link to="/Scoreboard" className="text-decoration-none pl-3 ml-3" onClick={activeMyScore}>Top-lista</Link>
        }
      
      {/* {isAdmin ? ( 
      <Link to="/Admin">Admin</Link>
      ) : (
       <></>
      )} */}
      
      {isAdmin ? ( 
      <NavDropdown title="Adminpanel" id="collasible-nav-dropdown">
        {activeAdmin? <Link to="/Admin" className="active" onClick={activeMyAdmin} >Rätta spel</Link> :
        <Link to="/Admin" className="text-decoration-none pl-3 ml-3" onClick={activeMyAdmin}>Rätta spel</Link>
        }
       <br/>
       {activeUpdate? <Link to="/Update" className="active" onClick={activeMyUpdate} >Updatera elimination</Link> :
        <Link to="/Update" className="text-decoration-none pl-3 ml-3" onClick={activeMyUpdate}>Updatera elimination</Link>
        }

        <NavDropdown.Divider />

        {activeReset? <Link to="/Reset"  className="active" onClick={activeMyReset}  style={{color: 'red'}}> <i className="bi bi-exclamation-triangle "> </i> Nollställ event </Link> :
        <Link to="/Reset"  className="text-decoration-none" onClick={activeMyReset}  style={{color: 'red'}}> <i className="bi bi-exclamation-triangle "> </i>Nollställ event </Link>
        }
       
      </NavDropdown>
       ) : (
        <></>
       )}
      </Nav>
      <Nav >    
        {activeProfile ? <Link to="/Profiel" className="active" onClick={activeMyProfile}> Profil </Link> :
        <Link to="/Profiel" className="text-decoration-none pl-3 ml-3" onClick={activeMyProfile}> Profil </Link> }
      
      <Link eventKey={2} className="text-decoration-none pl-3 ml-3" onClick={signOut}>
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
