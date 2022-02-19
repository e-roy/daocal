import React from "react";
import Blockies from "react-blockies";
import { useProvider } from "wagmi";

export type AvatarProps = {
  address?: string;
  size: number;
  className?: string;
};

const Avatar = ({
  address = "0x0000000000000000000000000000000000000000",
  size = 8,
  className,
}: AvatarProps) => {
  const provider = useProvider();

  return (
    <Blockies
      seed={address}
      className={"rounded-full" + (className ? " " + className : "")}
      scale={size}
    />
  );
};

export default Avatar;
