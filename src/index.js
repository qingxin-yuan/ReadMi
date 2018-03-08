import React from 'react';
import { firebaseAuth } from './config/firebaseConfig';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import muiTheme from './config/theme';
import ReactDOM from 'react-dom';
import Login from './containers/Login/';
import SignUp from './containers/SignUp/';
import { Provider } from 'react-redux';
import { updateAuthState, userLoading } from './redux/modules/auth';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import store from './redux/store';
import './index.css';

import registerServiceWorker from './registerServiceWorker';

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
          <div>
            <Switch>
              <Route exact path="/" component={Login} />
              <Route exact path="/login" component={Login} />
              <PrivateRoute exact path="/signup" component={SignUp} />
            </Switch>
          </div>
        </Router>
      </Provider>
    </div>
  </MuiThemeProvider>
);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
