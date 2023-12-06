import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';


//12/6 initialize the dynamic form 
const CheckboxForm = ({ Vacancies }) => {
    const {id} = useParams();
  const [checkboxes, setCheckboxes] = useState(
    Vacancies.reduce((options, companyName) => {
      options[companyName.id] = false;
      return options;
    }, {})
  );

  //12/6 handle changes
  const handleCheckboxChange = (companyNameId) => {
    setCheckboxes((prevCheckboxes) => ({
      ...prevCheckboxes,
      [companyNameId]: !prevCheckboxes[companyNameId],
    }));
  };

  //pass data to main form
  const handleSubmit = (event) => {
    event.preventDefault();

    // Filter selected checkboxes
    const selectedVacancies = Vacancies.filter((vacancy) => checkboxes[vacancy.id]) .map((vacancy) => vacancy.name);

     // Include company ID in the selectedVacancies array
  const companyId = id;

    selectedVacancies.companyId = companyId;


    // Log selected values
    console.log('Selected Vacancies:', selectedVacancies);
    //unchecking
    setCheckboxes((prevCheckboxes) => {
        const resetCheckboxes = { ...prevCheckboxes };
        Object.keys(resetCheckboxes).forEach((key) => {
          resetCheckboxes[key] = false;
        });
        return resetCheckboxes;
      })
  };

  return (
    <Form onSubmit={handleSubmit}>
        {/*12/6 map the Vacancies array and create a form acording to the number os vacancies in a sinlge company */}
      {Vacancies.map((vacancy) => (
        <Form.Group key={vacancy.id} controlId={`checkbox-${vacancy.id}`}>
          <Form.Check
            type="checkbox"
            id={vacancy.id}
            label={vacancy.name}
            checked={checkboxes[vacancy.id]}
            onChange={() => handleCheckboxChange(vacancy.id)}
          />
        </Form.Group>
      ))}

      <button className='submit_button'>
        Done
      </button>
    </Form>
  );
};

export default CheckboxForm;
