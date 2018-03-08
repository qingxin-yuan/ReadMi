import React, { Component } from 'react';
import { doSignInWithEmailAndPassword } from '../../helpers/auth';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { byPropKey } from '../../helpers/loginHelpers';

export default class Login extends Component {
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
    console.log('logged in');
  }

  render() {
    const { username, email, password, error } = this.state;
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
            <RaisedButton type="button" primary onClick={this.handleSubmit}>
              Log In
            </RaisedButton>
          </div>
          {error && <p>{error.message}</p>}
        </form>
      </div>
    );
  }
}
