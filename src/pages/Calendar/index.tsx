import React, { useState, useEffect } from 'react';
import { Button } from '../../components/elements';
import { useParams, useNavigate } from 'react-router-dom';
import { MonthSmall, CalendarList, CreateEvent, EventDisplay } from '../../components/calendar';
import { useAuth } from '../../App';
import dayjs, { Dayjs } from 'dayjs';
// import { timeZone } from '../../lib/clock';
import { DateObject } from 'react-multi-date-picker';
import { EventDisplayProps } from '../../components/calendar/EventDisplay';

import { getFirestore, doc, onSnapshot, collection, query, where, orderBy } from 'firebase/firestore';
const db = getFirestore();

export default function CalendarPage() {
  const params = useParams();
  const navigate = useNavigate();
  const contract = params.id;
  const auth = useAuth();

  // const [daySelected, setDaySelected] = useState<Dayjs | null>(null);
  const [daySelectedDisplay, setDaySelectedDisplay] = useState<string>(dayjs().format('MMM DD YYYY'));

  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedEvent, setSelectedEvent] = useState<EventDisplayProps>({
    title: '',
    description: '',
    date: new Date(),
    room: '',
    startTime: new Date(),
    endTime: new Date()
  });

  const changeDate = (date: Dayjs) => {
    // console.log(date.format('YYYY-MM-DDZZ'));
    // setDaySelected(date.format('YYYY-MM-DDZZ'));
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
        const events = [];
        querySnapshot.forEach((doc) => {
          // console.log(doc.data().date.toDate());
          events.push(doc.data());
        });
        // console.log(events);
        setEvents(events);
        setLoading(false);
      });

      return unsub;
    }
  }, [daySelectedDisplay]);
  const handleSected = (val: any) => {
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
      <div>
        {/* <Button>Create Event</Button> */}
        <div className="sm:w-1/2 px-4 mr-2 rounded border border-stone-800/50 shadow-lg ">
          <CreateEvent daoAddress={contract} />
        </div>
      </div>
      <div className="sm:flex mt-8">
        <div className="sm:w-1/2 px-4 mr-2 rounded border border-stone-800/50 shadow-lg ">
          <div className="text-center font-semibold text-lg">{daySelectedDisplay}</div>

          <CalendarList events={events} loading={loading} onSelect={handleSected} />
        </div>
        <div className="sm:w-1/2 px-4 ml-2 rounded border border-stone-800/50 shadow-lg ">
          <MonthSmall onDatePicked={changeDate} weekStart={'Monday'} />
        </div>
      </div>
      <div>
        <div className="rounded-lg mt-4 border border-stone-800/50 shadow-lg h-64">
          <EventDisplay event={selectedEvent} loading={false} />
        </div>
      </div>
    </div>
  );
}
