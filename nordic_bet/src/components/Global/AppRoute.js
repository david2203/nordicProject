import React from "react";
import Games from "../Game/Games"
import Header from "./Header"
import SignUp from "../Users/SignUp";
import MyBets from "../Game/MyBets";
import SignIn from "../Users/SignIn";
import Admin from "../Admin/Admin";
import Footer from "./Footer";
import Euro from "../Game/Euro"
import ProfileInfo from "../Users/ProfileInfo";
import 'bootstrap-icons/font/bootstrap-icons.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Flags from "../Game/Flags"
import ForgottenPassword from "../Users/ForgottenPassword";
import ResetPassword from "../Users/ResetPassword";


import {
    BrowserRouter as Router,
    Route
  } from "react-router-dom";





function AppRoute() {
      return (
        <>
        <Router>
        <Header/>
          <Route path="/euro" exact component={Euro}/>
          <Route path="/Admin" exact component={Admin}/>
          <Route path="/MyBets" exact component={MyBets}/>
          <Route path="/Profile" exact component={ProfileInfo}/>
          <Route path="/games" exact component={Games} />
          <Route path="/SignUp" exact component={SignUp} />
          <Route path="/SignIn" exact component={SignIn} />
          <Route path="/Flags" exact component={Flags} />
          <Route path="/ForgottenPassword" exact component={ForgottenPassword} />
          <Route path="/ResetPassword" exact component={ResetPassword} />




        <Footer/>
        </Router>
        </>
      )
  }

export default AppRoute;