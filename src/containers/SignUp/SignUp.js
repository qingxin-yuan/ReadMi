import React, { Component } from 'react';
import {
  doCreateUserWithEmailAndPassword,
  createUserInDB
} from '../../helpers/auth';

/* Adapted from : https://www.robinwieruch.de/complete-firebase-authentication-react-tutorial/#react-firebase-setup*/

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null
};

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
});

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
        createUserInDB(authUser.uid, username, email).then(() => {
          this.setState({ ...INITIAL_STATE });
          this.props.history.push('/login');
        });
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
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
      <div>
        <h1> Sign Up </h1>
        <form onSubmit={this.handleSubmit}>
          <input
            value={username}
            onChange={event =>
              this.setState(byPropKey('username', event.target.value))
            }
            type="text"
            placeholder="Full Name"
          />
          <input
            value={email}
            onChange={event =>
              this.setState(byPropKey('email', event.target.value))
            }
            type="text"
            placeholder="Email Address"
          />
          <input
            value={passwordOne}
            onChange={event =>
              this.setState(byPropKey('passwordOne', event.target.value))
            }
            type="password"
            placeholder="Password"
          />
          <input
            value={passwordTwo}
            onChange={event =>
              this.setState(byPropKey('passwordTwo', event.target.value))
            }
            type="password"
            placeholder="Confirm Password"
          />
          <button
            type="button"
            disabled={isInvalid}
            onClick={this.handleSubmit}
          >
            Sign Up
          </button>

          {error && <p>{error.message}</p>}
        </form>
      </div>
    );
  }
}

export default SignUp;
