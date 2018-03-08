import React, { Component } from "react";
import { connect } from "react-redux";
import firebase from "firebase";

import { firebaseDB } from "../../config/firebaseConfig";

class Mi extends Component {
  async getUserName() {
    // const uid = await firebaseAuth.currentUser;
    const uid = this.props.uid;
    const ref = await firebaseDB.ref(`users/${uid}`);
    // console.log(ref);
    ref.on("value", snapshot => console.log(snapshot.val() &&snapshot.val().userName));

  }

  render() {
    // console.log(this.props.uid);
    this.getUserName();
    return <div>so many Mis...</div>;
  }
}

const mapStateToProps = state => ({
  uid: state.auth.authenticated.uid
});

export default connect(mapStateToProps)(Mi);
