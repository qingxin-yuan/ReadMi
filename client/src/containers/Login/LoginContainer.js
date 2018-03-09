import React, { Component } from 'react';
import Login from './Login';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class LoginContainer extends Component {
  render() {
    const { from } = this.props.location.state || {
      from: { pathname: '/items' }
    };
    return !this.props.authenticated ? <Login /> : <Redirect to={from} />;
  }
}

const mapStateToProps = state => ({
  authenticated: state.auth.authenticated,
  userLoading: state.auth.userLoading
});
export default connect(mapStateToProps)(LoginContainer);
