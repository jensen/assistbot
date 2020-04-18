import { useReducer, useCallback, useEffect } from "react";
import axios from "axios";
import { makeHash } from "utils/serialization";
import { unixTimestamp } from "utils/date";

function reducer(state, action) {
  if (action.type === "INITIALIZE_MESSAGES") {
    const { messages } = action;

    return {
      timestamp: unixTimestamp(new Date()),
      messages: makeHash(messages),
    };
  }

  if (action.type === "ADD_MESSAGES") {
    const { messages } = action;

    return {
      timestamp: unixTimestamp(new Date()),
      messages: { ...state.messages, ...makeHash(messages) },
    };
  }

  throw new Error("Type not handled by reducer");
}

export const groupMessagesByUser = (list) =>
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

export default () => {
  const [state, dispatch] = useReducer(reducer, { timestamp: 0, messages: {} });

  const initializeMessages = useCallback(
    (messages) => dispatch({ type: "INITIALIZE_MESSAGES", messages }),
    []
  );

  const addMessages = useCallback(
    (messages) => dispatch({ type: "ADD_MESSAGES", messages }),
    []
  );

  useEffect(() => {
    axios.get("/messages").then(({ data }) => initializeMessages(data));
  }, [initializeMessages]);

  useEffect(() => {
    const interval = setInterval(
      () =>
        axios.get(`/messages/${state.timestamp}`).then(({ data }) => {
          if (data.length > 0) {
            addMessages(data);
          }
        }),
      5000
    );

    return () => clearInterval(interval);
  }, [state.timestamp, addMessages]);

  return {
    state,
    initializeMessages,
    addMessages,
  };
};
