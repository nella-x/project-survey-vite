import PropTypes from "prop-types";

export const Name = ({ onChange, value, onSubmit }) => {
  const handleNameChange = (e) => {
    onChange(e);
  };

  const handleSubmit = () => {
    onSubmit(); // Anropa submit-funktionen
  };

  return (
    <div className="border-box">
      <label>Name:</label>
      <input type="text" value={value} onChange={handleNameChange} />
      <button onClick={handleSubmit}>Submit</button> {/* Submit-knapp */}
    </div>
  );
};

// PropTypes validation
Name.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired, // Lägg till prop för onSubmit
};
