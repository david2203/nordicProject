import React from "react";
import Games from "../Game/Games"
import Header from "./Header"
import SignUp from "../Users/SignUp";
import Profile from "../Users/Profile";
import MyBets from "../Game/MyBets";
import SignIn from "../Users/SignIn";
import Admin from "../Admin/Admin";
import Footer from "./Menu";
import Brackets from "../Game/Brackets"

import {
    BrowserRouter as Router,
    Route
  } from "react-router-dom";





function AppRoute() {
      return (
        <>
         
        <Router>
        <Header/>
          <Route path="/" exact component={Footer} />
          <Route path="/brackets" exact component={Brackets}/>
          <Route path="/Admin" exact component={Admin}/>
          <Route path="/MyBets" exact component={MyBets}/>
          <Route path="/Profile" exact component={Profile}/>
          <Route path="/games" exact component={Games} />
          <Route path="/SignUp" exact component={SignUp} />
          <Route path="/SignIn" exact component={SignIn} />

          
        </Router>

    

        </>
      )
  }

export default AppRoute;