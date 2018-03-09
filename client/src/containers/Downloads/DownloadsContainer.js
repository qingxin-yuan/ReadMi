import React, { Component } from 'react';
//import { firebaseAuth, firebaseDB } from '../../config/firebaseConfig';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Downloads from './Downloads';

class DownloadsContainer extends Component {
  render() {
    return (
      <div>
        <Downloads uid={this.props.authenticated.uid} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authenticated: state.auth.authenticated
});

export default connect(mapStateToProps)(DownloadsContainer);
