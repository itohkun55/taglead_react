import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import PageRouter from './routers';

import { Provider } from 'react-redux';
import store from './store';

import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';

import {SnackbarProvider} from 'notistack';

 ReactDOM.render(
   
    <Provider store={store}>
      <SnackbarProvider maxSnack={3}>
      <Router>
      <App />
      {/* <PageRouter/> */}
      </Router>
      </SnackbarProvider>
    </Provider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
