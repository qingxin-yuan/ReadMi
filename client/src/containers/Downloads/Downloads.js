import React, { Component } from 'react';
import { firebaseAuth, firebaseDB } from '../../config/firebaseConfig';

class Downloads extends Component {
  constructor() {
    super();
    this.state = {
      downloads: {}
    };
  }

  async getDownloads(uid) {
    await firebaseDB.ref(`downloads/${uid}`).once('value', snapshot => {
      console.log(snapshot.val());
      this.setState({ downloads: snapshot.val() });
    });
  }
  componentDidMount() {
    const { uid } = this.props;
    // firebaseDB.ref(`downloads/${uid}`).on('value', snapshot => {
    //   console.log(snapshot.val());
    //   this.setState({ downloads: snapshot.val() });
    // });
    console.log(uid);
    this.getDownloads(uid);
  }
  render() {
    console.log('fresh');
    //console.log(this.state.downloads);
    return <div>DOWNLOADS </div>;
  }
}

export default Downloads;
