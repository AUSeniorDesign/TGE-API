import React from "react";
import ReactDOM from "react-dom";
import App from "./app/App.jsx";
import { render } from "react-dom";
import { CookiesProvider } from "react-cookie";

// load stylesheet
require("./default.scss");

ReactDOM.render(
  <CookiesProvider>
    <App />
  </CookiesProvider>,
  document.getElementById("app")
);
