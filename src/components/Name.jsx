// export const Name = ({ updateFormData, value }) => {
//   // Function to handle user input and update the form's email field
//   const handleNameChange = (n) => {
//     // Call updateFormData to update the "email" field with the input's current value
//     updateFormData("name", n.target.value);
//   };

//   return (
//     <div className="border-box">
//       {/* Label for the email input field */}
//       <label>Name:</label>

//       {/* Input field to capture the user's email, with the value controlled by the "value" prop */}
//       {/* The onChange event triggers the handleEmailChange function to update the form data */}
//       <input type="text" value={value} onChange={handleNameChange} />
//     </div>
//   );
// };


// export const Name = ({ updateFormData, value }) => {
//   // Function to handle user input and update the form's name field
//   const handleNameChange = (n) => {
//     // Call updateFormData to update the "name" field with the input's current value
//     updateFormData("name", n.target.value);
//   };

//   return (
//     <div className="border-box">
//       {/* Label for the name input field */}
//       <label>Name:</label>

//       {/* Input field to capture the user's name, with the value controlled by the "value" prop */}
//       {/* The onChange event triggers the handleNameChange function to update the form data */}
//       <input type="text" value={value} onChange={handleNameChange} />
//     </div>clear

//   );
// };

import PropTypes from "prop-types";

export const Name = ({ updateFormData, value }) => {
  const handleNameChange = (n) => {
    updateFormData("name", n.target.value);
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
  updateFormData: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};
