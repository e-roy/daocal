import React, { useState, useEffect } from 'react';
import { Button } from '../../components/elements';
import { useParams, useNavigate } from 'react-router-dom';
import { MonthSmall, CalendarList, CreateEvent, EventDisplay } from '../../components/calendar';
import { useAuth } from '../../App';
import dayjs, { Dayjs } from 'dayjs';
import { IEventItem } from '../../components/calendar/EventDisplay';
import classNames from '../../lib/classNames';

import { getFirestore, onSnapshot, collection, query, where, DocumentData } from 'firebase/firestore';
const db = getFirestore();

export default function CalendarPage() {
  const params = useParams();
  const navigate = useNavigate();
  const contract = params.id;
  const auth = useAuth();

  const [daySelectedDisplay, setDaySelectedDisplay] = useState<string>(dayjs().format('MMM DD YYYY'));

  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedEvent, setSelectedEvent] = useState<IEventItem>({
    title: '',
    description: '',
    date: new Date(),
    room: '',
    startTime: new Date(),
    endTime: new Date()
  });

  const tabs = [
    { name: daySelectedDisplay, value: 'day' },
    { name: 'Create Event', value: 'create' }
  ];

  const [currentTab, setCurrentTab] = useState(tabs[0]);

  const changeDate = (date: Dayjs) => {
    setDaySelectedDisplay(date.format('MMM DD YYYY'));
  };

  useEffect(() => {
    if (auth.firebaseUser) {
      setLoading(true);
      setEvents([]);
      const startDay = new Date(daySelectedDisplay),
        endDay = new Date(daySelectedDisplay);
      // Set up start date
      startDay.setHours(0);
      startDay.setMinutes(0);
      startDay.setSeconds(0);
      // Set up end date
      endDay.setHours(23);
      endDay.setMinutes(59);
      endDay.setSeconds(59);

      const q = query(
        collection(db, 'daos', contract, 'events'),
        where('date', '>=', startDay),
        where('date', '<=', endDay)
      );
      const unsub = onSnapshot(q, (querySnapshot) => {
        const events: [] = [];
        querySnapshot.forEach((doc) => {
          // console.log(doc.data());
          const data = doc.data() as IEventItem;
          if (data) events.push(data);
        });
        // console.log(events);
        setEvents(events);
        setLoading(false);
      });

      return unsub;
    }
  }, [daySelectedDisplay]);
  const handleSelected = (val: any) => {
    console.log('selected');
    console.log(val);
    setSelectedEvent(val);
  };

  return (
    <div className="m-4">
      <div className="flex justify-between">
        <div>{/* {contract} */}</div>

        <div>
          <Button onClick={() => navigate(`/profile/${contract}`)}>Profile</Button>
        </div>
      </div>

      <div className="sm:flex mt-8 min-h-2/3">
        <div className="sm:w-1/2 px-4 mr-2 rounded border border-stone-800/50 shadow-lg ">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setCurrentTab(tab)}
              className={classNames(
                currentTab.value === tab.value
                  ? 'border-stone-100 text-stone-100'
                  : 'border-transparent text-stone-500 hover:text-stone-300 hover:border-stone-300',
                'whitespace-nowrap mx-4 pb-2 px-1 border-b-2 font-medium '
              )}
            >
              {tab.name}
            </button>
          ))}
          {currentTab.value === 'day' && <CalendarList events={events} loading={loading} onSelect={handleSelected} />}
          {currentTab.value === 'create' && <CreateEvent daoAddress={contract} />}
        </div>
        <div className="sm:w-1/2 px-4 ml-2 rounded border border-stone-800/50 shadow-lg ">
          <MonthSmall onDatePicked={changeDate} weekStart={'Monday'} />
        </div>
      </div>
      {currentTab.value === 'day' && (
        <div className="rounded-lg mt-4 border border-stone-800/50 shadow-lg h-64">
          <EventDisplay event={selectedEvent} loading={false} />
        </div>
      )}
    </div>
  );
}
