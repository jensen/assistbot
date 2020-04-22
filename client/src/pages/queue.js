import React from "react";
import styled from "styled-components";
import { preloadQuery, usePreloadedQuery } from "react-relay/hooks";
import { useSubscription } from "relay-hooks";
import graphql from "babel-plugin-relay/macro";
import RelayEnvironment from "relay/environment";
import { sortRequests } from "hooks/use-requests";
import Request from "components/request";
import { getIsExpired } from "utils/date";

const QueueQuery = graphql`
  query queueQuery {
    requests {
      id
      description
      createdAt
      acceptedAt
      completedAt
      user {
        username
        avatar
      }
    }
  }
`;

const QueueSubscription = graphql`
  subscription queueSubscription {
    requestAdded {
      id
      description
      createdAt
      acceptedAt
      completedAt
      user {
        username
        avatar
      }
    }
  }
`;

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

const Queue = () => {
  const preloadedQuery = React.useMemo(
    () => preloadQuery(RelayEnvironment, QueueQuery, {}),
    []
  );
  const data = usePreloadedQuery(QueueQuery, preloadedQuery);

  useSubscription(
    React.useMemo(
      () => ({
        variables: {},
        subscription: QueueSubscription,
      }),
      []
    )
  );

  return (
    <RequestListContainer>
      {sortRequests(
        data.requests.filter(
          (request) => getIsExpired(request.completedAt) === false
        )
      ).map((request) => (
        <Request
          key={`${request.id}-${request.createdAt}`}
          {...request}
          username={request.user.username}
          avatar={request.user.avatar}
          updateStatus={() => null}
        />
      ))}
    </RequestListContainer>
  );
};

export default Queue;
