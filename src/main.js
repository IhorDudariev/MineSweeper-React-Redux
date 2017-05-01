import ReactDOM from 'react-dom';
import React from 'react';
import App from './App.js';
import store from './store/store.js';
import { Provider } from 'react-redux';

ReactDOM.render(
   <Provider store={store}>
  	<App />
  </Provider>,
  document.getElementById('container')
);