import * as React from "react";
import { useFragment } from "react-relay/hooks";
import graphql from "babel-plugin-relay/macro";
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
  padding: 0.25rem 0;
  align-items: ${({ alternate }) => (alternate ? "flex-start" : "flex-end")};
`;

const UserName = styled.span`
  padding-left: 0.5rem;
  padding-right: 0.5rem;
`;

const GroupFragment = graphql`
  fragment groupGroup on MessageGroup {
    id
    messages {
      ...messageMessage
    }
    user {
      id
      username
      avatar
    }
  }
`;

const MessageGroup = ({ alternate, ...props }) => {
  const {
    messages,
    user: { username, avatar },
  } = useFragment(GroupFragment, props.group);

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
