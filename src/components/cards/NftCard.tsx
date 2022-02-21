import React from 'react';

export type NftCardProps = {
  token: any;
};

const NftCard = ({ token }: NftCardProps) => {
  //   console.log(token);
  return (
    <div className="rounded-xl p-[3px] bg-gradient-to-r from-fuchsia-700 hover:from-fuchsia-600 to-sky-600 hover:to-sky-400 shadow-lg hover:shadow-md shadow-sky-600/20  border-fuchsia-700/20">
      <img src={token.image} alt="token" className="w-full h-full border-b-2 border-stone-500 rounded-t-lg" />
      <div className="h-60 px-4 py-2 font-medium bg-white text-stone-900 rounded-b-lg">
        <div className="flex justify-between text-stone-500 text-sm">
          <div></div>
          <div>Token : {token.tokenId}</div>
        </div>
        <div className="text-lg">{token.name}</div>
        <div className="text-sm text-stone-500">{token.description}</div>
      </div>
    </div>
  );
};

export default NftCard;
