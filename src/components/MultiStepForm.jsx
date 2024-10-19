import { useState } from "react";
import { Name } from "./Name";
import { DayDropdown, MonthDropdown } from './Birthday';

const FORM_DATA = {
  name: '',
  birthday: {
    day: null,
    month: null,
  },
};

export const MultiStepForm = () => {
  const [formData, setFormData] = useState(FORM_DATA);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [error, setError] = useState(''); // State to handle error messages

  const handleNameChange = (event) => {
    setFormData({
      ...formData,
      name: event.target.value,
    });
  };

  const handleSubmit = () => {
    if (formData.name === '') {
      setError('Please enter your name.');
      return;
    }
    setError(''); // Clear error if validation passes
    setCurrentStep(2); // Proceed to next step if name is filled in
  };

  const handleBirthdayChange = (selectedDay, selectedMonth) => {
    setFormData((prevData) => ({
      ...prevData,
      birthday: {
        day: selectedDay !== undefined ? Number(selectedDay) : prevData.birthday.day,
        month: selectedMonth !== undefined ? Number(selectedMonth) : prevData.birthday.month,
      },
    }));
  };

  const handleMonthChange = (selectedMonth) => {
    handleBirthdayChange(undefined, selectedMonth);
  };

  const submitForm = () => {
    if (!formData.birthday.day || !formData.birthday.month) {
      setError('Please select both day and month for your birthday.');
      return;
    }
    setError(''); // Clear error if validation passes
    console.log('Form data:', formData);
    setFormSubmitted(true);
    alert(`Thank you, ${formData.name}!`);
  };

  const startOver = () => {
    setFormData(FORM_DATA);
    setFormSubmitted(false);
    setCurrentStep(1);
    setError(''); // Clear error when starting over
  };

  return (
    <div className="multi-step-form">
      {formSubmitted ? (
        <h2>Thanks for submitting!</h2>
      ) : (
        <>
          {currentStep === 1 && (
            <>
              <h2>Step 1: Enter Your Name</h2>
              {error && <p className="error">{error}</p>}
              <Name
                value={formData.name}
                onChange={handleNameChange}
                onSubmit={handleSubmit}
              />
            </>
          )}

          {currentStep === 2 && (
            <>
              <h2>Step 2: Select Your Birthday</h2>
              {error && <p className="error">{error}</p>}
              <DayDropdown
                selectedMonth={Number(formData.birthday.month)}
                onChange={handleBirthdayChange}
                selectedDay={formData.birthday.day}
              />
              <MonthDropdown
                onChange={handleMonthChange}
                selectedMonth={formData.birthday.month}
              />
            </>
          )}
        </>
      )}

      {!formSubmitted && (
        <div className="form-actions">
          {currentStep === 2 && (
            <button onClick={submitForm}>Submit</button>
          )}
          <button onClick={startOver} disabled={formData.name === ''}>
            Start Over
          </button>
        </div>
      )}
    </div>
  );
};

export default MultiStepForm;
