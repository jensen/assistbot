import { useReducer, useCallback } from "react";
import axios from "axios";
import produce from "immer";
import { makeHash } from "utils/serialization";

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
    return makeHash(action.requests);
  }

  if (action.type === "ADD_REQUESTS") {
    return { ...state, ...makeHash(action.requests) };
  }

  if (action.type === "UPDATE_REQUEST") {
    const { request } = action;

    return produce(state, (draftState) => {
      draftState[request.id].accepted_at = request.accepted_at;
      draftState[request.id].completed_at = request.completed_at;
    });
  }

  throw new Error("Type not handled by reducer");
}

export default () => {
  const [state, dispatch] = useReducer(reducer, {});

  const initializeRequests = useCallback(
    (requests) => dispatch({ type: "INITIALIZE_REQUESTS", requests }),
    []
  );

  const addRequests = useCallback(
    (requests) => dispatch({ type: "ADD_REQUESTS", requests }),
    []
  );

  const updateRequest = useCallback(
    (request) => dispatch({ type: "UPDATE_REQUEST", request }),
    []
  );

  const updateStatus = ({ id, accepted_at, completed_at }) => {
    if (!accepted_at) {
      return axios
        .put(`/requests/${id}/accepted`)
        .then(({ data }) => updateRequest(data));
    }

    if (!completed_at) {
      return axios
        .put(`/requests/${id}/completed`)
        .then(({ data }) => updateRequest(data));
    }
  };

  return {
    state,
    initializeRequests,
    addRequests,
    updateRequest,
    updateStatus,
  };
};
