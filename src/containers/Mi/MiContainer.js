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
    this.getCurrentUserName = this.getCurrentUserName.bind(this);
    this.getAllUsersName = this.getAllUsersName.bind(this);
    this.getAllMis = this.getAllMis.bind(this);
  }

  // method to query db for current user ID
  async getCurrentUserName() {
    const uid = this.props.uid;
    let currentUserName = "";
    const ref = await firebaseDB.ref(`users/${uid}`);

    ref.once("value", snapshot => {
      if (snapshot.val()) {
        // console.log(snapshot.val());
        this.setState({ currentUserName: snapshot.val().userName });
      }
    });
    return true;
  }

  async getAllUsersName() {
    // const uid = this.props.uid;
    // let currentUserName = "";
    const ref = await firebaseDB.ref(`users/`);

    ref.on("value", snapshot => {
      if (snapshot.val()) {
        const users = snapshot.val();
        this.setState({ mis: snapshot.val() });
        // Object.entries(users).forEach(([id, name])=>console.log(id, name))
      }
    });
  }

  async getAllMis() {
    // const uid = this.props.uid;
    // let currentUserName = "";
    const ref = await firebaseDB.ref(`mi/`);

    ref.on("value", snapshot => {
      if (snapshot.val()) {
        const mis = snapshot.val();
        this.setState({ mis });
      }
    });
  }

  render() {
    console.log(this.state.mis);
    return (
      <div>
        <RaisedButton
          type="button"
          primary
          // disabled={isInvalid}
          onClick={this.getAllMis}
        >
          Show me what you goooot!
        </RaisedButton>
        {/* <Mi /> */}
        <div>
          {Object.entries(this.state.mis).map((miByUser, i) => {
            console.log(miByUser);
            return <Mi key={i} mis={miByUser} />;
          })}
        </div>
        {/* <Mi mis={this.state.mis}/> */}
        {/* {currentUser && <p>{`${currentUser}`}</p>} */}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  uid: state.auth.authenticated.uid
});

export default connect(mapStateToProps)(MiContainer);
