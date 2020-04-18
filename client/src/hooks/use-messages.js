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
