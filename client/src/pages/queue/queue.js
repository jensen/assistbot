import React from "react";
import graphql from "babel-plugin-relay/macro";
import styled from "styled-components";
import { usePreloadedQuery } from "react-relay/hooks";
import { useSubscription } from "relay-hooks";
import { ConnectionHandler } from "relay-runtime";
import PaginatedQueue from "pages/queue/paginated";

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

const QueueQuery = graphql`
  query queueQuery($first: Int, $after: String, $status: String) {
    queue {
      id
      ...paginatedQueueFragment
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

const Queue = ({ preloadedQuery }) => {
  const { queue } = usePreloadedQuery(QueueQuery, preloadedQuery);

  useSubscription(
    React.useMemo(
      () => ({
        subscription: QueueSubscription,
        updater: (store) => {
          const root = store.getRoot().getLinkedRecord("queue");

          const request = store.getRootField("addRequest");
          const requests = ConnectionHandler.getConnection(
            root,
            "queueQuery_requests"
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

  return (
    <RequestListContainer>
      <PaginatedQueue queue={queue} />
    </RequestListContainer>
  );
};

export default Queue;
