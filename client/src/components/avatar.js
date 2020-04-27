import React from "react";
import Image from "components/image";

const Avatar = ({ size = 64, avatar }) => (
  <Image size={size} src={avatar} alt="Avatar" />
);

export default Avatar;
