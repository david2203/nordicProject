import React from "react";
import Games from "../Game/Games";
import Header from "./Header";
import SignUp from "../Users/SignUp";
import MyBets from "../Game/MyBets";
import SignIn from "../Users/SignIn";
import Admin from "../Admin/Admin";
import Result16 from "../Admin/Results_postGroup";
import Landingpage from "../Landingpage"
import Footer from "./Footer";
import Euro from "../Game/Euro";
import ProfileInfo from "../Users/ProfileInfo";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Flags from "../Game/Flags";
import FileInput from "../Users/ChangeImg";
import ForgottenPassword from "../Users/ForgottenPassword";
import ResetPassword from "../Users/ResetPassword";
import Reset from "../Admin/Reset"
import { BrowserRouter as Router, Route } from "react-router-dom";
import Scoreboard from "../Scoreboard";
import Update from "../Admin/Update";
import Timegame from "../Game/Timegame"
import Manual from "../Global/Manual"
function AppRoute() {
      return (
        <>
        <Router>
        <Header/>
          <Route path="/" exact component={Euro}/>
          <Route path="/euro" exact component={Euro}/>
          <Route path="/Admin" exact component={Admin}/>
          <Route path="/MyBets" exact component={MyBets}/>
          <Route path="/Profile" exact component={ProfileInfo}/>
          <Route path="/games" exact component={Games} />
          <Route path="/SignUp" exact component={SignUp} />
          <Route path="/SignIn" exact component={SignIn} />
          <Route path="/Flags" exact component={Flags} />
          <Route path="/ChangeImg" exact component={FileInput}/>
          <Route path="/ForgottenPassword" exact component={ForgottenPassword} />
          <Route path="/ResetPassword" exact component={ResetPassword} />
          <Route path="/Reset" exact component={Reset} />
          <Route path="/Scoreboard" exact component={Scoreboard} />
          <Route path="/Result16" exact component={Result16} />
          <Route path="/Update" exact component={Update} />
          <Route path="/Landingpage" exact component={Landingpage} />
          <Route path="/Timegame" exact component={Timegame} />
          <Route path="/Manual" exact component={Manual} />







          <Route path='/facebook' component={() => { 
              window.location.href = 'https://facebook.com'; 
              return null;
          }}/>
          <Route path='/twitter' component={() => { 
              window.location.href = 'https://twitter.com'; 
              return null;
          }}/>
          <Route path='/google' component={() => { 
              window.location.href = 'https://google.com'; 
              return null;
          }}/>
          <Route path='/instagram' component={() => { 
              window.location.href = 'https://instagram.com'; 
              return null;
          }}/>
          <Route path='/linkedin' component={() => { 
              window.location.href = 'https://linkedin.com'; 
              return null;
          }}/>
          <Route path='/github' component={() => { 
              window.location.href = 'https://github.com'; 
              return null;
          }}/>
          <Route path='/stödlinjen' component={() => { 
              window.location.href = 'https://www.stodlinjen.se/#!/'; 
              return null;
          }}/>
          



        <Footer/>
        </Router>
        </>
      )
  }

export default AppRoute;
