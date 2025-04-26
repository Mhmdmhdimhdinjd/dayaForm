import React from 'react';

const MockDatePicker = ({ onChange, value, inputId, ...props }) => {
  const validProps = { ...props };
  delete validProps.calendarPosition; // حذف پراپ غیرمعتبر
  return (
    <input
      id={inputId} // استفاده از inputId به جای id
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      {...validProps}
    />
  );
};

export default MockDatePicker;
export const persian = {};
export const persian_fa = {};