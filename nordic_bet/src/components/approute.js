import React from "react";
import Register from "./Register";
import Games from "./Games"

import {
    BrowserRouter as Router,
    Route
  } from "react-router-dom";



function AppRoute() {
      return (
        <>
         
        <Router>
          <Route path="/Register" exact component={Register}/>
          <Route path="/games" exact component={Games} />
        </Router>

    

        </>
      )
  }

export default AppRoute;