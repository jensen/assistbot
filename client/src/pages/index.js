import React, { Suspense } from "react";
import { Route } from "react-router-dom";
import { preloadQuery } from "react-relay/hooks";
import RelayEnvironment from "relay/environment";
import QueueQuery from "pages/queue/__generated__/queueQuery.graphql";
import ChatQuery from "pages/__generated__/chatQuery.graphql";
import QueuePage from "pages/queue";
import ChatPage from "pages/chat";

const preloadedQueueQuery = preloadQuery(RelayEnvironment, QueueQuery, {
  first: 1,
  status: "accepted",
});
const preloadedChatQuery = preloadQuery(RelayEnvironment, ChatQuery, {});

const Router = () => (
  <Suspense fallback="Loading...">
    <Route path="/chat">
      <ChatPage preloadedQuery={preloadedChatQuery} />
    </Route>
    <Route path="/queue">
      <QueuePage preloadedQuery={preloadedQueueQuery} />
    </Route>
  </Suspense>
);

export default Router;
