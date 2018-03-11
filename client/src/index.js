import React from 'react';
import { firebaseAuth } from './config/firebaseConfig';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {withRouter} from 'react-router';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import muiTheme from './config/theme';
import Login from './containers/Login/';
import SignUp from './containers/SignUp/';
import Mi from './containers/Mi/';
import Downloads from './containers/Downloads/';
import Profile from './containers/Profile/';
import { updateAuthState, userLoading } from './redux/modules/auth';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import store from './redux/store';
import registerServiceWorker from './registerServiceWorker';

import './index.css';

let gotProfile = false;
store.subscribe(() => {
  const values = store.getState();
  if (values.authenticated !== 'LOADING_USER' && !gotProfile) {
    gotProfile = true;
    store.dispatch(userLoading(false));
  }
});

firebaseAuth.onAuthStateChanged(user => {
  if (user) {
    store.dispatch(updateAuthState(user));
  } else {
    store.dispatch(updateAuthState(false));
  }
});

const App = () => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <div>
      <Provider store={store}>
    
        <Router>
        {/* <Routes/> */}
          <div>
            <Switch>
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={SignUp} />
              <PrivateRoute exact path="/" component={Mi} />
              <PrivateRoute exact path="/downloads" component={Downloads} />
              <PrivateRoute exact path="/profile/:username" component={Profile} />
            </Switch>
          </div>
        </Router>
      </Provider>
    </div>
  </MuiThemeProvider>
);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
