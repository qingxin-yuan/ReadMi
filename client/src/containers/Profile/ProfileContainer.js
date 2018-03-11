import React, { Component } from "react";
// import { connect } from "react-redux";
import { withRouter } from "react-router";

import Profile from "./Profile";
import { firebaseDB } from "../../config/firebaseConfig";

class ProfileContainer extends Component {
  constructor() {
    super();
    this.state = {
      mis: {},
      userName: ""
    };
    this.fetchProfileMis = this.fetchProfileMis.bind(this);
  }

  async fetchProfileMis(userName) {
    // console.log(userName);
    const ref = firebaseDB.ref("mi/");
    ref
      .orderByChild("userName")
      .equalTo(userName)
      .on("value", snapshot => {
        this.setState({ mis: snapshot.val() });
      });
  }
  componentDidMount() {
    const userName = this.props.match.params.username;
    // console.log(userName);
    // this.setState({userName});
    this.fetchProfileMis(userName);
  }

  render() {
    console.log(this.state.mis);
    return (
      <div>
        {Object.entries(this.state.mis).map((miByUser, index) => {
          return <Profile key={index} mis={miByUser} />;
        })}
      </div>
    );
  }
}

export default withRouter(ProfileContainer);
