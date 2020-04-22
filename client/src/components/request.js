import React, { useMemo } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import Avatar from "components/avatar";
import DateDisplay from "components/date";
import { TypeIcon } from "components/icons";
import { separateUrls } from "utils/url";
import { fadeIntoTime } from "utils/date";

const statusLookup = {
  created: "#A03333",
  inprogress: "#B79312",
  completed: "#42A033",
};

const RequestContainer = styled.li`
  width: 100%;
  margin-bottom: 1rem;
  border-radius: 0.5rem;
  opacity: ${({ opacity }) => opacity};
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
  display: flex;
  padding: 1rem 1rem 0 1rem;
  background-color: #222;
  border-left: 1px solid #282828;
  border-right: 1px solid #282828;
`;

const Description = styled.div`
  color: #e2e2e2;
  margin-left: 1rem;
  font-size: 0.9rem;
  line-height: 1rem;
`;

const Footer = styled.footer`
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
  padding: 1rem;
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

const DescriptionLink = styled.a`
  font-weight: 700;

  color: #f2f2f2;
  text-decoration: none;

  &:hover {
    color: #ff5f57;
  }

  &:visited {
    color: #515151;
  }
`;

const getDescription = (description) =>
  separateUrls(description).map((part) =>
    part.type === "link" ? (
      <DescriptionLink key={uuidv4()} href={part.value}>
        {part.value}
      </DescriptionLink>
    ) : (
      part.value
    )
  );

const Request = ({
  type,
  username,
  description,
  createdAt,
  acceptedAt,
  completedAt,
  avatar,
  updateStatus,
}) => {
  const status = completedAt
    ? "completed"
    : acceptedAt
    ? "inprogress"
    : "created";

  const separatedDescription = useMemo(
    () => getDescription(description || ""),
    [description]
  );

  return (
    <RequestContainer opacity={fadeIntoTime(completedAt)}>
      <Header status={status} onClick={updateStatus}>
        <TypeIcon type={type} />
        <CreationTime>
          <DateDisplay date={createdAt} />
        </CreationTime>
      </Header>
      <Body>
        <Avatar size="64" avatar={avatar} />
        <Description>{separatedDescription}</Description>
      </Body>
      <Footer>@{username}</Footer>
    </RequestContainer>
  );
};

export default Request;
