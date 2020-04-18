import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Menu as MenuIcon } from "components/icons";

const SideBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  width: 64px;
  height: 100%;
  background-color: #141414;
  border-right: 1px solid #282828;
`;

const Menu = styled.ul``;
const MenuItem = styled.li`
  margin-bottom: 1rem;
`;

const SideBar = () => (
  <SideBarContainer>
    <Menu>
      <MenuItem>
        <Link to="/chat">
          <MenuIcon.Chat />
        </Link>
      </MenuItem>
      <MenuItem>
        <Link to="/queue">
          <MenuIcon.Queue />
        </Link>
      </MenuItem>
    </Menu>
  </SideBarContainer>
);

export default SideBar;
