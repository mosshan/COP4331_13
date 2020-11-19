import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import './App.css';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import LocationPage from './pages/LocationPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ChangePasswordPage from './pages/ChangePasswordPage';

function App() {
  return (
    <Router >
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/study" exact>
          <LocationPage name={localStorage.location} id={localStorage.locationId}/>
        </Route>
        <Route path="/login" exact>
          <LoginPage />
        </Route>
        <Route path="/signup" exact>
          <SignUpPage />
        </Route>
        <Route path="/forgotpassword" exact>
          <ForgotPasswordPage />
        </Route>
        <Route path="/reset/:hash" exact component={ChangePasswordPage} />
        <Redirect to="/" />
      </Switch>  
    </Router>
  );
}

export default App;
