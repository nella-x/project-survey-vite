// import { useState } from "react";

// import { Name } from ".src/components/Name.jsx";


// // Component: MultiStepForm
// export const MultiStepForm = () => {
//   // State to store form data for each field (name, age, email, favorite band, album, artist)
//   const [formData, setFormData] = useState({
//     name: "",
//   });

//   // ---
//   // ---

//   // State to track whether the form has been submitted
//   const [formSubmitted, setFormSubmitted] = useState(false);

//   // ---
//   // ---

//   // State to track the current step (1 through 6)
//   const [currentStep, setCurrentStep] = useState(1);

//   // ---
//   // ---

//   // Function to update form data based on the provided field (key) and value
//   const updateFormData = (field, value) => {
//     // Update the specific field of formData while preserving other fields
//     setFormData((previous) => ({ ...previous, [field]: value }));
//   };
//   // 1. This function takes in two arguments: 'field' (the form field that needs to be updated) and 'value' (the new value for that field).
//   // 2. It uses the setFormData function to update the state of formData.
//   // 3. The spread operator (...previous) keeps all the existing fields in formData unchanged.
//   // 4. The specific field, passed as 'field', is updated with the new 'value' provided.
//   // 5. This ensures that only the targeted field is updated while preserving the rest of the form data.

//   // ---
//   // ---

//   // Function to move to the next step in the form, with validation at each step
//   // Function to move to the next step in the form, with validation at each step
//   const nextStep = () => {
//     if (currentStep < 6) {
//       // Validate the current step's data before proceeding
//       switch (currentStep) {
//         case 1:
//           // If the name field is not empty, go to the next step, otherwise show an alert
//           if (formData.name.trim() !== "") setCurrentStep(currentStep + 1);
//           else alert("Please enter your name");
//           break;
//         default:
//           // If none of the above, proceed to the next step automatically
//           setCurrentStep(currentStep + 1);
//       }
//     }
//   };

//   // ---
//   // ---

//   // Function to move back to the previous step in the form
//   // "If the currentStep is greater than 1, meaning we're not on the first step,
//   // go ahead and set the currentStep to one step less than what it is now.
//   // Basically, subtract 1 from currentStep, so we move back one step."
//   const prevStep = () => {
//     if (currentStep > 1) setCurrentStep(currentStep - 1);
//   };

//   // Function to submit the form, log the form data, and display it
//   const submitForm = () => {
//     console.log(formData);
//     setFormSubmitted(true); // Set form as submitted
//     // Format the form data for displaying in the alert
//     const formattedData = `
//     Name: ${formData.name}
//   `;
//     alert(formattedData); // Display the formatted data in an alert
//   };

//   // ---
//   // ---

//   // Function to reset the form data and start the process over
//   const startOver = () => {
//     // Clear the form data and reset to the first step
//     setFormData({
//       name: "",
//     });
//     setFormSubmitted(false); // Reset form submission state
//     setCurrentStep(1); // Reset to the first step
//   };

//   return (
//     <div>
//       {formSubmitted ? (
//         <h2>Thanks for Voting!</h2>
//       ) : (
//         <h2>2024 - Music Awards Voting Form</h2>
//       )}

//       {/* Render the Name component on step 1 */}
//       {currentStep === 1 && (
//         <Name value={formData.name} updateFormData={updateFormData} />
//       )}
//       {/* Navigation buttons for moving between steps */}
//       {!formSubmitted && (
//         <div className="cta-box">
//           {/* Show "Back" button if not on the first step */}
//           {currentStep > 1 && <button onClick={prevStep}>Back</button>}
//           {/* Show "Next" button or "Submit" button depending on the step */}
//           {currentStep < 6 ? (
//             <button onClick={nextStep}>Next</button>
//           ) : (
//             <button onClick={submitForm}>Submit Form</button>
//           )}
//         </div>
//       )}

//       {/* Display the form data after submission */}
//       {formSubmitted && (
//         <div className="border-box">
//           <h3>Voting Information</h3>
//           <p>Name: {formData.name}</p>
//           {/* Button to reset the form and start over */}
//           <button onClick={startOver}>Start Over</button>
//         </div>
//       )}
//     </div>
//   );
// };



import { useState } from "react";
import { Name } from "./Name";  // Adjust the import path if necessary



// Component: NameForm
export const MultiStepForm = () => {
  const [formData, setFormData] = useState({
    name: ""
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const updateFormData = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const submitForm = () => {
    console.log(formData);
    setFormSubmitted(true);
    alert(`Name: ${formData.name}`);
  };

  const startOver = () => {
    setFormData({ name: "" });
    setFormSubmitted(false);
  };

  return (
    <div>
      {formSubmitted ? (
        <h2>Thanks for submitting your name!</h2>
      ) : (
        <h2>Please Enter Your Name</h2>
      )}

      {!formSubmitted && (
        <Name value={formData.name} updateFormData={updateFormData} />
      )}

      {!formSubmitted ? (
        <button onClick={submitForm}>Submit</button>
      ) : (
        <button onClick={startOver}>Start Over</button>
      )}
    </div>
  );
};

