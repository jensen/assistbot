import React, { Suspense } from "react";
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

const preloadedQuery = preloadQuery(RelayEnvironment, RequestQuery, {});

const Current = (props) => {
  const data = usePreloadedQuery(RequestQuery, props.preloadedQuery);
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

const CurrentContainer = () => {
  return (
    <Suspense fallback="Loading...">
      <Current preloadedQuery={preloadedQuery} />
    </Suspense>
  );
};

export default CurrentContainer;
