import React, { useRef, useEffect, Suspense } from "react";
import styled from "styled-components";
import graphql from "babel-plugin-relay/macro";
import { usePreloadedQuery } from "react-relay/hooks";
import { useSubscription } from "relay-hooks";
import { ConnectionHandler } from "relay-runtime";
import MessageGroup from "components/group";

const MessageList = styled.ul`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  overflow: none;
  overflow-y: auto;
  padding: 1rem 1rem 0 1rem;
  scrollbar-width: none;
`;

const MessagePlaceholder = styled.li`
  height: 200px;
`;

const ChatQuery = graphql`
  query chatQuery {
    chat {
      groups(last: 250) @connection(key: "chatQuery_groups") {
        edges {
          node {
            id
            ...groupGroup
          }
        }
      }
    }
  }
`;

const ChatSubscription = graphql`
  subscription chatSubscription {
    addMessage {
      cursor
      node {
        ...messageMessage
      }
    }
  }
`;

const ChatPage = (props) => {
  const {
    chat: { groups },
  } = usePreloadedQuery(ChatQuery, props.preloadedQuery);

  useSubscription(
    React.useMemo(
      () => ({
        subscription: ChatSubscription,
        updater: (store) => {
          // const root = store.getRoot().getLinkedRecord("chat");
          // const message = store.getRootField("addMessage");
          // const messages = ConnectionHandler.getConnection(
          //   root,
          //   "chatQuery_messages"
          // );
          // ConnectionHandler.insertEdgeAfter(
          //   messages,
          //   ConnectionHandler.buildConnectionEdge(store, messages, message)
          // );
        },
      }),
      []
    )
  );

  const scrollRef = useRef(null);
  const initialScrollRef = useRef(true);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({
        behavior: initialScrollRef.current ? "auto" : "smooth",
      });
      initialScrollRef.current = false;
    }
  }, [groups.edges]);

  return (
    <MessageList>
      {groups.edges.map(({ node: group }, index) => (
        <Suspense fallback={<MessagePlaceholder>Loading</MessagePlaceholder>}>
          <MessageGroup
            key={group.id}
            alternate={index % 2 === 0}
            group={group}
          />
        </Suspense>
      ))}
      <div ref={scrollRef}></div>
    </MessageList>
  );
};

export default ChatPage;
