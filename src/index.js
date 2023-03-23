import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";

// import style
import 'styles/reset.css'
import 'styles/base.css'
// import 'bootstrap/dist/css/bootstrap-grid.min.css'

import App from "./App.js";


const basename = process.env.PUBLIC_URL;


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);


