import React from "react";
import styled from "styled-components";
import Request from "components/request";

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

function sort(list) {
  return list.sort((a, b) => {
    if (getStatus(a) < getStatus(b)) {
      return -1;
    }
    if (getStatus(a) > getStatus(b)) {
      return 1;
    }

    return checkDate(a.created_at, b.created_at);
  });
}

const RequestList = ({ requests, updateStatus }) => {
  return (
    <RequestListPositioned>
      <RequestListContainer>
        {sort(requests).map((request) => (
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
