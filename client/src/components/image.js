import React from "react";
import styled from "styled-components";
import JSResource from "utils/resource";

const ImageContainer = styled.img`
  width: ${({ size }) => `${size}px`};
  height: ${({ size }) => `${size}px`};
  border-radius: 32px;
  border: 2px solid #282828;
  background-color: #141414;
  flex-shrink: 0;
`;

const SuspenseImage = ({ src, size, alt }) => {
  if (src) {
    const resource = JSResource(
      src,
      () =>
        new Promise((resolve) => {
          const image = new Image();
          image.onload = () => resolve(src);
          image.onerror = (error) => resolve(src);
          image.src = src;
        })
    );

    resource.load();
    resource.read();
  }
  return <ImageContainer size={size} src={src} alt={alt} />;
};

export default SuspenseImage;
