import React, { useState } from 'react';
import { TextField, Button, Dropdown } from '../../components/elements';
import { createNewDao } from '../../utils/directory/index';

const networkOptions = [
  {
    label: 'Etheruem mainnet',
    value: 1
  },
  {
    label: 'Polygon mainnet',
    value: 137
  }
];

export type CreateDaoProps = {};

const CreateDao = ({}: CreateDaoProps) => {
  const [daoAddress, setDaoAddress] = useState('');
  const [networkId, setNetworkId] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  const handleNetwork = (val: number) => {
    // console.log(val);
    setNetworkId(val);
  };

  const handleCreateDao = async () => {
    const dao: any = await createNewDao(daoAddress, networkId);
    console.log(dao);
    if (dao.error) setError(dao.error);
    else setError('');
  };

  return (
    <div className="rounded-lg mt-4 border border-stone-800/50 shadow-lg w-1/2 p-4">
      <div className="my-1">Contract Address</div>
      <TextField onChange={(e) => setDaoAddress(e.target.value)} placeholder="contract address" />
      <div className="my-4">
        <div className="my-1">Select Network</div>
        <Dropdown options={networkOptions} onSelect={handleNetwork} />
      </div>
      <div className="mt-8 mb-2 flex justify-between">
        <div>
          {error && <div className="bg-red-900 py-2 px-4 rounded-lg text-stone-100 font-semibold italic">{error}</div>}
        </div>
        <Button onClick={() => handleCreateDao()}>create dao</Button>
      </div>
    </div>
  );
};

export default CreateDao;
