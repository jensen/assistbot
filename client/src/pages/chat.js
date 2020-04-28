import React, { useRef, useEffect, Suspense } from "react";
import styled from "styled-components";
import graphql from "babel-plugin-relay/macro";
import { usePreloadedQuery } from "react-relay/hooks";
import { useSubscription } from "relay-hooks";
import { ConnectionHandler } from "relay-runtime";
import MessageGroup, { MessageGroupLoading } from "components/group";

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

const ChatQuery = graphql`
  query chatQuery($last: Int) {
    chat {
      messages(last: $last) @connection(key: "chatQuery_messages") {
        edges {
          node {
            id
            user {
              username
              avatar
            }
            message
            emotes
            ...messageMessage
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
        user {
          username
          avatar
        }
        ...messageMessage
      }
    }
  }
`;

const groupMessagesByUser = (list) => {
  const [first] = list;
  const groups = [
    {
      username: first.user.username,
      avatar: first.user.avatar,
      messages: [{ ...first }],
    },
  ];

  for (let i = 1, groupIndex = 0; i < list.length; i++) {
    if (list[i].user.username !== list[i - 1].user.username) {
      groupIndex += 1;
    }

    if (!groups[groupIndex]) {
      groups[groupIndex] = {
        username: list[i].user.username,
        avatar: list[i].user.avatar,
        messages: [],
      };
    }

    groups[groupIndex].messages.push({ ...list[i] });
  }

  return groups;
};

const ChatPage = (props) => {
  const {
    chat: { messages },
  } = usePreloadedQuery(ChatQuery, props.preloadedQuery);

  useSubscription(
    React.useMemo(
      () => ({
        subscription: ChatSubscription,
        updater: (store) => {
          const root = store.getRoot().getLinkedRecord("chat");
          const message = store.getRootField("addMessage");

          const messages = ConnectionHandler.getConnection(
            root,
            "chatQuery_messages"
          );

          ConnectionHandler.insertEdgeAfter(
            messages,
            ConnectionHandler.buildConnectionEdge(store, messages, message)
          );
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
  }, [messages]);

  return (
    <MessageList>
      {groupMessagesByUser(messages.edges.map((edge) => edge.node)).map(
        (group, index) => (
          <Suspense
            fallback={<MessageGroupLoading alternate={index % 2 === 0} />}
          >
            <MessageGroup alternate={index % 2 === 0} {...group} />
          </Suspense>
        )
      )}
      <div ref={scrollRef}></div>
    </MessageList>
  );
};

export default ChatPage;

/*

map(
        ({ node: group }, index) => (
          <Suspense fallback={<MessagePlaceholder>Loading</MessagePlaceholder>}>
            <MessageGroup
              key={group.id}
              alternate={index % 2 === 0}
              group={group}
            />
          </Suspense>
        )
      )
*/
