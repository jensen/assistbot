import React, { Suspense, useEffect } from "react";
import { Route } from "react-router-dom";
import { preloadQuery } from "react-relay/hooks";
import RelayEnvironment from "relay/environment";
import ChatQuery from "pages/__generated__/chatQuery.graphql";
import QueuePage from "pages/queue";
import ChatPage from "pages/chat";

const preloadedChatQuery = preloadQuery(RelayEnvironment, ChatQuery, {
  last: 50,
});

const Router = () => {
  useEffect(() => {
    const image = new Image();
    image.src = "/avatar.png";
  }, []);

  return (
    <>
      <Suspense fallback="Loading Chat ...">
        <Route path="/chat">
          <ChatPage preloadedQuery={preloadedChatQuery} />
        </Route>
      </Suspense>
      <Suspense fallback="Loading Queue ...">
        <Route path="/queue">
          <QueuePage />
        </Route>
      </Suspense>
    </>
  );
};

export default Router;
