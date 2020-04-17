import { useReducer, useCallback } from "react";
import produce from "immer";
import { makeHash } from "utils/serialization";
import { unixTimestamp } from "utils/date";

function checkDate(a, b) {
  const leftDate = new Date(a);
  const rightDate = new Date(b);

  if (leftDate < rightDate) {
    return -1;
  }

  if (leftDate > rightDate) {
    return 1;
  }

  return 0;
}

function getStatus(request) {
  if (request.accepted_at === undefined || request.completed_at === undefined) {
    throw new Error("Request must have accepted_at and created_at properties");
  }

  if (request.accepted_at && request.completed_at === null) {
    return 0;
  }

  if (request.accepted_at === null && request.completed_at === null) {
    return 1;
  }

  if (request.accepted_at && request.completed_at) {
    return 2;
  }
}

export const sortRequests = (list) => {
  return list.sort((a, b) => {
    if (getStatus(a) < getStatus(b)) {
      return -1;
    }
    if (getStatus(a) > getStatus(b)) {
      return 1;
    }

    if (a.completed_at && b.completed_at) {
      /* if completed, newest on top */
      return checkDate(b.completed_at, a.completed_at);
    }

    return checkDate(a.created_at, b.created_at);
  });
};

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
