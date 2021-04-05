// =========================================================
// * Volt React Dashboard
// =========================================================

// * Product Page: https://themesberg.com/product/dashboard/volt-react
// * Copyright 2021 Themesberg (https://www.themesberg.com)
// * Official Repository: https://github.com/themesberg/volt-react-dashboard
// * License: MIT License (https://themesberg.com/licensing)

// * Designed and coded by https://themesberg.com

// =========================================================

// * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. Please contact us to request a removal.

import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from "history";
import { Router } from "react-router-dom";
import { Provider } from 'react-redux'
import configureStore from './store';

// core styles
import "./scss/volt.scss";



// vendor styles
import "@fortawesome/fontawesome-free/css/all.css";
import "react-datetime/css/react-datetime.css";


import App from './App';
import ScrollToTop from "./components/ScrollToTop";



const store = configureStore();

if (process.env.NODE_ENV !== 'production') {

  window.store = store;

}

const history = createBrowserHistory();

function Root() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

ReactDOM.render(  
    <Router history={history}>
      <ScrollToTop />
      <Root/>
    </Router>,
  document.getElementById("root")
);
