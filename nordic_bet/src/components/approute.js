import React from "react";
<<<<<<< HEAD
import Register from "./Register";
=======
import Games from "./Games"
>>>>>>> e6a9d20af4e2ca8e78565c543d5d5e125e2a1efe

import {
    BrowserRouter as Router,
    Route
  } from "react-router-dom";



function AppRoute() {
      return (
        <>
         
        <Router>
<<<<<<< HEAD
          <Route path="/Register" exact component={Register}/>
=======
          <Route path="/games" exact component={Games} />
>>>>>>> e6a9d20af4e2ca8e78565c543d5d5e125e2a1efe
        </Router>

    

        </>
      )
  }

export default AppRoute;