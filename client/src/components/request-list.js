import React from "react";
import styled from "styled-components";
import Request from "components/request";

const RequestListContainer = styled.ul`
  padding: 1rem;
  margin: 0;
  list-style: none;
  width: 100%;
`;

const RequestList = ({ requests, updateStatus }) => {
  return (
    <RequestListContainer>
      {requests.map((request) => (
        <Request
          key={`${request.id}-${request.created_at}`}
          {...request}
          updateStatus={() => updateStatus(request)}
        />
      ))}
    </RequestListContainer>
  );
};

export default RequestList;
