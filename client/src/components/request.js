import React from "react";
import styled from "styled-components";
import Avatar from "components/avatar";
import DateDisplay from "components/date";
import { TypeIcon, CodeIcon } from "components/icons";

const statusLookup = {
  created: "#A03333",
  inprogress: "#B79312",
  completed: "#42A033",
};

const RequestContainer = styled.li`
  width: 100%;
  margin-bottom: 1rem;
  border-radius: 0.5rem;
`;

const Header = styled.header`
  padding: 0.5rem 1rem;
  background-color: ${({ status }) => statusLookup[status] || "transparent"};
  height: 32px;
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Body = styled.section`
  padding: 1rem 1rem 0 1rem;
  background-color: #222;
  border-left: 1px solid #282828;
  border-right: 1px solid #282828;
`;

const Footer = styled.footer`
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
  padding: 0 1rem 1rem 1rem;
  background-color: #222;
  color: #f2f2f2;
  font-weight: 700;
  line-height: 1rem;
  border: 1px solid #282828;
  border-top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CreationTime = styled.span`
  color: #fff;
  font-weight: 700;
`;

const Request = ({
  type,
  username,
  description,
  link,
  created_at,
  accepted_at,
  completed_at,
  avatar,
  updateStatus,
}) => {
  const status = completed_at
    ? "completed"
    : accepted_at
    ? "inprogress"
    : "created";

  return (
    <RequestContainer>
      <Header status={status} onClick={updateStatus}>
        <TypeIcon type={type} />
        <CreationTime>
          <DateDisplay date={created_at} />
        </CreationTime>
      </Header>
      <Body>
        <Avatar avatar={avatar} />
      </Body>
      <Footer>
        @{username}
        <a href={link} target="_blank" rel="noopener noreferrer">
          <CodeIcon />
        </a>
      </Footer>
    </RequestContainer>
  );
};

export default Request;
