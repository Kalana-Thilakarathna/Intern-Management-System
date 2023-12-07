import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const CheckboxForm = ({ vacancies }) => {
  const { id } = useParams();
  const [checkboxes, setCheckboxes] = useState({});

  useEffect(() => {
    if (Array.isArray(vacancies)) {
      // If vacancies is already an array, use it directly
      setCheckboxes(
        vacancies.reduce((options, vacancy) => {
          options[vacancy.id] = false;
          return options;
        }, {})
      );
    } else if (typeof vacancies === 'object') {
      // If vacancies is an object, convert it to an array using Object.values()
      const vacanciesArray = Object.values(vacancies);
      setCheckboxes(
        vacanciesArray.reduce((options, vacancy) => {
          options[vacancy.id] = false;
          return options;
        }, {})
      );
    }
  }, [vacancies]);

  const handleCheckboxChange = (vacancyId) => {
    setCheckboxes((prevCheckboxes) => ({
      ...prevCheckboxes,
      [vacancyId]: !prevCheckboxes[vacancyId],
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const selectedVacancies = Object.keys(checkboxes)
      .filter((vacancyId) => checkboxes[vacancyId])
      .map((vacancyId) => vacancies.find((vacancy) => vacancy.id === vacancyId).name);

    const companyId = id;
    selectedVacancies.companyId = companyId;

    console.log('Selected Vacancies:', selectedVacancies);

    setCheckboxes((prevCheckboxes) => {
      const resetCheckboxes = { ...prevCheckboxes };
      Object.keys(resetCheckboxes).forEach((key) => {
        resetCheckboxes[key] = false;
      });
      return resetCheckboxes;
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      {vacancies.map((vacancy) => (
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












// import React, { useState } from 'react';
// import { Form } from 'react-bootstrap';
// import { useParams } from 'react-router-dom';


// //12/6 initialize the dynamic form 
// const CheckboxForm = ({ Vacancies }) => {
//     const {id} = useParams();
//   const [checkboxes, setCheckboxes] = useState(
//     Vacancies.reduce((options, companyName) => {
//       options[companyName.id] = false;
//       return options;
//     }, {})
//   );

//   //12/6 handle changes
//   const handleCheckboxChange = (companyNameId) => {
//     setCheckboxes((prevCheckboxes) => ({
//       ...prevCheckboxes,
//       [companyNameId]: !prevCheckboxes[companyNameId],
//     }));
//   };

//   //pass data to main form
//   const handleSubmit = (event) => {
//     event.preventDefault();

//     // Filter selected checkboxes
//     const selectedVacancies = Vacancies.filter((vacancy) => checkboxes[vacancy.id]) .map((vacancy) => vacancy.name);

//      // Include company ID in the selectedVacancies array
//   const companyId = id;

//     selectedVacancies.companyId = companyId;


//     // Log selected values
//     console.log('Selected Vacancies:', selectedVacancies);
//     //unchecking
//     setCheckboxes((prevCheckboxes) => {
//         const resetCheckboxes = { ...prevCheckboxes };
//         Object.keys(resetCheckboxes).forEach((key) => {
//           resetCheckboxes[key] = false;
//         });
//         return resetCheckboxes;
//       })
//   };

//   return (
//     <Form onSubmit={handleSubmit}>
//         {/*12/6 map the Vacancies array and create a form acording to the number os vacancies in a sinlge company */}
//       {Vacancies.map((vacancy) => (
//         <Form.Group key={vacancy.id} controlId={`checkbox-${vacancy.id}`}>
//           <Form.Check
//             type="checkbox"
//             id={vacancy.id}
//             label={vacancy.name}
//             checked={checkboxes[vacancy.id]}
//             onChange={() => handleCheckboxChange(vacancy.id)}
//           />
//         </Form.Group>
//       ))}

//       <button className='submit_button'>
//         Done
//       </button>
//     </Form>
//   );
// };

// export default CheckboxForm;
