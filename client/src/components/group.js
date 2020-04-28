import * as React from "react";
import styled from "styled-components";
import Avatar from "components/avatar";
import Message from "components/message";

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
  padding: 0.5rem 0;
  align-items: ${({ alternate }) => (alternate ? "flex-start" : "flex-end")};
`;

const UserName = styled.span`
  padding-left: 0.5rem;
  padding-right: 0.5rem;
`;

const Placeholder = styled.div`
  background-color: ${({ color }) => color || "#282828"};
  height: 0.6rem;
  width: ${({ width }) => width};
  margin: 0 0.5rem 0.25rem 0.5rem;

  &:last-of-type {
    margin-bottom: 0;
  }
`;

export const MessageGroupLoading = ({ alternate }) => {
  const getPercent = () => `${Math.floor(Math.random() * 60) + 20}%`;

  return (
    <MessageContainer alternate={alternate}>
      <MessageHeader alternate={alternate}>
        <Avatar size="24" placeholder />
        <UserName>&nbsp;</UserName>
      </MessageHeader>

      <MessageList alternate={alternate}>
        <Placeholder width={getPercent()} />
        <Placeholder width={getPercent()} />
        <Placeholder width={getPercent()} />
      </MessageList>
    </MessageContainer>
  );
};

const MessageGroup = ({ alternate, username, avatar, messages, ...props }) => {
  return (
    <MessageContainer alternate={alternate}>
      <MessageHeader alternate={alternate}>
        <Avatar size="24" avatar={avatar} />
        <UserName>{username}</UserName>
      </MessageHeader>

      <MessageList alternate={alternate}>
        {messages.map((message) => (
          <Message key={message.id} alternate={alternate} message={message} />
        ))}
      </MessageList>
    </MessageContainer>
  );
};

export default MessageGroup;
