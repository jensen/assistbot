import React, { Suspense, useEffect } from "react";
import Request from "components/request";
import graphql from "babel-plugin-relay/macro";
import { usePaginationFragment } from "react-relay/hooks";

const CurrentQueueFragment = graphql`
  fragment currentQueueFragment on Queue
    @refetchable(queryName: "currentQueuePaginationQuery") {
    id
    requests(
      first: $first
      after: $after
      last: $last
      before: $before
      status: $status
    ) @connection(key: "currentQueueQuery_requests") {
      edges {
        node {
          ...requestRequest
        }
      }
    }
  }
`;

const QueueCurrent = (props) => {
  const { data } = usePaginationFragment(CurrentQueueFragment, props.queue);

  return data.requests.edges.map(({ node: request }) => (
    <>
      <Suspense fallback={<div>Loading</div>}>
        <Request request={request} />
      </Suspense>
    </>
  ));
};

export default QueueCurrent;
