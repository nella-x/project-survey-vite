import { useState } from "react";
import { Name } from "./Name";
import { DayDropdown, MonthDropdown } from './Birthday';
import { Categories } from "./Categories";
import Predictions from "./Predictions";  // Import the predictions file

const FORM_DATA = {
  name: '',
  birthday: {
    day: null,
    month: null,
  },
  categories: '', // Adding categories to the form data
};

// Function to determine zodiac sign based on birthday
const getZodiacSign = (day, month) => {
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "Aries";
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "Taurus";
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return "Gemini";
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return "Cancer";
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "Leo";
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "Virgo";
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return "Libra";
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return "Scorpio";
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return "Sagittarius";
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return "Capricorn";
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return "Aquarius";
  if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return "Pisces";
  return null;
};

// Function to get predictions based on zodiac sign and category
const getPrediction = (zodiacSign, category) => {
  let signGroup = null;

  for (const group in Predictions) {
    if (Predictions[group].signs.includes(zodiacSign)) {
      signGroup = Predictions[group];
      break;
    }
  }

  if (signGroup) {
    switch (category) {
      case "Career":
        return signGroup.Career;
      case "Love life":
        return signGroup.Love;
      case "Personal life":
        return signGroup.Personal;
      default:
        return "No prediction available.";
    }
  }

  return "No prediction available.";
};

export const MultiStepForm = () => {
  const [formData, setFormData] = useState(FORM_DATA);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [error, setError] = useState(''); // State to handle error messages
  const [prediction, setPrediction] = useState('');  // To store the prediction

  const handleNameChange = (event) => {
    setFormData({
      ...formData,
      name: event.target.value,
    });
  };

  const handleCategoryChange = (category) => {
    setFormData({
      ...formData,
      categories: category,
    });
  };

  const handleSubmitName = () => {
    if (formData.name === '') {
      setError('Please enter your name.');
      return;
    }
    setError(''); // Clear error if validation passes
    setCurrentStep(2); // Proceed to birthday step if name is filled in
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

  const handleSubmitBirthday = () => {
    if (!formData.birthday.day || !formData.birthday.month) {
      setError('Please select both day and month for your birthday.');
      return;
    }
    setError(''); // Clear error if validation passes
    setCurrentStep(3); // Proceed to category step
  };

  const submitForm = () => {
    if (formData.categories === '') {
      setError('Please select a category.');
      return;
    }

    // Get the zodiac sign based on birthday
    const zodiacSign = getZodiacSign(formData.birthday.day, formData.birthday.month);

    if (!zodiacSign) {
      setError('Invalid birthdate. Please try again.');
      return;
    }

    // Get the prediction based on zodiac sign and category
    const userPrediction = getPrediction(zodiacSign, formData.categories);

    setError(''); // Clear error if validation passes
    setFormSubmitted(true);
    setPrediction(userPrediction); // Store the prediction to display
  };

  const startOver = () => {
    setFormData(FORM_DATA);
    setFormSubmitted(false);
    setCurrentStep(1);
    setError(''); // Clear error when starting over
    setPrediction('');  // Clear prediction when starting over
  };

  // Go Back functionality
  const goBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="multi-step-form">
      {formSubmitted ? (
        <>
          <h2>2025 Horoscope</h2>
          <p>{`Dear: ${formData.name}`}</p>
          <p>{`You are a ${getZodiacSign(formData.birthday.day, formData.birthday.month)}, and here is your 2025 prediction for ${formData.categories}:`}</p>
          <div>{prediction}</div>  {/* Display the prediction as JSX */}
        </>
      ) : (
        <>
          {currentStep === 1 && (
            <>
              <h2>Step 1: Enter Your Name</h2>
              {error && <p className="error">{error}</p>}
              <Name
                value={formData.name}
                onChange={handleNameChange}
              />
              <button onClick={handleSubmitName}>Submit</button>
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
              <button onClick={handleSubmitBirthday}>Submit</button>
              <button onClick={goBack}>Go Back</button> {/* Go Back Button */}
            </>
          )}

          {currentStep === 3 && (
            <>
              <h2>Step 3: Select Your Category</h2>
              {error && <p className="error">{error}</p>}
              <Categories
                value={formData.categories}
                updateFormData={handleCategoryChange}
              />
              <button onClick={submitForm}>Submit</button>
              <button onClick={goBack}>Go Back</button> {/* Go Back Button */}
            </>
          )}
        </>
      )}

      {!formSubmitted && (
        <div className="form-actions">
          <button onClick={startOver} disabled={formData.name === ''}>
            Start Over
          </button>
        </div>
      )}
    </div>
  );
};

export default MultiStepForm;
