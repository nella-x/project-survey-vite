import PropTypes from "prop-types";

export const Categories = ({ updateFormData, value }) => {
  const handleRadioChange = (event) => {
    updateFormData(event.target.value);  // Correctly updating formData.categories
  };

  return (
    <div className="border-box">
      <label>Choose an option:</label>
      {["Career", "Love life", "Personal life"].map((option) => (
        <label key={option}>
          <input
            type="radio"
            value={option}
            checked={value === option} // Ensure the checked value is bound to the current form state
            onChange={handleRadioChange} // Handle the change to update the form state
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
