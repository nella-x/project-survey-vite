import PropTypes from "prop-types";

export const Name = ({ onChange, value }) => {
  const handleNameChange = (e) => {
    onChange(e);
  };

  return (
    <div className="border-box">
      <label>Name:</label>
      <input type="text" value={value} onChange={handleNameChange} />
    </div>
  );
};

// PropTypes validation
Name.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired, // Lägg till prop för onSubmit
};
