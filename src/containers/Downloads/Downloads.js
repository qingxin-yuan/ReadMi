import React, { Component } from 'react';
import { firebaseAuth, firebaseDB } from '../../config/firebaseConfig';

class Downloads extends Component {
  constructor() {
    super();
    this.state = {
      downloads: {}
    };
  }
  componentDidMount() {
    const { uid } = this.props;
    // firebaseDB.ref(`downloads/${uid}`).on('value', snapshot => {
    //   console.log(snapshot.val());
    //   this.setState({ downloads: snapshot.val() });
    // });

    firebaseDB.ref(`downloads/${uid}`).once('value', snapshot => {
      console.log(snapshot.val());
      this.setState({ downloads: snapshot.val() });
    });
  }
  render() {
    console.log('fresh');
    //console.log(this.state.downloads);
    return <div>DOWNLOADS </div>;
  }
}

export default Downloads;
