import PropTypes from "prop-types";

export const Categories = ({ updateFormData, value }) => {
  const handleRadioChange = (event) => {
    updateFormData("categories", event.target.value);  
  };

  return (
    <div className="border-box">
      <label>Choose an option:</label>
      {["Career", "Love life", "Personal life"].map((option) => (
        <label key={option}>
          <input
            type="radio"
            value={option}
            checked={value === option}  
            onChange={handleRadioChange}  
          />
          {option}
        </label>
      ))}
    </div>
  );
};

// PropTypes validation
Categories.propTypes = {
  updateFormData: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

