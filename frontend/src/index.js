import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';

import { positions, transitions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
// import AlertTemplate from 'react-alert-template-mui';

const options = {
  timeout: 3000,
  position: positions.BOTTOM_RIGHT,
  // position: positions.MIDDLE_RIGHT,
  // position: positions.TOP_RIGHT,
  transition: transitions.SCALE
}

ReactDOM.render(
  <Provider store={store}>
    <AlertProvider template={AlertTemplate} {...options}>
      <App />
    </AlertProvider>
  </Provider>,
  document.getElementById('root')
);