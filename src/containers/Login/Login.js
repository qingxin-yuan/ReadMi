import React, { Component } from 'react';

class Login extends Component {
  render() {
    return (
      <div>
        <h1> Login </h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              className="form-control"
              ref={email => (this.email = email)}
              placeholder="Email"
            />
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
