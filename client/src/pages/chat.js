import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import Message from "components/message";
import useMessages, { groupMessagesByUser } from "hooks/use-messages";
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

const ChatPage = () => {
  const { state } = useMessages();

  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [state.messages]);

  return (
    <MessageList>
      {groupMessagesByUser(makeList(state.messages))
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .map((message, index) => (
          <Message alternate={index % 2 === 0} {...message} />
        ))}
      <div ref={scrollRef}></div>
    </MessageList>
  );
};

export default ChatPage;
