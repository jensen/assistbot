import React from "react";
import styled from "styled-components";
import Request from "components/request";
import useRequests, { sortRequests } from "hooks/use-requests";
import useLiveApi from "hooks/use-live-api";
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
  scrollbar-width: none;
`;

const Queue = () => {
  const {
    state,
    initializeRequests,
    addRequests,
    updateStatus,
  } = useRequests();

  useLiveApi("/requests", initializeRequests, addRequests);

  /* update the component every couple of seconds so that
     relative times are accurate */
  useSlowTicker();

  return (
    <RequestListContainer>
      {sortRequests(
        makeList(state).filter(
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
