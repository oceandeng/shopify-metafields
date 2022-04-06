import React from 'react';
import ReactDOM from 'react-dom';
import App from './Index';

if (document.getElementById('app')) {
  ReactDOM.render(<App />, document.getElementById('app'));
}