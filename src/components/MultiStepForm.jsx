import { useState } from "react";
import { Name } from "./Name";  
import { Categories } from "./Categories";  

// Component: MultiStepForm
export const MultiStepForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    categories: ""  
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const updateFormData = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const submitForm = () => {
    console.log(formData);
    setFormSubmitted(true);
    alert(`Name: ${formData.name}, Category: ${formData.categories}`);  // 
  };

  const startOver = () => {
    setFormData({ name: "", categories: "" });  
    setFormSubmitted(false);
  };

  return (
    <div>
      {formSubmitted ? (
        <h2>Thanks for submitting your form!</h2>
      ) : (
        <h2>Please Enter Your Information</h2>
      )}

      {!formSubmitted && (
        <>
          <Name value={formData.name} updateFormData={updateFormData} />
          <Categories
            value={formData.categories}  
            updateFormData={updateFormData}
          />
        </>
      )}

      {!formSubmitted ? (
        <button onClick={submitForm}>Submit</button>
      ) : (
        <button onClick={startOver}>Start Over</button>
      )}
    </div>
  );
};
