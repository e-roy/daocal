import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { DotsVerticalIcon } from '@heroicons/react/outline';
import classNames from '../../lib/classNames';

const meetings = [
  {
    id: 1,
    name: 'Leslie Alexander',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    start: '1:00 PM',
    startDatetime: '2022-01-21T13:00',
    end: '2:30 PM',
    endDatetime: '2022-01-21T14:30'
  },
  {
    id: 1,
    name: 'Leslie Alexander',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    start: '1:00 PM',
    startDatetime: '2022-01-21T13:00',
    end: '2:30 PM',
    endDatetime: '2022-01-21T14:30'
  }
  // More meetings...
];

const CalendarList = () => {
  return (
    <section className="mt-12 md:mt-0">
      <ol className="mt-4 space-y-1 text-sm leading-6  cursor-pointer">
        {meetings.map((meeting, index) => (
          <li
            key={index}
            className="group flex items-center space-x-4 rounded-xl py-2 px-4 text-stone-300/50 hover:text-stone-100 border border-stone-800/50 shadow-lg hover:border-stone-900/50 hover:shadow-xl "
          >
            <img src={meeting.imageUrl} alt="" className="h-10 w-10 flex-none rounded-full" />
            <div className="flex-auto">
              <p className="">{meeting.name}</p>
              <p className="mt-0.5">
                <time dateTime={meeting.startDatetime}>{meeting.start}</time> -{' '}
                <time dateTime={meeting.endDatetime}>{meeting.end}</time>
              </p>
            </div>
            <Menu as="div" className="relative opacity-60 focus-within:opacity-100 group-hover:opacity-100">
              <div>
                <Menu.Button className="-m-2 flex items-center rounded-full p-1.5 text-stone-200 hover:text-gray-100">
                  <span className="sr-only">Open options</span>
                  <DotsVerticalIcon className="h-6 w-6" aria-hidden="true" />
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="focus:outline-none absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-stone-700 text-stone-200 shadow-lg  border border-stone-800/50 ring-opacity-5">
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active ? 'm-1 rounded-lg text-stone-100 hover:bg-stone-600' : 'm-1 text-stone-300',
                            'block px-4 py-2 text-sm'
                          )}
                        >
                          Edit
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active ? 'm-1 rounded-lg text-stone-100 hover:bg-stone-600' : 'm-1 text-stone-300',
                            'block px-4 py-2 text-sm'
                          )}
                        >
                          Cancel
                        </a>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </li>
        ))}
      </ol>
    </section>
  );
};

export default CalendarList;
