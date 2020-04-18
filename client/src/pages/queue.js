import React, { useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import Request from "components/request";
import useRequests, { sortRequests } from "hooks/use-requests";
import { useSlowTicker } from "hooks/use-ticker";
import { getIsExpired } from "utils/date";
import { makeList } from "utils/serialization";

const RequestListContainer = styled.ul`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  overflow: none;
  overflow-y: auto;
  padding: 1rem;
`;

const Queue = () => {
  const {
    state,
    initializeRequests,
    updateRequests,
    updateRequest,
  } = useRequests();

  useEffect(() => {
    axios.get("/requests").then(({ data }) => initializeRequests(data));
  }, [initializeRequests]);

  useEffect(() => {
    const interval = setInterval(
      () =>
        axios.get(`/requests/${state.timestamp}`).then(({ data }) => {
          if (data.length > 0) {
            updateRequests(data);
          }
        }),
      5000
    );

    return () => clearInterval(interval);
  }, [state.timestamp, updateRequests]);

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

  /* update the component every couple of seconds so that
     relative times are accurate */
  useSlowTicker();

  return (
    <RequestListContainer>
      {sortRequests(
        makeList(state.requests).filter(
          (request) => getIsExpired(request.completed_at) === false
        )
      ).map((request) => (
        <Request
          key={`${request.id}-${request.created_at}`}
          {...request}
          updateStatus={() => updateStatus(request)}
        />
      ))}
    </RequestListContainer>
  );
};

export default Queue;
