import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App'
import './assets/index.css'
import {store, persisStore} from './redux/'

ReactDOM.render(
  <Provider store={store}>
  <PersistGate persistor={persisStore}>
    <App />
  </PersistGate>
  </Provider>
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
