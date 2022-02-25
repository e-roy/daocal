import React, { useState } from 'react';
import { TextField, Button, Dropdown } from '../../components/elements';
import { createNewDao } from '../../utils/directory/index';

const networkOptions = ['Etheruem mainnet', 'Polygon mainnet'];

const CreateDao = () => {
  const [daoAddress, setDaoAddress] = useState('');

  return (
    <div className="rounded-lg mt-4 border border-stone-800/50 shadow-lg h-64 w-1/2 p-4">
      <div className="my-1">Contract Address</div>
      <TextField onChange={(e) => setDaoAddress(e.target.value)} placeholder="contract address" />
      <div className="my-4">
        <div className="my-1">Select Network</div>
        <Dropdown options={networkOptions} />
      </div>
      <div className="my-4 justify-items-end">
        <Button onClick={() => createNewDao(daoAddress)}>create dao</Button>
      </div>
    </div>
  );
};

export default CreateDao;
