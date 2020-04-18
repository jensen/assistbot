import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Application from "components/application";

import "index.scss";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Application />
    </Router>
  </React.StrictMode>,
  document.getElementById("application")
);
