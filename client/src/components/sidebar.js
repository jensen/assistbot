import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Menu as MenuIcon } from "components/icons";

const SideBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  background-color: #141414;
  border-right: 1px solid #282828;
`;

const Menu = styled.ul``;
const MenuItem = styled.li`
  width: 100%;
  padding: 1rem 1rem;

  &:hover {
    background-color: #282828;
    cursor: pointer;
  }
`;

const Separator = styled.div`
  border-bottom: 1px dashed #282828;
  width: 100%;
`;

const SideBar = () => (
  <SideBarContainer>
    <Menu>
      <Link to="/chat">
        <MenuItem>
          <MenuIcon.Chat />
        </MenuItem>
      </Link>
      <Separator />
      <Link to="/queue">
        <MenuItem>
          <MenuIcon.Queue />
        </MenuItem>
      </Link>
      <Separator />
      <Link to="/queue/current">
        <MenuItem>
          <MenuIcon.InProgress />
        </MenuItem>
      </Link>
    </Menu>
  </SideBarContainer>
);

export default SideBar;
