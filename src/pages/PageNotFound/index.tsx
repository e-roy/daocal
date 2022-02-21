import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/elements';

export default function PageNotFound() {
  const navigate = useNavigate();
  return (
    <div className="">
      <div className="min-w-screen flex items-center p-6 sm:p-12 lg:p-20 overflow-hidden">
        <div className="min-w-full relative text-center md:text-left rounded-xl p-[3px] bg-gradient-to-r from-fuchsia-700 to-sky-600 shadow-md border-fuchsia-700/20">
          <div className="flex-1 md:flex items-center p-8 lg:p-10 bg-stone-700/95 rounded-lg">
            <div className="w-full md:w-1/2">
              <div className="mb-10 md:mb-20 text-stone-100 font-light">
                <h1 className="font-black uppercase text-3xl lg:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-700 to-sky-600 mb-10">
                  You seem to be lost!
                </h1>
                <p className="font-semibold text-xl">The page you're looking for isn't here.</p>
              </div>
              <div className="mb-20 md:mb-0">
                <Button onClick={() => navigate('/')}>Go To Home Page</Button>
              </div>
            </div>
            <div className="w-full md:w-1/2 text-center">
              <img src="https://i.ibb.co/ck1SGFJ/Group.png" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
