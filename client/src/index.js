import React from "react";
import ReactDOM from "react-dom";
import { RelayEnvironmentProvider } from "react-relay/hooks";
import { BrowserRouter as Router } from "react-router-dom";
import Application from "containers/application";
import Embed from "containers/embed";
import useQueryParameters from "hooks/use-query-parameters";
import RelayEnvironment from "relay/environment";

import "index.scss";

const Initialize = () =>
  useQueryParameters().get("embed") ? <Embed /> : <Application />;

ReactDOM.render(
  <React.StrictMode>
    <RelayEnvironmentProvider environment={RelayEnvironment}>
      <Router>
        <Initialize />
      </Router>
    </RelayEnvironmentProvider>
  </React.StrictMode>,
  document.getElementById("application")
);
