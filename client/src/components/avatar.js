import React from "react";
import styled from "styled-components";

const Image = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 32px;
  border: 2px solid #282828;
  background-color: #141414;
  margin-bottom: 0.5rem;
  flex-shrink: 0;
`;

const Avatar = ({ avatar }) => {
  return <Image src={avatar} alt="Avatar" />;
};

export default Avatar;
