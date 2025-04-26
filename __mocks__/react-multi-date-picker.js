import React from 'react';

const MockDatePicker = ({ onChange, value,inputId, ...props }) => (
  <input
    {...props}
    value={value || ''}
    onChange={(e) => onChange(e.target.value)}
    id={inputId}
  />
);

export default MockDatePicker;

export const persian = {};
export const persian_fa = {};