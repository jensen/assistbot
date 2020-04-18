import React from "react";
import { Route } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import Logo from "components/logo";
import SideBar from "components/sidebar";
import ChatPage from "pages/chat";
import QueuePage from "pages/queue";

if (process.env.NODE_ENV === "development" && process.env.REACT_APP_API_URL) {
  axios.defaults.baseURL = process.env.REACT_APP_API_URL;
}

const Container = styled.main`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  height: 64px;
  background-color: #212121;
  border-bottom: 1px solid #282828;
  display: flex;
  align-items: center;
  padding: 0 1rem;
`;

const Body = styled.section`
  background-color: #1c1c1c;
  height: 100%;
  display: flex;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
`;

const Positioned = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

function Application() {
  return (
    <Container>
      <Header></Header>
      <Body>
        <SideBar />
        <Content>
          <Positioned>
            <Route path="/chat">
              <ChatPage />
            </Route>
            <Route path="/queue">
              <QueuePage />
            </Route>
          </Positioned>
        </Content>
      </Body>
    </Container>
  );
}

export default Application;
