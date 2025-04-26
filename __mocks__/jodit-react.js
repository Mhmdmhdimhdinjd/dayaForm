import React from 'react';

const JoditEditor = ({ value, onChange, config, ...props }) => (
  <textarea
    value={value || ''}
    onChange={(e) => onChange(e.target.value)}
    readOnly={config.readonly}
    {...props}
  />
);

export default JoditEditor;