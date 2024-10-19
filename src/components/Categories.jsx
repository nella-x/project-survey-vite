import PropTypes from "prop-types";

export const Categories = ({ updateFormData, value }) => {
  const handleRadioChange = (event) => {
    updateFormData(event.target.value);  // Correctly updating formData.categories
  };

  return (
    <div className="border-box">
      <label>Choose an option:</label>
      {["Career", "Love life", "Personal life"].map((option) => (
        <label key={option} className="custom-radio">
          <li><input
            type="radio"
            value={option}
            checked={value === option}
            onChange={handleRadioChange}
          />
            {option}
          </li>
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
