import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Application from "containers/application";
import Embed from "containers/embed";
import useQueryParameters from "hooks/use-query-parameters";

import "index.scss";

const Initialize = () =>
  useQueryParameters().get("embed") ? <Embed /> : <Application />;

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Initialize />
    </Router>
  </React.StrictMode>,
  document.getElementById("application")
);
