import React from "react";
import styled from "styled-components";

const Image = styled.img`
  width: ${({ size }) => `${size}px`};
  height: ${({ size }) => `${size}px`};
  border-radius: 32px;
  border: 2px solid #282828;
  background-color: #141414;
  flex-shrink: 0;
`;

const Avatar = ({ size = 64, avatar }) => {
  return <Image size={size} src={avatar} alt="Avatar" />;
};

export default Avatar;
