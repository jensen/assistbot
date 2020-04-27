import React, { Suspense } from "react";
import Request from "components/request";
import { getIsExpired } from "utils/date";
import { sortRequests } from "hooks/use-requests";
import styled from "styled-components";

const MessagePlaceholder = styled.li`
  height: 161px;
  margin-bottom: 1rem;
`;

const QueueAll = (props) =>
  sortRequests(
    props.requests.edges.filter(
      ({ node: request }) => getIsExpired(request.completedAt) === false
    )
  ).map(({ node: request }) => (
    <Suspense fallback={<MessagePlaceholder>Loading</MessagePlaceholder>}>
      <Request key={request.id} request={request} />
    </Suspense>
  ));

export default QueueAll;
