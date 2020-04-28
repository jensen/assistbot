import React, { Suspense } from "react";
import styled from "styled-components";
import Image from "components/image";
import JSResource from "utils/resource";

const Placeholder = styled.div`
  width: ${({ size }) => `${size}px`};
  height: ${({ size }) => `${size}px`};
  background-color: #222222;
  border-radius: 50%;
`;

const Avatar = ({ size = 64, avatar }) => (
  <Suspense
    fallback={<Image size={size} src={"/avatar.png"} alt="Loading Avatar" />}
  >
    <Image size={size} src={avatar} alt="Avatar" />
  </Suspense>
);

export default Avatar;
