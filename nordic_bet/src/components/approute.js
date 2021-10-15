import React from "react";
import Register from "./Register";
import Games from "./Games"
import Header from "./Header"
<<<<<<< HEAD
import SignUp from "./SignUp";
=======
import Profile from "./Profile";
import MyBets from "./MyBets";
>>>>>>> 65426c5c8b61bf111c999fcce4217c8f410cbbb1

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
          <Route path="/MyBets" exact component={MyBets}/>
          <Route path="/Profile" exact component={Profile}/>
          <Route path="/games" exact component={Games} />
          <Route path="/SignUp" exact component={SignUp} />
          
        </Router>

    

        </>
      )
  }

export default AppRoute;