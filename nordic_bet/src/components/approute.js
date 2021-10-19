import React from "react";
import Register from "./Register";
import Games from "./Games"
import Header from "./Header"
import SignUp from "./SignUp";
import Profile from "./Profile";
import MyBets from "./MyBets";
import SignIn from "./SignIn";
import Admin from "./Admin";

import {
    BrowserRouter as Router,
    Route
  } from "react-router-dom";




function AppRoute() {
      return (
        <>
         
        <Router>
        <Header/>
          <Route path="/Register" exact component={Register}/>

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