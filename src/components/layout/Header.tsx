import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Avatar, Address } from '../../components/elements';
import { ConnectWallet } from '../wallet';

const navigation = [
  {
    title: 'directory',
    path: '/directory'
  },
  {
    title: 'calendar',
    path: '/calendar'
  },
  {
    title: 'profile',
    path: '/profile'
  }
];

export type HeaderProps = {
  currentUser: string | null;
  firebaseLoading: boolean;
};

const Header = ({ currentUser, firebaseLoading }: HeaderProps) => {
  return (
    <div className="flex justify-between mx-4">
      {/* <div>header</div> */}
      <div className="flex">
        {navigation.map((item, index) => (
          <Link to={item.path} key={index} className="p-2 m-2 border border-rounded">
            {item.title}
          </Link>
        ))}
      </div>
      <div>
        <Button>
          <ConnectWallet currentUser={currentUser} firebaseLoading={firebaseLoading} />
        </Button>
      </div>
    </div>
  );
};

export default Header;
