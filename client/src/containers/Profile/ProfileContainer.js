import React, { Component } from "react";
// import { connect } from "react-redux";
import {withRouter} from 'react-router'

import Profile from "./Profile";
import { firebaseDB } from "../../config/firebaseConfig";

class ProfileContainer extends Component {
  constructor() {
    super();
    this.state = {
      mis: {},
      userName: '',
    };
    this.fetchProfileMis = this.fetchProfileMis.bind(this);
  }

  async fetchProfileMis(userName) {
    console.log(userName);
    const ref = firebaseDB.ref("mi/");
    ref
      .orderByChild("userName")
      .equalTo(userName)
      .on("value", snapshot => {
        this.setState({ mis: snapshot.val() });
      });
  }
  componentWillReceiveProps(props){
    const userName = props.match.params.username;
    this.setState({userName});
    this.fetchProfileMis(this.state.userName);
  }

  render() {
    return (
      <div>
        {this.state.mis && Object.entries(this.state.mis).map((miByUser, index) => {
          return <Profile key={index} mis={miByUser} />;
        })}
      </div>
    );
  }
}



export default withRouter(ProfileContainer);
