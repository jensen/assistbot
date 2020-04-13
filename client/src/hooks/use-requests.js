import { useReducer, useCallback } from "react";
import produce from "immer";
import { makeHash } from "utils/serialization";
import { unixTimestamp } from "utils/date";

function reducer(state, action) {
  if (action.type === "INITIALIZE_REQUESTS") {
    const { requests } = action;

    return {
      timestamp: unixTimestamp(new Date()),
      requests: makeHash(requests),
    };
  }

  if (action.type === "UPDATE_REQUESTS") {
    const { requests } = action;

    return {
      timestamp: unixTimestamp(new Date()),
      requests: { ...state.requests, ...makeHash(requests) },
    };
  }

  if (action.type === "UPDATE_REQUEST") {
    const { request } = action;

    return produce(state, (draftState) => {
      draftState.requests[request.id].accepted_at = request.accepted_at;
      draftState.requests[request.id].completed_at = request.completed_at;
    });
  }

  throw new Error("Type not handled by reducer");
}

export default () => {
  const [state, dispatch] = useReducer(reducer, { timestamp: 0, requests: {} });

  const initializeRequests = useCallback(
    (requests) => dispatch({ type: "INITIALIZE_REQUESTS", requests }),
    []
  );

  const updateRequests = useCallback(
    (requests) => dispatch({ type: "UPDATE_REQUESTS", requests }),
    []
  );

  const updateRequest = useCallback(
    (request) => dispatch({ type: "UPDATE_REQUEST", request }),
    []
  );

  return {
    state,
    initializeRequests,
    updateRequests,
    updateRequest,
  };
};
