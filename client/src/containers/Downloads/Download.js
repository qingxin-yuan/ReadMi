import React, { Component } from 'react';
import FileCloudDownload from 'material-ui/svg-icons/file/cloud-download';
import { green500 } from 'material-ui/styles/colors';
import styles from './styles';

const Download = ({ url }) => (
  <li style={styles.title} key={url}>
    <FileCloudDownload
      color={green500}
      style={{ marginRight: 24 }}
    />
    <a href={url} target="_blank">
      {url}
    </a>
  </li>
);

export default Download;
