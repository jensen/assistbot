import React, { Suspense } from "react";
import { Route } from "react-router-dom";
import ChatPage from "pages/chat";
import QueuePage from "pages/queue";
import CurrentPage from "pages/current";

const Router = () => (
  <Suspense fallback="Loading...">
    <Route path="/chat">
      <ChatPage />
    </Route>
    <Route path="/queue">
      <QueuePage />
    </Route>
    <Route path="/current">
      <CurrentPage />
    </Route>
  </Suspense>
);

export default Router;
