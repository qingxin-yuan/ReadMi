import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import muiTheme from './config/theme';
import ReactDOM from 'react-dom';
import Login from './containers/Login/';
import SignUp from './containers/SignUp/';
import { Provider } from 'react-redux';
import store from './redux/store';
import './index.css';

import registerServiceWorker from './registerServiceWorker';

const App = () => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <div>
      <Provider store={store}>
        <Router>
          <div>
            <Switch>
              <Route exact path="/" component={Login} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={SignUp} />
            </Switch>
          </div>
        </Router>
      </Provider>
    </div>
  </MuiThemeProvider>
);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
