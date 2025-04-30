const Label = ({ labelText, htmlFor }) => {
  return (
    <label
      htmlFor={htmlFor}
      style={{
        fontFamily: "gandom",
        margin: "-.5rem 1rem .5rem 0",
        fontSize: "0.75rem",
        fontWeight: 400,
      }}
    >
      {labelText}
    </label>
  );
};

export default Label;
