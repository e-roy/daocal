import React, { Fragment } from 'react';
import classNames from '../../lib/classNames';
import dayjs, { Dayjs } from 'dayjs';

export type EventDisplayProps = {
  event: IEventItem;
  loading: boolean;
  //   onSelect?: (event: any) => void;
  //   onCreate?: (event: any) => void;
  //   onDelete?: (event: any) => void;
};

export interface IEventItem {
  title?: string;
  description?: string;
  date: Date;
  room: string;
  startTime: Date;
  endTime: Date;
}

const EventDisplay = ({ event, loading }: EventDisplayProps) => {
  const { title, description, date, room, startTime, endTime } = event;
  // console.log(event);
  return (
    <div className="p-4">
      <div>{title}</div>
      <div>{description}</div>
      {/* <div>{event.date.format('MMMM Do YYYY')}</div> */}
    </div>
  );
};

export default EventDisplay;
