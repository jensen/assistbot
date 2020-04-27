import { useReducer, useCallback } from "react";
import { makeHash } from "utils/serialization";

function reducer(state, action) {
  if (action.type === "INITIALIZE_MESSAGES") {
    return makeHash(action.messages);
  }

  if (action.type === "ADD_MESSAGES") {
    return { ...state, ...makeHash(action.messages) };
  }

  throw new Error("Type not handled by reducer");
}

export const groupMessagesByUser = (list) =>
  list.reduce((groups, message) => {
    if (groups.length > 0) {
      const last = groups[groups.length - 1];

      if (last.user.username === message.user.username) {
        return [
          ...groups.slice(0, groups.length - 1),
          { ...last, messages: [...last.messages, message] },
        ];
      }

      return [
        ...groups,
        {
          ...message,
          messages: [message],
        },
      ];
    }

    return [
      {
        ...message,
        messages: [message],
      },
    ];
  }, []);

export default () => {
  const [state, dispatch] = useReducer(reducer, {});

  const initializeMessages = useCallback(
    (messages) => dispatch({ type: "INITIALIZE_MESSAGES", messages }),
    []
  );

  const addMessages = useCallback(
    (messages) => dispatch({ type: "ADD_MESSAGES", messages }),
    []
  );

  return {
    state,
    initializeMessages,
    addMessages,
  };
};
