import React from "react";
import ReactDOM from "react-dom";
import App from "./app/App.jsx";
import { render } from "react-dom";

// load stylesheet
require("./default.scss");

ReactDOM.render(
  <App />,
  document.getElementById("app")
);
