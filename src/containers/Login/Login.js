import React, { Component } from 'react';
import { doSignInWithEmailAndPassword } from '../../helpers/auth';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { byPropKey } from '../../helpers/loginHelpers';
import { withRouter } from 'react-router-dom';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      error: null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    const { email, password } = this.state;
    doSignInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('logged in');
        this.props.history.push('/');
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });
    event.preventDefault();
  }

  render() {
    const { email, password, error } = this.state;
    const isInvalid = password === '' || email === '';
    return (
      <div>
        <div>
          <h1> Login </h1>
        </div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <TextField
              label="Email"
              floatingLabelText="Email"
              onChange={event =>
                this.setState(byPropKey('email', event.target.value))
              }
              value={email}
              type="text"
            />
          </div>
          <div>
            <TextField
              label="Password"
              floatingLabelText="Password"
              onChange={event =>
                this.setState(byPropKey('password', event.target.value))
              }
              value={password}
              type="password"
            />
          </div>
          <div style={{ display: 'flex', marginTop: 50 }}>
            <RaisedButton
              type="button"
              primary
              disabled={isInvalid}
              onClick={this.handleSubmit}
            >
              Log In
            </RaisedButton>
          </div>
          {error && <p>{error.message}</p>}
        </form>
      </div>
    );
  }
}

export default withRouter(Login);
