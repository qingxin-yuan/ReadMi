import React, { Component } from 'react';
import { firebaseAuth, firebaseDB } from '../../config/firebaseConfig';
import Download from './Download';
import { Card, CardText, CardHeader } from 'material-ui/Card';
import styles from './styles';

class Downloads extends Component {
  constructor() {
    super();
    this.state = {
      downloads: {}
    };
    this.getDownloads = this.getDownloads.bind(this);
  }

  async getDownloads(uid) {
    await firebaseDB.ref(`downloads/${uid}`).once('value', snapshot => {
      console.log(snapshot.val());
      this.setState({ downloads: snapshot.val() });
    });
  }
  async componentWillReceiveProps(uid) {
    await this.getDownloads(uid.uid);
  }
  render() {
    const { downloads } = this.state;
    const downloadArray = Object.values(downloads);
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: 100
        }}
      >
        <div>
          <Card style={styles.card}>
            <CardHeader
              title="Downloaded"
              style={{ margin: 'auto', width: '50%' }}
            />
            <CardText>
              <ul style={{ listStyleType: 'none' }}>
                {downloadArray.map((download, i) => (
                  <Download key={i} url={download} />
                ))}
              </ul>
            </CardText>
          </Card>
        </div>
      </div>
    );
  }
}

export default Downloads;
