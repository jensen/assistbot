import * as React from "react";
import styled from "styled-components";
import Avatar from "components/avatar";

const MessageContainer = styled.li`
  background-color: #222222;
  margin-bottom: 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid #282828;

  &:last-of-type {
    margin-bottom: 1rem;
  }
`;

const MessageHeader = styled.div`
  display: flex;
  flex-direction: ${({ alternate }) => (alternate ? "row" : "row-reverse")};
  padding: 0.25rem 0.5rem;
  background-color: #282828;
  font-weight: 700;
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
`;

const MessageList = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 0.25rem 0;
  align-items: ${({ alternate }) => (alternate ? "flex-start" : "flex-end")};
`;

const Message = styled.div`
  color: #ddd;
  border-radius: 0.25rem;
  padding: 0rem 0.5rem;
  margin-bottom: 0.25rem;
  line-height: 1rem;
  text-align: ${({ alternate }) => (alternate ? "left" : "right")};
`;

const UserName = styled.span`
  padding-left: 0.5rem;
  padding-right: 0.5rem;
`;

const MessageGroup = ({ username, avatar, messages, alternate }) => {
  return (
    <MessageContainer alternate={alternate}>
      <MessageHeader alternate={alternate}>
        <Avatar size="24" avatar={avatar} />
        <UserName>{username}</UserName>
      </MessageHeader>
      <MessageList alternate={alternate}>
        {messages.map((message) => (
          <Message alternate={alternate}>{message}</Message>
        ))}
      </MessageList>
    </MessageContainer>
  );
};

export default MessageGroup;
