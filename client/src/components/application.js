import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import RequestList from "components/request-list";
import { unixTimestamp } from "utils/date";

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

const Logo = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M32 21.6562C32 16.9919 28.8572 12.9167 24.4253 11.6887C24.1467 5.19629 18.7786 0 12.2188 0C5.4812 0 0 5.4812 0 12.2188C0 14.4146 0.584473 16.5525 1.69434 18.4294L0.0449219 24.3923L6.00806 22.7432C7.7334 23.7634 9.67969 24.3381 11.6885 24.4248C12.9163 28.8569 16.9917 32 21.6562 32C23.5181 32 25.3286 31.5042 26.9194 30.562L31.9548 31.9548L30.562 26.9194C31.5042 25.3286 32 23.5181 32 21.6562ZM6.30396 20.7158L2.73413 21.7034L3.72168 18.1335L3.49658 17.7815C2.43579 16.1218 1.875 14.1982 1.875 12.2188C1.875 6.51514 6.51514 1.875 12.2188 1.875C17.9224 1.875 22.5625 6.51514 22.5625 12.2188C22.5625 17.9224 17.9224 22.5625 12.2188 22.5625C10.2393 22.5625 8.31592 22.0017 6.65601 20.9409L6.30396 20.7158ZM29.2659 29.2659L26.6169 28.533L26.2632 28.7632C24.8918 29.6541 23.2986 30.125 21.6562 30.125C17.9902 30.125 14.7688 27.7546 13.6274 24.3557C19.2412 23.7085 23.7085 19.2412 24.356 13.6272C27.7546 14.7688 30.125 17.9902 30.125 21.6562C30.125 23.2986 29.6541 24.8918 28.7632 26.2632L28.533 26.6169L29.2659 29.2659Z"
      fill="#E2E2E2"
    />
    <path
      d="M11.2812 16.9375H13.1562V18.8125H11.2812V16.9375Z"
      fill="#E2E2E2"
    />
    <path
      d="M14.0938 9.375C14.0938 9.90747 13.877 10.3989 13.4834 10.759L11.2812 12.7747V15.0625H13.1562V13.6003L14.7493 12.1423C15.5242 11.4331 15.9688 10.4246 15.9688 9.375C15.9688 7.30713 14.2866 5.625 12.2188 5.625C10.1509 5.625 8.46875 7.30713 8.46875 9.375H10.3438C10.3438 8.34106 11.1848 7.5 12.2188 7.5C13.2527 7.5 14.0938 8.34106 14.0938 9.375Z"
      fill="#E2E2E2"
    />
  </svg>
);

function makeHash(list) {
  return list.reduce((hash, item) => ({ ...hash, [item.id]: item }), {});
}

function makeList(hash) {
  return Object.keys(hash).map((key) => hash[key]);
}

function Application() {
  const [state, setState] = useState({ timestamp: 0, requests: {} });

  useEffect(() => {
    axios.get("/requests").then((response) => {
      setState({
        timestamp: unixTimestamp(new Date()),
        requests: makeHash(response.data),
      });
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(
      () =>
        axios.get(`/requests/${state.timestamp}`).then(({ data }) => {
          if (data.length > 0) {
            setState((prev) => ({
              timestamp: unixTimestamp(new Date()),
              requests: { ...prev.requests, ...makeHash(data) },
            }));
          }
        }),
      5000
    );
    return () => clearInterval(interval);
  }, [state.timestamp]);

  const updateStatus = ({ id, accepted_at, completed_at }) => {
    const updateRequest = (request) => {
      setState((prev) => ({
        ...prev,
        requests: {
          ...prev.requests,
          [request.id]: {
            ...prev.requests[request.id],
            accepted_at: request.accepted_at,
            completed_at: request.completed_at,
          },
        },
      }));
    };

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
