import { useState } from "react";
import { Name } from "./Name";
import { DayDropdown, MonthDropdown } from './Birthday';

const FORM_DATA = {
  name: '',
  birthday: {
    day: null, // Ändra från tom sträng till null
    month: null, // Ändra från tom sträng till null
  },
};

export const MultiStepForm = () => {
  const [formData, setFormData] = useState(FORM_DATA);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1); // Ny state för att hålla koll på vilket steg vi är på

  const handleNameChange = (event) => {
    setFormData({
      ...formData,
      name: event.target.value,
    });
  };

  const handleSubmit = () => {
    if (currentStep === 1) {
      setCurrentStep(2); // Gå till nästa steg
    }
  };

  const handleBirthdayChange = (selectedDay, selectedMonth) => {
    setFormData((prevData) => ({
      ...prevData,
      birthday: {
        day: selectedDay !== undefined ? Number(selectedDay) : prevData.birthday.day, // Hantera dag som nummer
        month: selectedMonth !== undefined ? Number(selectedMonth) : prevData.birthday.month, // Hantera månad som nummer
      },
    }));
  };

  const handleMonthChange = (selectedMonth) => {
    handleBirthdayChange(undefined, selectedMonth);
  };

  const submitForm = () => {
    console.log('Form data:', formData);
    setFormSubmitted(true);
    alert(`Thank you, ${formData.name}!`);
  };

  const startOver = () => {
    setFormData(FORM_DATA);
    setFormSubmitted(false);
    setCurrentStep(1); // Återställ steget
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
              <Name
                value={formData.name}
                onChange={handleNameChange}
                onSubmit={handleSubmit} // Skicka ner submit-funktionen
              />
            </>
          )}

          {currentStep === 2 && (
            <>
              <h2>Step 2: Select Your Birthday</h2>
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
