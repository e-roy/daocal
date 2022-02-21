import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Address } from '../../components/elements';
import { ConnectWallet } from '../wallet';
import { getAuth, signOut } from 'firebase/auth';
import { useAccount } from 'wagmi';
import { ChevronDownIcon } from '@heroicons/react/outline';

import { Menu, Transition } from '@headlessui/react';

const navigation = [
  {
    title: 'directory',
    path: '/directory'
  }
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export type HeaderProps = {
  currentUser: string | null;
  firebaseLoading: boolean;
};

const Header = ({ currentUser, firebaseLoading }: HeaderProps) => {
  // console.log(currentUser);
  // console.log(firebaseLoading);
  const [{}, disconnect] = useAccount();

  const handleLogout = () => {
    signOut(getAuth());
    disconnect();
  };

  if (firebaseLoading)
    return (
      <div className="flex justify-between mx-4 my-2">
        <div className="flex"></div>
        <div className="text-white text-lg font-semibold mt-2 mr-8">loading...</div>
      </div>
    );

  if (currentUser)
    return (
      <div className="flex justify-between mx-4 my-2">
        <div className="flex"></div>
        <div>
          <Menu as="div" className="ml-3 relative">
            <div>
              <Menu.Button className="rounded-xl bg-gradient-to-r from-fuchsia-700 hover:from-fuchsia-600 to-sky-600 hover:to-sky-400 shadow-lg hover:shadow-md shadow-sky-600/20  border-fuchsia-700/20">
                <div className="flex px-4 py-2 font-medium bg-stone-700 hover:bg-zinc-700 text-stone-100 hover:text-white m-[3px] rounded-lg">
                  <Avatar address={currentUser} size={3} className="mx-2" />
                  <Address address={currentUser} shortend />
                  <ChevronDownIcon className="h-5 w-5 mt-0.5 ml-2" aria-hidden="true" />
                </div>
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="z-20 origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-stone-600 text-stone-100 font-semibold uppercase ring-2 border-purple-800 ring-opacity-5 focus:outline-none">
                {navigation.map((item) => (
                  <Menu.Item key={item.title}>
                    {({ active }) => (
                      <Link
                        to={item.path}
                        className={classNames(
                          active ? 'bg-stone-500 border-stone-700' : '',
                          'block mx-1 px-2 py-2 text-sm rounded-lg border border-stone-600'
                        )}
                      >
                        {item.title}
                      </Link>
                    )}
                  </Menu.Item>
                ))}
                <Menu.Item>
                  {({ active }) => (
                    <div
                      onClick={() => handleLogout()}
                      className={classNames(
                        active ? 'bg-stone-500 border-stone-700' : '',
                        'block mx-1 px-2 py-2 text-sm rounded-lg border border-stone-600 cursor-pointer'
                      )}
                    >
                      Logout
                    </div>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    );

  return (
    <div className="flex justify-between mx-4 my-2">
      <div className="flex"></div>
      <div>
        <ConnectWallet />
      </div>
    </div>
  );
};

export default Header;
