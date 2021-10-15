import React from "react";
import Register from "./Register";

import {
    BrowserRouter as Router,
    Route
  } from "react-router-dom";



function AppRoute() {
      return (
        <>
         
        <Router>
          <Route path="/Register" exact component={Register}/>
        </Router>

    

        </>
      )
  }

export default AppRoute;