import { useHistory, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

import axios from "axios";
import server from "./config";
import "bootstrap/dist/css/bootstrap.min.css";
import { Nav, Navbar, NavDropdown, Container } from "react-bootstrap";
import Styled from "styled-components";

 const MediaQheader = Styled.span
  `
  display: contents;
  @media (max-width: 991px ) {
    display: grid;
    justify-content: center;

  }

  `;
//header that is visible on all sites
function Header() {
  const history = useHistory();
  //not so pretty function for underlining the currently renderd component in the header
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeBets, setActiveBets] = useState(false);
  const [activeBrackets, setActiveBrackets] = useState(false);
  const [activeGames, setActiveGames] = useState(false);
  const [activeAdmin, setActiveAdmin] = useState(false);
  const [activeScore, setActiveScore] = useState(false);
  const [activeUpdate, setActiveUpdate] = useState(false);
  const [activeReset, setActiveReset] = useState(false);
  const [activeProfile, setActiveProfile] = useState(false);
  const [activeAdminManual, setActiveManual] = useState(false);

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
    setActiveBets(false);
    setActiveBrackets(false);
    setActiveGames(false);
    setActiveAdmin(false);
    setActiveScore(false);
    setActiveUpdate(false);
    setActiveReset(false);
    setActiveProfile(false);
    setActiveManual(false);

    function scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
    scrollToTop()
  }
  function activeMyBets() {
    setAllFalse();
    setActiveBets(true);
  }
  function activeMyBrackets() {
    setAllFalse();
    setActiveBrackets(true);
  }
  function activeMyGames() {
    setAllFalse();
    setActiveGames(true);
  }
  function activeMyAdmin() {
    setAllFalse();
    setActiveAdmin(true);
  }
  function activeMyScore() {
    setAllFalse();
    setActiveScore(true);
  }
  function activeMyUpdate() {
    setAllFalse();
    setActiveUpdate(true);
  }

  function activeMyReset() {
    setAllFalse();
    setActiveReset(true);
  }
  function activeMyProfile() {
    setAllFalse();
    setActiveProfile(true);
  }
  function activeMyAdminManual() {
    setAllFalse();
    setActiveManual(true);
  }

  //header visuals with conditionals if the components are active
  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="dark"
        variant="dark"
        sticky="top"
        className="py-4"
        
      >
        <Container fluid>
          <Navbar.Brand href="/Landingpage"  >Nordic Bet </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
          <MediaQheader>
            {token ? (
              <>
                <Nav className="me-auto">
                  {activeBets ? (
                    <Link
                      to="/MyBets"
                      className="active text-light"
                      onClick={activeMyBets}
                      style={{width: '100px', marginTop: '1vh'}}
                      
                    >
                      Mina bets
                    </Link>
                  ) : (
                    <Link
                      to="/MyBets"
                      className="text-decoration-none text-light "
                      onClick={activeMyBets}
                      style={{width: '100px', marginTop: '1vh'}}
                    >
                      Mina bets
                    </Link>
                  )}
                  {activeBrackets ? (
                    <Link
                      to="/Euro"
                      className="active text-light"
                      onClick={activeMyBrackets}
                      style={{width: '100px', marginTop: '1vh'}}
                    >
                      Brackets
                    </Link>
                  ) : (
                    <Link
                      to="/Euro"
                      className="text-decoration-none  pl-3 ml-3 text-light"
                      onClick={activeMyBrackets}
                      style={{width: '100px', marginTop: '1vh'}}
                    >
                      Brackets
                    </Link>
                  )}
                  {activeGames ? (
                    <Link
                      to="/Games"
                      className="active text-light"
                      onClick={activeMyGames}
                      style={{width: '100px', marginTop: '1vh'}}
                    >
                      Spel
                    </Link>
                  ) : (
                    <Link
                      to="/Games"
                      className="text-decoration-none pl-3 ml-3 text-light"
                      onClick={activeMyGames}
                      style={{width: '100px', marginTop: '1vh'}}
                    >
                      Spel
                    </Link>
                  )}
                  {activeScore ? (
                    <Link
                      to="/Scoreboard"
                      className="active text-light"
                      onClick={activeMyScore}
                      style={{width: '100px', marginTop: '1vh'}}
                    >
                      Topplista
                    </Link>
                  ) : (
                    <Link
                      to="/Scoreboard"
                      className="text-decoration-none pl-3 ml-3 text-light"
                      onClick={activeMyScore}
                      style={{width: '100px', marginTop: '1vh'}}
                    >
                      Topplista
                    </Link>
                  )}

                  {/* {isAdmin ? ( 
      <Link to="/Admin">Admin</Link>
      ) : (
       <></>
      )} */}

                  {isAdmin ? (
                    <NavDropdown
                      title="Adminpanel"
                      id="collasible-nav-dropdown"
                      style={{width: '100px', marginTop: '0.5vh'}}
                    >
                      {activeAdmin ? (
                        <Link
                          to="/Admin"
                          className="active text-dark"
                          onClick={activeMyAdmin}
                          style={{marginLeft: '5%'}}
                        >
                          R??tta spel
                        </Link>
                      ) : (
                        <Link
                          to="/Admin"
                          className="text-decoration-none pl-3 ml-3 text-dark"
                          onClick={activeMyAdmin}
                          style={{marginLeft: '5%'}}
                        >
                          R??tta spel
                        </Link>

                        
                      )}
                      <br />
                      {activeUpdate ? (
                        <Link
                          to="/Update"
                          className="active text-dark"
                          onClick={activeMyUpdate}
                          style={{marginLeft: '5%'}}
                        >
                          Uppdatera kval
                        </Link>
                      ) : (
                        <Link
                          to="/Update"
                          className="text-decoration-none pl-3 ml-3 text-dark"
                          onClick={activeMyUpdate}
                          style={{marginLeft: '5%'}}
                        >
                          Uppdatera kval
                        </Link>
                        
                      )}
                      <br/>
                      {activeAdminManual ? (
                        <Link
                          to="/AdminManual"
                          className="active text-dark"
                          onClick={activeMyAdminManual}
                          style={{marginLeft: '5%'}}
                        >
                          Manual
                        </Link>
                      ) : (
                        <Link
                          to="/AdminManual"
                          className="text-decoration-none pl-3 ml-3 text-dark"
                          onClick={activeMyAdminManual}
                          style={{marginLeft: '5%'}}
                        >
                          Manual
                        </Link>
                        
                        
                      )}

                      <NavDropdown.Divider />

                      {activeReset ? (
                        <Link
                          to="/Reset"
                          className="active"
                          onClick={activeMyReset}
                          style={{ color: "red", marginLeft:"5%"}}
                        >
                          {" "}
                          <i className="bi bi-exclamation-triangle "> </i>{" "}
                          Nollst??ll event{" "}
                        </Link>
                      ) : (
                        <Link
                          to="/Reset"
                          className="text-decoration-none"
                          onClick={activeMyReset}
                          style={{ color: "red", marginLeft:"5%" }}
                        >
                          {" "}
                          <i className="bi bi-exclamation-triangle "> </i>
                          Nollst??ll event{" "}
                        </Link>
                      )}
                    </NavDropdown>
                  ) : (
                    <></>
                  )}
                </Nav>
                <Nav>
                  {activeProfile ? (
                    <Link
                      to="/Profile"
                      className="active text-light"
                      onClick={activeMyProfile}
                      style={{width: '100px', marginTop: '1vh'}}
                    >
                      {" "}
                      Profil{" "}
                    </Link>
                  ) : (
                    <Link
                      to="/Profile"
                      className="text-decoration-none pl-3 ml-3 text-light"
                      onClick={activeMyProfile}
                      style={{width: '100px', marginTop: '1vh'}}
                    >
                      {" "}
                      Profil{" "}
                    </Link>
                  )}

                  <Link
                  to="/signIn"
                    className="text-decoration-none pl-3 ml-3 text-white"
                    onClick={signOut}
                    style={{width: '100px', marginTop: '1vh'}}
                  >
                    Logga ut
                  </Link>
                </Nav>
              </>
            ) : (
              <>
                <Nav className="me-auto"></Nav>
                <Nav>
                  <Link to="/SignIn" className="text-decoration-none" style={{marginRight: '20px'}}>
                    Logga In
                    </Link>
                    <br/>
                  <Link to="/SignUp" className="text-decoration-none">
                    Registrera
                  </Link>
                </Nav>
              </>
            )}
            </MediaQheader>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
