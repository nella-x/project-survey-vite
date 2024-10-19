import { useState } from "react";
import { Name } from "./Name";
import { DayDropdown, MonthDropdown } from './Birthday';
import { Categories } from "./Categories";
import Predictions from "./Predictions";

const FORM_DATA = {
  name: '',
  birthday: {
    day: null,
    month: null,
  },
  categories: '',
};

// Function to determine zodiac sign based on day and month
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

  return null; // Return null if the day and month are not valid
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
  const [error, setError] = useState('');
  const [prediction, setPrediction] = useState('');

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
    setError('');
    setCurrentStep(2);
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
    setError('');
    setCurrentStep(3);
  };

  const submitForm = () => {
    if (formData.categories === '') {
      setError('Please select a category.');
      return;
    }

    const zodiacSign = getZodiacSign(formData.birthday.day, formData.birthday.month);

    if (!zodiacSign) {
      setError('Invalid birthdate. Please try again.');
      return;
    }

    const userPrediction = getPrediction(zodiacSign, formData.categories);

    setError('');
    setFormSubmitted(true);
    setPrediction(userPrediction);
  };

  const startOver = () => {
    setFormData(FORM_DATA);
    setFormSubmitted(false);
    setCurrentStep(1);
    setError('');
    setPrediction('');
  };

  const goBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="multi-step-form">
      {formSubmitted ? (
        <div className="horoscope-box">
          <h1>2025 Horoscope</h1>
          <h2>{`✨ Dear ${formData.name} ✨`}</h2>
          <p>{`As a ${getZodiacSign(formData.birthday.day, formData.birthday.month)}, the stars align, and the universe unveils your 2025  ${formData.categories} destiny:`}</p>
          <div>{prediction}</div>
          <button onClick={startOver} className="button-back-to-start">
            Back to Start
          </button>
        </div>
      ) : (
        <>
          {currentStep === 1 && (
            <>
              <div className="question-box">
                <h1>Unlock Your <br /> 2025 Horoscope</h1>
                <p>
                  Curious about what the stars have in store for you in 2025?
                  It’s just three quick questions away! Will you experience exciting career opportunities, new love, or personal transformations?
                  Let's find out together!
                </p>
                <h2>Step 1: What’s Your Name?</h2>
                {error && <p className="error">{error}</p>}
              </div>
              <div className="form-box">
                <Name
                  value={formData.name}
                  onChange={handleNameChange}
                />
                <button
                  className={formData.name ? "button-active" : "button-default"}
                  onClick={handleSubmitName}
                  disabled={!formData.name}
                >
                  Submit
                </button>
                <button onClick={startOver} disabled={formData.name === ''}>
                  Start Over
                </button>
              </div>
            </>
          )}

          {currentStep === 2 && (
            <>
              <div className="question-box">
                <h2>Step 2: Select Your Birthday</h2>
                {error && <p className="error">{error}</p>}
              </div>
              <div className="form-box">
                <div className="select-box">
                  <DayDropdown
                    selectedMonth={Number(formData.birthday.month)}
                    onChange={handleBirthdayChange}
                    selectedDay={formData.birthday.day}
                  />
                  <MonthDropdown
                    onChange={handleMonthChange}
                    selectedMonth={formData.birthday.month}
                  />
                </div>
                <button onClick={handleSubmitBirthday}>Submit</button>
                <button onClick={goBack}>Go Back</button>
                <button onClick={startOver} disabled={formData.name === ''}>
                  Start Over
                </button>
              </div>
            </>
          )}

          {currentStep === 3 && (
            <>
              <div className="question-box">
                <h2>Step 3: Select Your Category</h2>
                {error && <p className="error">{error}</p>}
              </div>
              <div className="form-box">
                <Categories
                  value={formData.categories}
                  updateFormData={handleCategoryChange}
                />
                <button onClick={submitForm}>Submit</button>
                <button onClick={goBack}>Go Back</button>
                <button onClick={startOver} disabled={formData.name === ''}>
                  Start Over
                </button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default MultiStepForm;
