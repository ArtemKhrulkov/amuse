import React, { useCallback, useLayoutEffect } from 'react';

import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import './i18n';
import { CircularProgress } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { AuthorizationPage, HomePage } from 'pages';
import {
  refreshGoogleTokensAsync,
  selectIsLoggedIn,
  selectLoading,
} from 'features/authorization/authorizationSlice';

function App() {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const loading = useAppSelector(selectLoading);
  const dispatch = useAppDispatch();

  const getAuthTokens = useCallback(
    () => dispatch(refreshGoogleTokensAsync()),
    [dispatch]
  );

  useLayoutEffect(() => {
    getAuthTokens();
  }, [getAuthTokens]);

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
