import React from "react";
import { preloadQuery, usePreloadedQuery } from "react-relay/hooks";
import graphql from "babel-plugin-relay/macro";
import RelayEnvironment from "relay/environment";
import Request from "components/request";
import MessageGroup from "components/message";

const RequestQuery = graphql`
  query currentRequestQuery {
    request(filter: "accepted") {
      id
      description
      createdAt
      acceptedAt
      completedAt
      user {
        username
        avatar
      }
      messages {
        message
        emotes
      }
    }
  }
`;

const Current = (props) => {
  const preloadedQuery = React.useMemo(
    () => preloadQuery(RelayEnvironment, RequestQuery, {}),
    []
  );
  const data = usePreloadedQuery(RequestQuery, preloadedQuery);
  if (!data.request) return <div>No accepted requests.</div>;

  return (
    <>
      <Request
        {...data.request}
        username={data.request.user.username}
        avatar={data.request.user.avatar}
      />
      <MessageGroup
        {...data.request.user}
        messages={data.request.messages}
        alternate
      />
    </>
  );
};

export default Current;
