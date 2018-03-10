import React, { Component } from "react";
import { connect } from "react-redux";
import firebase from "firebase";
// import moment from 'moment';
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
    this.upsertMi = this.upsertMi.bind(this);
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

  // method to update or insert links into db
  //@params: userName of the current user(string), link(string)
  async upsertMi(userName, link) {
    const ref = await firebaseDB.ref(`mi/`);
    let existed = false;
    const date = new Date();
    ref.child(userName).once("value", snapshot => {
      console.log(snapshot.val())
      if (snapshot.val()) {

        existed = true;
      }
    });
    console.log(existed);
    if (existed) {
      ref.child(userName).update({ [date]: link });

      return;
    } else {
      ref.update({ [userName]: { [date]: link } });

      return;
    }
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
        <RaisedButton onClick={() => this.upsertMi(this.state.currentUserName, "!!")}>
          click me
        </RaisedButton>
        {Object.entries(this.state.mis).map((miByUser, index) => {
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
