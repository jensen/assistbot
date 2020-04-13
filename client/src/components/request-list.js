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

function sort(list) {
  const compare = (a, b) => {
    const leftDate = new Date(a.created_at);
    const rightDate = new Date(b.created_at);

    if (leftDate < rightDate) {
      return -1;
    }

    if (leftDate > rightDate) {
      return 1;
    }

    return 0;
  };

  return list.sort(compare);
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
