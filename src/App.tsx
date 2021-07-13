import React from 'react';

import Authorization from 'features/authorization/Authorization';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import './i18n';

function AuthorizationPage() {
  return (
    <React.Fragment>
      <Authorization />
    </React.Fragment>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" render={AuthorizationPage} />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
