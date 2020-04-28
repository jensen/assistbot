import React, { useTransition } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
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

const MenuButton = ({ to, children }) => {
  const history = useHistory();
  const [startTransition, isPending] = useTransition();

  return (
    <div onClick={() => startTransition(() => history.push(to))}>
      {children}
    </div>
  );
};

const SideBar = () => {
  return (
    <SideBarContainer>
      <Menu>
        <MenuButton to="/chat">
          <MenuItem>
            <MenuIcon.Chat />
          </MenuItem>
        </MenuButton>
        <Separator />
        <MenuButton to="/queue">
          <MenuItem>
            <MenuIcon.Queue />
          </MenuItem>
        </MenuButton>
        <Separator />
        <MenuButton to="/queue/current">
          <MenuItem>
            <MenuIcon.Current />
          </MenuItem>
        </MenuButton>
      </Menu>
    </SideBarContainer>
  );
};

export default SideBar;
