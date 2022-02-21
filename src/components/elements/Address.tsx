import React from 'react';

export type AddressProps = {
  address: string;
  shortend?: boolean;
};

const Address = ({ address, shortend = false }: AddressProps) => {
  let displayAddress = '';
  if (shortend && address) {
    if (address.includes('.eth') || address === '' || address === 'Not connected') {
      displayAddress = address;
    } else {
      displayAddress = `${address.substring(0, 4)}...${address.substring(address.length - 4)}`.toLowerCase();
    }
  } else if (!shortend && address) {
    displayAddress = address;
  }

  return (
    <div>
      <div className={''}>{displayAddress}</div>
    </div>
  );
};

export default Address;
