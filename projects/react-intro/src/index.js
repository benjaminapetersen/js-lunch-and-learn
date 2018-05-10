import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

// this is the kickoff of react
ReactDOM.render(<App />, document.getElementById('root'));

registerServiceWorker();


if (module.hot) {
  module.hot.accept();
}
