import React from "react";

const MockSelect = ({
  options = [],
  placeholder,
  onChange,
  value,
  inputId,
  isDisabled,
  ...props
}) => {
  return (
    <form>
      <label htmlFor={inputId}>
        {inputId === "province" ? "استان" : "شهر"}
      <select
        id={inputId}
        value={value?.value || ""}
        onChange={(e) => {
          const selectedOption = options.find(
            (opt) => opt.value === e.target.value
          );
          onChange(selectedOption);
        }}
        disabled={isDisabled}
        {...props}
      >
        <option value="">{placeholder}</option>
        {(Array.isArray(options) ? options : []).map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      </label>

    </form>
  );
};

export default MockSelect;
