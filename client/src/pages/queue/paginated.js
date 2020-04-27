import React, { useEffect } from "react";
import graphql from "babel-plugin-relay/macro";
import { useRouteMatch } from "react-router-dom";
import { usePaginationFragment } from "react-relay/hooks";
import QueueAll from "pages/queue/all";
import QueueCurrent from "pages/queue/current";

const QueueFragment = graphql`
  fragment paginatedQueueFragment on Queue
    @refetchable(queryName: "QueuePaginationQuery") {
    id
    requests(first: $first, after: $after, status: $status)
      @connection(key: "queueQuery_requests") {
      edges {
        node {
          createdAt
          acceptedAt
          completedAt
          user {
            username
            avatar
          }
          messages {
            ...messageMessage
          }
          ...requestRequest
        }
      }
    }
  }
`;

const PaginatedQueue = (props) => {
  const { data, refetch } = usePaginationFragment(QueueFragment, props.queue);

  const currentRoute = useRouteMatch("/queue/current") !== null;
  const allRoute = useRouteMatch("/queue").isExact;

  useEffect(() => {
    if (currentRoute) {
      refetch({
        first: 1,
        status: "accepted",
      });
    }

    if (allRoute) {
      refetch({
        first: 10,
        status: null,
      });
    }
  }, [currentRoute, allRoute]);

  return (
    <>
      {currentRoute && <QueueCurrent requests={data.requests} />}
      {allRoute && <QueueAll requests={data.requests} />}
    </>
  );
};

export default PaginatedQueue;
