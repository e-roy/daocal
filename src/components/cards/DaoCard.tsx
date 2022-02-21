import React from 'react';
import { useNavigate } from 'react-router-dom';

export type DaoCardProps = {
  dao: any;
};

const DaoCard = ({ dao }: DaoCardProps) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/calendar/${dao.contract}`)}
      className="cursor-pointer rounded-xl p-[3px] bg-gradient-to-r from-fuchsia-700 hover:from-fuchsia-600 to-sky-600 hover:to-sky-400 shadow-lg hover:shadow-md shadow-sky-600/20  border-fuchsia-700/20"
    >
      <div className="h-36 px-4 py-2 font-medium bg-white text-stone-900 rounded-lg">
        <div className="flex justify-between text-stone-500 text-sm">
          <div>{dao.symbol}</div>
          <div>Network : {dao.network}</div>
        </div>
        <div className="text-lg">{dao.name}</div>
      </div>
    </div>
  );
};

export default DaoCard;
