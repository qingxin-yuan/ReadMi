import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import registerServiceWorker from './registerServiceWorker';


class App extends Component {
  render() {
    return (
      <div className="App">
        REEEEEEEEADMI
      </div>
    );
  }
}

export default App;



ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
