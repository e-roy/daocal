import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/elements';

export type DaoCardProps = {
  dao: any;
};

const DaoCard = ({ dao }: DaoCardProps) => {
  const navigate = useNavigate();

  return (
    <div className="rounded-lg mt-4 p-4 border border-stone-800/50 shadow-lg">
      <div className="h-36 px-4 py-2 font-medium  text-stone-100 rounded-lg">
        <div className="flex justify-between text-stone-400 text-sm">
          <div>{dao.symbol}</div>
          <div>Network : {dao.network}</div>
        </div>
        <div className="text-lg">{dao.name}</div>
      </div>
      <Button onClick={() => navigate(`/calendar/${dao.contract}`)}>View Calendar</Button>
    </div>
  );
};

export default DaoCard;
