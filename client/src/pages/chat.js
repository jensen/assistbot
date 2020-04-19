import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import Message from "components/message";
import useMessages, { groupMessagesByUser } from "hooks/use-messages";
import useLiveApi from "hooks/use-live-api";
import { makeList } from "utils/serialization";

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

const ChatPage = () => {
  const { state, initializeMessages, addMessages } = useMessages();
  const { loading } = useLiveApi("/messages", initializeMessages, addMessages);

  const [firstScroll, setFirstScroll] = useState(true);

  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({
        behavior: firstScroll ? "auto" : "smooth",
      });
    }
  }, [state, firstScroll]);

  useEffect(() => {
    if (!loading) {
      setFirstScroll(false);
    }
  }, [loading]);

  return (
    <MessageList>
      {groupMessagesByUser(makeList(state))
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .map((message, index) => (
          <Message key={message.id} alternate={index % 2 === 0} {...message} />
        ))}
      <div ref={scrollRef}></div>
    </MessageList>
  );
};

export default ChatPage;
