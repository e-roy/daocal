import React from 'react';
import './DateSelect.css';
import opacity from 'react-element-popper/animations/opacity';

import DatePicker, { DateObject } from 'react-multi-date-picker';
import type { Value } from 'react-multi-date-picker';

export type DateSelectProps = {
  onChange?: (value: Value) => void;
  value?: Value;
};

const DateSelect = ({ onChange, value }: DateSelectProps) => {
  const format = 'MM/DD/YYYY';

  return (
    <DatePicker
      className="custom-input custom-calendar"
      value={value}
      onChange={onChange}
      format={format}
      style={{
        color: '#44403c',
        height: '35px'
      }}
      animations={[opacity({ from: 0.5, to: 1, duration: 400 })]}
    />
  );
};

export default DateSelect;
