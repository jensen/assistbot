import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import Message from "components/message";
import useMessages from "hooks/use-messages";
import { makeList } from "utils/serialization";

const MessageList = styled.ul`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  overflow: none;
  overflow-y: auto;
  padding: 1rem;
`;

const group = (list) =>
  list.reduce((groups, message) => {
    if (groups.length > 0) {
      const last = groups[groups.length - 1];

      if (last.username === message.username) {
        return [
          ...groups.slice(0, groups.length - 1),
          { ...last, messages: [...last.messages, message.message] },
        ];
      }

      return [
        ...groups,
        {
          ...message,
          messages: [message.message],
        },
      ];
    }

    return [
      {
        ...message,
        messages: [message.message],
      },
    ];
  }, []);

const ChatPage = () => {
  const { state, initializeMessages, addMessages } = useMessages();

  useEffect(() => {
    axios.get("/messages").then(({ data }) => initializeMessages(data));
  }, [initializeMessages]);

  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [state.messages]);

  return (
    <MessageList>
      {group(makeList(state.messages))
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .map((message, index) => (
          <Message alternate={index % 2 === 0} {...message} />
        ))}
      <div ref={scrollRef}></div>
    </MessageList>
  );
};

export default ChatPage;
