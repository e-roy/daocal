import React, { useMemo, useState, useEffect } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import classNames from '../../lib/classNames';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import { timeZone } from '../../lib/clock';

dayjs.extend(timezone);

export type MonthSmallProps = {
  weekStart: string;
  onDatePicked: (pickedDate: Dayjs) => void;
  date: Dayjs | null;
};

const MonthSmall = ({ weekStart, onDatePicked, date }: MonthSmallProps) => {
  const currentDate = dayjs();
  const [browsingDate, setBrowsingDate] = useState<Dayjs | null>(date);
  const [datePicked, setDatePicked] = useState<Dayjs | null>(null);

  useEffect(() => {
    // console.log(date);
    if (!browsingDate || (date && browsingDate.utcOffset() !== date?.utcOffset())) {
      setBrowsingDate(date || dayjs().tz(timeZone()));
    }
  }, [date, browsingDate]);

  const days = useMemo(() => {
    // console.log(browsingDate);
    // console.log(currentDate);
    if (!browsingDate) {
      return [];
    }
    // Create placeholder elements for empty days in first week
    let weekdayOfFirst = browsingDate.date(1).day();
    if (weekStart === 'Monday') {
      weekdayOfFirst -= 1;
      if (weekdayOfFirst < 0) weekdayOfFirst = 6;
    }

    const days = Array(weekdayOfFirst).fill(null);

    const isDisabled = (day: number) => {
      const date = browsingDate.startOf('day').date(day);
      return date.isBefore(browsingDate.startOf('day'));
    };

    const isCurrentDate = (day: number) => {
      const date = browsingDate.startOf('day').date(day);
      return date.isSame(currentDate.startOf('day'));
    };

    const isDateSelected = (day: number) => {
      const date = browsingDate.startOf('day').date(day);
      return date.isSame(datePicked?.startOf('day'));
    };

    const daysInMonth = browsingDate.daysInMonth();

    if (browsingDate.month() === currentDate.month() && browsingDate.year() === currentDate.year()) {
      for (let i = 1; i <= daysInMonth; i++) {
        days.push({ disabled: isDisabled(i), currentDate: isCurrentDate(i), dateSelected: isDateSelected(i), date: i });
      }
    } else if (
      (browsingDate.month() < currentDate.month() &&
        (browsingDate.year() === currentDate.year() || browsingDate.year() < currentDate.year())) ||
      browsingDate.year() < currentDate.year()
    ) {
      for (let i = 1; i <= daysInMonth; i++) {
        days.push({ disabled: true, dateSelected: isDateSelected(i), date: i });
      }
    } else {
      for (let i = 1; i <= daysInMonth; i++) {
        days.push({ dateSelected: isDateSelected(i), date: i });
      }
    }

    // console.log('days', days);
    return days;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [browsingDate, datePicked]);

  // Handle month changes
  const incrementMonth = () => {
    setBrowsingDate(browsingDate?.add(1, 'month'));
  };

  const decrementMonth = () => {
    setBrowsingDate(browsingDate?.subtract(1, 'month'));
  };

  return (
    <div className="">
      <div className="items-center mx-auto p-2">
        <div className="flex items-center">
          <h2 className="flex-auto font-semibold text-slate-200">
            {dayjs(browsingDate).format('MMMM')} {browsingDate?.year()}
          </h2>
          <button
            type="button"
            className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-slate-400 hover:text-slate-100"
          >
            <span className="sr-only">Previous month</span>
            <ChevronLeftIcon onClick={() => decrementMonth()} className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-slate-400 hover:text-slate-100"
          >
            <span className="sr-only">Next month</span>
            <ChevronRightIcon onClick={() => incrementMonth()} className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        <div className="mt-10 grid grid-cols-7 text-center text-xs leading-6 text-slate-200">
          <div>M</div>
          <div>T</div>
          <div>W</div>
          <div>T</div>
          <div>F</div>
          <div>S</div>
          <div>S</div>
        </div>
        <div className="mt-2 grid grid-cols-7 text-sm">
          {days.map((day, dayIdx) => (
            <div key={day === null ? `e-${dayIdx}` : `day-${day.date}`} className="relative w-full pt-2">
              {day === null ? (
                <div key={`e-${dayIdx}`} />
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setDatePicked(browsingDate.date(day.date));
                    onDatePicked(browsingDate.date(day.date));
                  }}
                  className={classNames(
                    'mx-auto flex h-8 w-8 items-center justify-center rounded-full',
                    'hover:border-sky-700 hover:border hover:text-stone-100 dark:hover:border-white',
                    day.disabled ? 'font-light text-gray-400 hover:border-sky-400' : 'font-medium',
                    day.dateSelected ? 'bg-sky-500 text-stone-100 font-bold' : '',
                    day.currentDate ? 'bg-fuchsia-600/40 text-stone-100' : '',
                    date && date.isSame(browsingDate.date(day.date), 'day')
                      ? ''
                      : !day.disabled
                      ? '  dark:bg-gray-600 dark:text-stone-100'
                      : ''
                  )}
                >
                  {day.date}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MonthSmall;
