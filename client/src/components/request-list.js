import React from "react";
import styled from "styled-components";
import Request from "components/request";
import { sortRequests } from "hooks/use-requests";
import { useSlowTicker } from "hooks/use-ticker";
import { getIsExpired } from "utils/date";

const RequestListPositioned = styled.div`
  position: relative;
  width: 100%;
`;

const RequestListContainer = styled.ul`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  overflow: none;
  overflow-y: auto;
  padding: 1rem;
  margin: 0;
  list-style: none;
`;

const RequestList = ({ requests, updateStatus }) => {
  /* update the component every couple of seconds so that
     relative times are accurate */
  useSlowTicker();

  return (
    <RequestListPositioned>
      <RequestListContainer>
        {sortRequests(
          requests.filter(
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
    </RequestListPositioned>
  );
};

export default RequestList;
