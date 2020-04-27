import React from "react";
import graphql from "babel-plugin-relay/macro";
import { useFragment } from "react-relay/hooks";
import styled from "styled-components";
import { splitMessage, convertTwitchEmotes } from "utils/emote";

const MessageContainer = styled.li`
  color: #ddd;
  border-radius: 0.25rem;
  padding: 0rem 0.5rem;
  margin-bottom: 0.25rem;
  line-height: 1rem;
  text-align: ${({ alternate }) => (alternate ? "left" : "right")};
`;

const MessageFragment = graphql`
  fragment messageMessage on Message {
    message
    emotes
  }
`;

const Message = (props) => {
  const { message, emotes } = useFragment(MessageFragment, props.message);

  return (
    <MessageContainer alternate={props.atlernate}>
      {emotes ? (
        <div>
          {splitMessage(message, convertTwitchEmotes(emotes)).map((part) =>
            part.type === "image" ? (
              <img src={part.value} alt="Emote" />
            ) : (
              part.value
            )
          )}
        </div>
      ) : (
        message
      )}
    </MessageContainer>
  );
};

export default Message;
