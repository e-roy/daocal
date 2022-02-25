import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { DotsVerticalIcon } from '@heroicons/react/outline';
import classNames from '../../lib/classNames';
import dayjs, { Dayjs } from 'dayjs';

export interface CalendarListProps {
  events: any[];
  loading: boolean;
  onSelect?: (event: any) => void;
  onCreate?: (event: any) => void;
  onDelete?: (event: any) => void;
}

const CalendarList = ({ events, loading, onSelect }: CalendarListProps) => {
  const convertDate = (date: {}) => {
    return dayjs(date.toDate()).format('MMM DD YYYY');
  };

  const convertHour = (date: {}) => {
    return dayjs(date.toDate()).format('h:mm a');
  };

  const handleSelect = (event: any) => {
    console.log(event);
  };

  return (
    <section className="mt-12 md:mt-0">
      <ol className="mt-4 space-y-1 text-sm leading-6  cursor-pointer">
        {loading ? (
          <li className="text-center text-white">Loading...</li>
        ) : (
          <>
            {events.map((meeting, index) => (
              <li
                key={index}
                className="group flex items-center space-x-4 rounded-xl py-2 px-4 text-stone-300/50 hover:text-stone-100 border border-stone-800/50 shadow-lg hover:border-stone-900/50 hover:shadow-xl "
                onClick={() => {
                  handleSelect(meeting);
                  onSelect && onSelect(meeting);
                }}
              >
                <img src={meeting.imageUrl} alt="" className="h-10 w-10 flex-none rounded-full" />
                <div className="flex-auto">
                  <div className="flex">
                    <p className="">{meeting.title}</p>
                    <p className="pl-6">{convertDate(meeting.date)}</p>
                  </div>
                  <p className="mt-0.5">
                    {convertHour(meeting.startTime)} - {convertHour(meeting.endTime)}
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
          </>
        )}
      </ol>
    </section>
  );
};

export default CalendarList;
