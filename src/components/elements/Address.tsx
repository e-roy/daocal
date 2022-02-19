import React from "react";

export type AddressProps = {
  address: string;
  shortened?: boolean;
};

const Address = ({ address, shortened = false }: AddressProps) => {
  let displayAddress = "";
  if (shortened && address) {
    if (
      address.includes(".eth") ||
      address === "" ||
      address === "Not connected"
    ) {
      displayAddress = address;
    } else {
      displayAddress = `${address.substring(0, 4)}...${address.substring(
        address.length - 4
      )}`.toLowerCase();
    }
  } else if (!shortened && address) {
    displayAddress = address;
  }

  return (
    <div>
      <div className={"text-neutral-400"}>{displayAddress}</div>
    </div>
  );
};

export default Address;
