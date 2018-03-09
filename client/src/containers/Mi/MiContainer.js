import React, { Component } from "react";
import { connect } from "react-redux";
import firebase from "firebase";
import RaisedButton from "material-ui/RaisedButton";

import Mi from "./Mi";
import { firebaseDB } from "../../config/firebaseConfig";

class MiContainer extends Component {
  constructor() {
    super();
    this.state = {
      currentUserName: "",
      mis: {}
    };

    this.getAllMis = this.getAllMis.bind(this);
    this.addMi = this.addMi.bind(this);
  }

  async getAllMis() {
    const ref = await firebaseDB.ref(`mi/`);
    ref.on("value", snapshot => {
      // if (snapshot.val()) {
      const mis = snapshot.val();
      this.setState({ mis });
      // }
    });
  }

  // method to query db for current user ID
  // @params: currentUserId from firebaseAuth
  async getCurrentUserName(uid) {
    console.log(uid);
    const ref = await firebaseDB.ref(`users/${uid}`);

    ref.on("value", snapshot => {
      snapshot.val() &&
        this.setState({ currentUserName: snapshot.val().userName });
    });
  }

  async addMi(userName, link) {
    const ref = await firebaseDB.ref(`mi/`);
    const date = new Date();
    ref.update({ [userName]: { [date]: link } });
  }

  componentDidMount() {
    this.getAllMis();
  }

  componentWillReceiveProps({ uid }) {
    this.getCurrentUserName(uid);
  }

  render() {
    console.log(this.state.currentUserName);

    return (
      <div>
        <RaisedButton
          onClick={() => this.addMi(this.state.currentUserName, "update")}
        >
          click me
        </RaisedButton>
        {Object.entries(this.state.mis).map((miByUser, index) => {
          // console.log(miByUser);
          return <Mi key={index} mis={miByUser} />;
        })}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  uid: state.auth.authenticated.uid
});

export default connect(mapStateToProps)(MiContainer);
