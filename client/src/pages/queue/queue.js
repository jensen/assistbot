import React, { useMemo, useEffect } from "react";
import styled from "styled-components";
import { useRouteMatch } from "react-router-dom";
import RelayEnvironment from "relay/environment";
import { preloadQuery, usePreloadedQuery } from "react-relay/hooks";
import graphql from "babel-plugin-relay/macro";
import { useSubscription } from "relay-hooks";
import { ConnectionHandler } from "relay-runtime";
import QueueAll from "pages/queue/all";
import QueueCurrent from "pages/queue/current";

const RequestListContainer = styled.ul`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  overflow: none;
  overflow-y: auto;
  padding: 1rem;
  scrollbar-width: none;
`;

const QueueAllQuery = graphql`
  query queueAllQuery(
    $first: Int
    $after: String
    $last: Int
    $before: String
    $status: String
  ) {
    queue {
      id
      ...allQueueFragment
    }
  }
`;

const QueueCurrentQuery = graphql`
  query queueCurrentQuery(
    $first: Int
    $after: String
    $last: Int
    $before: String
    $status: String
  ) {
    queue {
      id
      ...currentQueueFragment
    }
  }
`;

const QueueSubscription = graphql`
  subscription queueSubscription {
    addRequest {
      cursor
      node {
        ...requestRequest
      }
    }
  }
`;

const Queue = (props) => {
  const preloadedAllQueueQuery = useMemo(
    () =>
      preloadQuery(RelayEnvironment, QueueAllQuery, {
        first: 10,
      }),
    []
  );

  const preloadedCurrentQueueQuery = useMemo(
    () =>
      preloadQuery(RelayEnvironment, QueueCurrentQuery, {
        last: 1,
        status: "accepted",
      }),
    []
  );

  const { queue: queueAll } = usePreloadedQuery(
    QueueAllQuery,
    preloadedAllQueueQuery
  );

  const { queue: queueCurrent } = usePreloadedQuery(
    QueueCurrentQuery,
    preloadedCurrentQueueQuery
  );

  useSubscription(
    React.useMemo(
      () => ({
        subscription: QueueSubscription,
        updater: (store) => {
          const request = store.getRootField("addRequest");
          const root = store.getRoot();
          const queue = root.getLinkedRecord("queue");

          const requests = ConnectionHandler.getConnection(
            queue,
            "allQueueQuery_requests"
          );

          ConnectionHandler.insertEdgeAfter(
            requests,
            ConnectionHandler.buildConnectionEdge(store, requests, request)
          );
        },
      }),
      []
    )
  );

  const currentRoute = useRouteMatch("/queue/current") !== null;
  const allRoute = useRouteMatch("/queue").isExact;

  return (
    <RequestListContainer>
      {currentRoute && <QueueCurrent queue={queueCurrent} />}
      {allRoute && <QueueAll queue={queueAll} />}
    </RequestListContainer>
  );
};

export default Queue;
