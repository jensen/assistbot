import React from "react";
import axios from "axios";
import styled from "styled-components";
import SideBar from "components/sidebar";
import Router from "pages";

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
            <Router />
          </Positioned>
        </Content>
      </Body>
    </Container>
  );
}

export default Application;
