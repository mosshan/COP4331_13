import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import './App.css';

import LoginPage from './pages/LoginPage';
import CardPage from './pages/CardPage';
import HomePage from './pages/HomePage';
import LocationPage from './pages/LocationPage';

function App() {
  return (
    <Router >
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/study" exact>
          <LocationPage name={localStorage.location}/>
        </Route>
        <Route path="/login" exact>
          <LoginPage />
        </Route>
        <Route path="/signup" exact>
          <LoginPage />
        </Route>
        <Redirect to="/" />
      </Switch>  
    </Router>
  );
}

export default App;
