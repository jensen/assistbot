import React, { useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import Logo from "components/logo";
import RequestList from "components/request-list";
import useRequests from "hooks/use-requests";
import { makeList } from "utils/serialization";

axios.defaults.baseURL = "http://localhost:3001";

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

const SideBar = styled.div`
  width: 64px;
  height: 100%;
  background-color: #141414;
  border-right: 1px solid #282828;
`;

function Application() {
  const {
    state,
    initializeRequests,
    updateRequests,
    updateRequest,
  } = useRequests();

  useEffect(() => {
    axios.get("/requests").then(({ data }) => initializeRequests(data));
  }, [initializeRequests]);

  useEffect(() => {
    const interval = setInterval(
      () =>
        axios.get(`/requests/${state.timestamp}`).then(({ data }) => {
          if (data.length > 0) {
            updateRequests(data);
          }
        }),
      5000
    );

    return () => clearInterval(interval);
  }, [state.timestamp, updateRequests]);

  const updateStatus = ({ id, accepted_at, completed_at }) => {
    if (!accepted_at) {
      return axios
        .put(`/requests/${id}/accepted`)
        .then(({ data }) => updateRequest(data));
    }

    if (!completed_at) {
      return axios
        .put(`/requests/${id}/completed`)
        .then(({ data }) => updateRequest(data));
    }
  };

  return (
    <Container>
      <Header>
        <Logo />
      </Header>
      <Body>
        <SideBar />
        <RequestList
          requests={makeList(state.requests)}
          updateStatus={updateStatus}
        />
      </Body>
    </Container>
  );
}

export default Application;
