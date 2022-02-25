import React from 'react';
import './DateSelect.css';
import opacity from 'react-element-popper/animations/opacity';

import DatePicker, { DateObject } from 'react-multi-date-picker';
import TimePicker from 'react-multi-date-picker/plugins/time_picker';
import type { Value } from 'react-multi-date-picker';

export type TimeSelectProps = {
  onChange?: (value: Value) => void;
  value?: Value;
};

const TimeSelect = ({ onChange, value }: TimeSelectProps) => {
  const format = 'hh:mm A';

  return (
    <div className="text-stone-700 w-60">
      <DatePicker
        disableDayPicker
        className="custom-input custom-calendar"
        format={format}
        value={value}
        onChange={onChange}
        style={{
          color: '#44403c',
          height: '35px'
        }}
        plugins={[<TimePicker hideSeconds />]}
        animations={[opacity({ from: 0.5, to: 1, duration: 400 })]}
      />
    </div>
  );
};

export default TimeSelect;
