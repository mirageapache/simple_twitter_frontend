import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";

// import style
import 'styles/reset.css'
import 'styles/base.css'

import App from "./App.js";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter basename='/simple_twitter_frontend'>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);


