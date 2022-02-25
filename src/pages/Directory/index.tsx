import React, { useEffect, useState } from 'react';
import { DaoCard } from '../../components/cards';
import { CreateDao } from '../../components/directory';
import { checkUserTokens } from '../../utils/directory/index';
import { useAuth } from '../../App';

import { getFirestore, collection, onSnapshot, query } from 'firebase/firestore';
const db = getFirestore();

export type DirectoryPageProps = {};

export default function DirectoryPage({}: DirectoryPageProps) {
  const [loading, setLoading] = useState(true);
  const [gatedDaos, setGatedDaos] = useState([]);
  const auth = useAuth();

  useEffect(() => {
    console.log('DirectoryPage');

    const fetchData = async () => {
      const checkTokens: any = await checkUserTokens();
      console.log(checkTokens);
      // setGatedTokens(gatedTokens);
      setLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (auth.firebaseUser) {
      const q = query(collection(db, 'users', auth.firebaseUser, 'daos'));
      const unsub = onSnapshot(q, (querySnapshot) => {
        const daos: any = [];
        querySnapshot.forEach((doc) => {
          // console.log(doc.data());
          daos.push(doc.data());
        });
        setGatedDaos(daos);
      });
      return unsub;
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mx-4">
      <div className="my-6 text-center text-3xl">Calendars for Current Wallet</div>
      <div>
        {gatedDaos.map((dao, index) => (
          <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 my-6">
            <DaoCard dao={dao} />
          </div>
        ))}
      </div>
      <CreateDao />
    </div>
  );
}
