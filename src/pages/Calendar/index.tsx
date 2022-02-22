import React, { useState, useEffect } from 'react';
import { Button } from '../../components/elements';
import { useParams, useNavigate } from 'react-router-dom';
import { MonthSmall, CalendarList } from '../../components/calendar';
import dayjs, { Dayjs } from 'dayjs';
// import { timeZone } from '../../lib/clock';

export default function CalendarPage() {
  const params = useParams();
  const navigate = useNavigate();
  const contract = params.id;

  // const [daySelected, setDaySelected] = useState<Dayjs | null>(null);
  const [daySelectedDisplay, setDaySelectedDisplay] = useState<string>(dayjs().format('MMM DD YYYY'));

  const changeDate = (date: Dayjs) => {
    // console.log(date.format('YYYY-MM-DDZZ'));
    // setDaySelected(date.format('YYYY-MM-DDZZ'));
    setDaySelectedDisplay(date.format('MMM DD YYYY'));
  };

  return (
    <div className="m-4">
      <div className="flex justify-between">
        <div>{/* {contract} */}</div>

        <div>
          <Button onClick={() => navigate(`/profile/${contract}`)}>Profile</Button>
        </div>
      </div>

      <div className="flex mt-8">
        <div className="w-1/2 px-4 mr-2 rounded border border-stone-800/50 shadow-lg ">
          <div className="text-center font-semibold text-lg">{daySelectedDisplay}</div>

          <CalendarList />
        </div>
        <div className="w-1/2 px-4 ml-2 rounded border border-stone-800/50 shadow-lg ">
          <MonthSmall onDatePicked={changeDate} weekStart={'Monday'} />
        </div>
      </div>
      <div>
        <div className="rounded-lg mt-4 border border-stone-800/50 shadow-lg h-64"></div>
      </div>
    </div>
  );
}
