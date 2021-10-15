import React from "react";
import Register from "./Register";
import Games from "./Games"
import Header from "./Header"
import SignUp from "./SignUp";

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
          <Route path="/games" exact component={Games} />
          <Route path="/SignUp" exact component={SignUp} />
          
        </Router>

    

        </>
      )
  }

export default AppRoute;