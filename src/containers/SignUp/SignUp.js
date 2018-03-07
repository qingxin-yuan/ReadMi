import React, { Component } from 'react';
import { doCreateUserWithEmailAndPassword } from '../../helpers/auth';

/* Adapted from : https://www.robinwieruch.de/complete-firebase-authentication-react-tutorial/#react-firebase-setup*/

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
});

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...INITIAL_STATE
    };
  }

  componentDidMount() {
    this.setState({ ...INITIAL_STATE });
  }
  handleSubmit(event) {
    console.log('hello');
    const { username, email, passwordOne } = this.state;

    doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        this.setState(() => ({ ...INITIAL_STATE }));
      })
      .catch(error => {
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
          <button disabled={isInvalid} type="submit">
            Sign Up
          </button>

          {error && <p>{error.message}</p>}
        </form>
      </div>
    );
  }
}

export default Login;
