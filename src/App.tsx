import React from 'react';

import Sign from 'features/sign/Sign';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import './i18n';
import Button from '@material-ui/core/Button';
import i18next from 'i18next';

function SignPage() {
  return (
    <React.Fragment>
      <Sign />
    </React.Fragment>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <div className="App-header">
          <div>
            <Button
              color="primary"
              onClick={() => i18next.changeLanguage('ru')}
            >
              RU
            </Button>
            /
            <Button
              color="primary"
              onClick={() => i18next.changeLanguage('en')}
            >
              EN
            </Button>
          </div>
        </div>
        <Switch>
          <Route exact path="/" render={SignPage} />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
