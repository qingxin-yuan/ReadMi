import React, { Component } from 'react';
import {
  doCreateUserWithEmailAndPassword,
  createUserInDB
} from '../../helpers/auth';
import { byPropKey } from '../../helpers/loginHelpers';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import style from './styles.js';

/* Adapted from : https://www.robinwieruch.de/complete-firebase-authentication-react-tutorial/#react-firebase-setup*/

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null
};

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      passwordOne: '',
      passwordTwo: '',
      error: null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    const { username, email, passwordOne } = this.state;

    doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        createUserInDB(authUser.uid, username, email)
          .then(() => {
            this.setState({ ...INITIAL_STATE });
            this.props.history.push('/');
          })
          .catch(error => {
            this.setState(byPropKey('error', error));
          });
      })
      .catch(error => {
        console.log(error);
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();
  }

  render() {
    const { username, email, passwordOne, passwordTwo, error } = this.state;
    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';
    return (
      <div style={style.loginForm}>
        <div>
          <div>
            <h1> Sign Up </h1>
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
                label="Name"
                floatingLabelText="Name"
                onChange={event =>
                  this.setState(byPropKey('username', event.target.value))
                }
                value={username}
                type="text"
              />
            </div>
            <div>
              <TextField
                label="New Password"
                floatingLabelText="New Password"
                onChange={event =>
                  this.setState(byPropKey('passwordOne', event.target.value))
                }
                value={passwordOne}
                type="password"
              />
            </div>
            <div>
              <TextField
                label="New Password"
                floatingLabelText="Confirm Password"
                onChange={event =>
                  this.setState(byPropKey('passwordTwo', event.target.value))
                }
                value={passwordTwo}
                type="password"
              />
            </div>
            <div style={{ display: 'flex', marginTop: 50 }}>
              <RaisedButton
                type="submit"
                primary
                disabled={isInvalid}
                onClick={this.handleSubmit}
              >
                Sign Up
              </RaisedButton>
            </div>
            {error && <p>{error.message}</p>}
          </form>
        </div>
      </div>
    );
  }
}

export default SignUp;
