import React, { useLayoutEffect } from 'react';

import Authorization from 'features/authorization/Authorization';
import Home from 'features/home/Home';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import './i18n';
import { CircularProgress } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from './app/hooks';
import {
  refreshGoogleTokensAsync,
  selectIsLoggedIn,
  selectLoading,
} from 'features/authorization/authorizationSlice';

function AuthorizationPage() {
  return (
    <React.Fragment>
      <Authorization />
    </React.Fragment>
  );
}

function HomePage() {
  return (
    <React.Fragment>
      <Home />
    </React.Fragment>
  );
}

function App() {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const loading = useAppSelector(selectLoading);
  const dispatch = useAppDispatch();
  const authTokens = () => dispatch(refreshGoogleTokensAsync());

  useLayoutEffect(() => {
    authTokens();
  }, []);

  if (loading) return <CircularProgress />;

  return (
    <Router>
      <div className="App">
        {!isLoggedIn && (
          <Switch>
            <Route exact path="/" render={AuthorizationPage} />
            <Redirect to="/" />
          </Switch>
        )}
        {isLoggedIn && (
          <Switch>
            <Route exact path="/home" render={HomePage} />
            <Redirect to="/home" />
          </Switch>
        )}
      </div>
    </Router>
  );
}

export default App;
