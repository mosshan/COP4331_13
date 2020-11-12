import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import './App.css';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import CardPage from './pages/CardPage';
import LocationPage from './pages/LocationPage';

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
        <Redirect to="/" />
      </Switch>  
    </Router>
  );
}

export default App;
