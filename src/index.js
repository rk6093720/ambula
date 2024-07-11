// import "crypto-browserify";
// import "stream-browserify";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Reduxstore } from "./Redux/Reduxstore";

// Ensure process is globally available if needed
// import process from "process";
// window.process = process;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Provider store={Reduxstore}>
      <App />
    </Provider>
  </BrowserRouter>
);

reportWebVitals();
