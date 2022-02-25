import React, { useState, useEffect } from 'react';
import { Button, TextField } from '../../components/elements';
import { DateSelect, TimeSelect } from './';

import firebaseApp from '../../service/firebase';
import { getFirestore, doc, onSnapshot, setDoc, addDoc, collection } from 'firebase/firestore';
const db = getFirestore(firebaseApp);

export type CreateEventProps = {
  daoAddress?: string;
};

const CreateEvent = ({ daoAddress }: CreateEventProps) => {
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    date: new Date(),
    room: '',
    startTime: new Date(),
    endTime: new Date()
  });

  const [decoupledDate, setDecoupledDate] = useState(new Date());
  const [decoupledStartTime, setDecoupledStartTime] = useState(new Date());
  const [decoupledEndTime, setDecoupledEndTime] = useState(new Date());

  useEffect(() => {
    const newDate = new Date(
      decoupledDate.getFullYear(),
      decoupledDate.getMonth(),
      decoupledDate.getDate(),
      decoupledStartTime.getHours(),
      decoupledStartTime.getMinutes(),
      decoupledStartTime.getSeconds()
    );

    const start = new Date(
      decoupledDate.getFullYear(),
      decoupledDate.getMonth(),
      decoupledDate.getDate(),
      decoupledStartTime.getHours(),
      decoupledStartTime.getMinutes()
    );
    const end = new Date(
      decoupledDate.getFullYear(),
      decoupledDate.getMonth(),
      decoupledDate.getDate(),
      decoupledEndTime.getHours(),
      decoupledEndTime.getMinutes()
    );

    setEventData({
      ...eventData,
      date: newDate,
      startTime: start,
      endTime: end
    });
  }, [decoupledDate, decoupledStartTime, decoupledEndTime]);

  const handleCreateEvent = async (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { title, description, date, room, startTime, endTime } = eventData;
    if (title && description && room) {
      console.log('create event');
      console.log(eventData);
      try {
        const docRef = await addDoc(collection(db, 'daos', daoAddress, 'events'), eventData);

        console.log('Document written with ID: ', docRef.id);
      } catch (e) {
        console.error('Error adding document: ', e);
      }
    }
  };
  return (
    // <div className="border-stone-800/50 bg-stone-700 text-stone-100 rounded border shadow-lg p-4">
    <div>
      <form onSubmit={handleCreateEvent}>
        <div className="my-2">
          <div>Title</div>
          <TextField
            required
            placeholder="title"
            onChange={(e) => setEventData({ ...eventData, title: e.target.value })}
          />
        </div>
        <div className="my-2">
          <div>Description</div>
          <TextField
            required
            placeholder="description"
            onChange={(e) => setEventData({ ...eventData, description: e.target.value })}
          />
        </div>

        <div className="my-2 grid grid-cols-2">
          <div>
            <div>Date</div>
            <DateSelect
              value={eventData.date}
              onChange={(val) => {
                setDecoupledDate(new Date(val?.valueOf()));
              }}
            />
          </div>
          <div></div>
          <div>
            <div>Start Time</div>
            <TimeSelect
              value={eventData.startTime}
              onChange={(val) => {
                setDecoupledStartTime(new Date(val?.valueOf()));
              }}
            />
          </div>
          <div>
            <div>End Time</div>
            <TimeSelect
              value={eventData.endTime}
              onChange={(val) => {
                setDecoupledEndTime(new Date(val?.valueOf()));
              }}
            />
          </div>
        </div>
        <div className="my-2">
          <div>Room</div>
          <TextField placeholder="room" onChange={(e) => setEventData({ ...eventData, room: e.target.value })} />
        </div>

        <div className="my-2">
          <Button type="submit">Create</Button>
        </div>
      </form>
    </div>
  );
};

export default CreateEvent;
