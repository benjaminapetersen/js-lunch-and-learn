// top level react
import React from 'react';
import ReactDOM from 'react-dom';
// libs
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/font-awesome/css/font-awesome.css';
import fontawesome from '@fortawesome/fontawesome';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
// our stuff
import './index.css';
import App from './components/App/App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

// hot module refresh... will auto refresh browser on changes.
if (module.hot) {
  module.hot.accept();
}
