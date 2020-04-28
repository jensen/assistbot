import React, { Suspense } from "react";
import Request from "components/request";
import graphql from "babel-plugin-relay/macro";
import { usePaginationFragment } from "react-relay/hooks";
import { getIsExpired } from "utils/date";
import { sortRequests } from "hooks/use-requests";
import styled from "styled-components";

const MessagePlaceholder = styled.li`
  height: 161px;
  margin-bottom: 1rem;
`;

const AllQueueFragment = graphql`
  fragment allQueueFragment on Queue
    @refetchable(queryName: "allQueuePaginationQuery") {
    id
    requests(
      first: $first
      after: $after
      last: $last
      before: $before
      status: $status
    ) @connection(key: "allQueueQuery_requests") {
      edges {
        node {
          createdAt
          acceptedAt
          completedAt
          ...requestRequest
        }
      }
    }
  }
`;

const QueueAll = (props) => {
  const { data } = usePaginationFragment(AllQueueFragment, props.queue);

  return sortRequests(
    data.requests.edges.filter(
      ({ node: request }) => getIsExpired(request.completedAt) === false
    )
  ).map(({ node: request }) => (
    <Suspense fallback={<MessagePlaceholder>Loading</MessagePlaceholder>}>
      <Request key={request.id} request={request} />
    </Suspense>
  ));
};

export default QueueAll;
