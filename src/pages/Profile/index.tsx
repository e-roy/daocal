import React, { useState, useEffect } from 'react';
import { Button } from '../../components/elements';
import { NftCard } from '../../components/cards';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../App';
import * as dayjs from 'dayjs';

import { getFirestore, doc, onSnapshot } from 'firebase/firestore';
const db = getFirestore();

// export interface UsersDaoInfo {
//   contract: string;
//   created: number;
//   name: string;
//   network: number;
//   symbol: string;
//   tokens: [];
// }

export default function ProfilePage() {
  const params = useParams();
  const navigate = useNavigate();
  const contract = params.id;
  const [tokens, setTokens] = useState([]);
  const [daoInfo, setDaoInfo] = useState({});
  const [date, setDate] = useState();

  const auth = useAuth();

  useEffect(() => {
    if (auth.firebaseUser) {
      const q = doc(db, 'users', auth.firebaseUser, 'daos', contract);
      const unsub = onSnapshot(q, (doc) => {
        console.log(doc.data());
        setDaoInfo(doc.data());
        setTokens(doc.data()?.tokens);
        const time = doc.data().created;
        const format = dayjs(time).format('MMM DD YYYY h mm a');
        setDate(format);
      });
      return unsub;
    }
  }, []);

  return (
    <div className="m-4">
      <div className="flex justify-between">
        <div>{/* {contract} */}</div>
        <div>
          <Button onClick={() => navigate(`/calendar/${contract}`)}>Calendar</Button>
        </div>
      </div>
      <div>
        <div className="flex">
          <h1 className="text-xl text-stone-100">{daoInfo.name}</h1>
          <span className=" text-stone-200 italic pt-1 pl-8">{daoInfo.symbol}</span>
          {date && <span className=" text-stone-200 italic pt-1 pl-8">created: {date}</span>}
        </div>
        <div>
          {tokens.map((token, index) => (
            <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 my-6">
              <NftCard token={token} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
