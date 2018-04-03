import React from "react";
import ReactDOM from "react-dom";
import App from "./app/App.jsx";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { store } from './app/Helpers';

// load stylesheet
require("./default.scss");

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("app")
);
