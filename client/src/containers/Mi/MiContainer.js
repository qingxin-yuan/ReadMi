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

  componentDidMount() {
    this.getAllMis();
  }

  render() {
    console.log(this.state.mis);
    return (
      <div>
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
