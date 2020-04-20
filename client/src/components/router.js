import React from "react";
import { Route } from "react-router-dom";
import ChatPage from "pages/chat";
import QueuePage from "pages/queue";

const Router = () => (
  <>
    <Route path="/chat">
      <ChatPage />
    </Route>
    <Route path="/queue">
      <QueuePage />
    </Route>
  </>
);

export default Router;
