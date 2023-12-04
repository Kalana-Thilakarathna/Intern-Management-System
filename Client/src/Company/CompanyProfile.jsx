import React, { useState } from 'react';
import { Container, Image, Button, Form } from 'react-bootstrap';
import './CompanyProfile.css';

function CompanyProfile() {
  const [profileImage, setProfileImage] = useState(null);
  const [companyInfo, setCompanyInfo] = useState({
    companyName: ' Ionesoft',
    country: '4',
    address: '2',
    contactNumber: '',
    companyEmail: '',
  });

  const handleProfileImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveProfilePicture = () => {
    setProfileImage(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCompanyInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleUpdateInformation = () => {
    // Add logic to update company information on the server
    console.log('Updating company information:', companyInfo);
  };

  return (
    <div>
      <Container className="bg-zinc-50 p-2 my-10" id="cont">
        <div className="profile-image-container">
          <Image
            src={profileImage || "path/to/your/default/profile/image.jpg"}
            alt=""
            roundedCircle
            className="profile-image"
          />
          {profileImage && (
            <button
              onClick={handleRemoveProfilePicture}
              className="remove-button"
            >
              Remove
            </button>
          )}
        </div>
        <div className="mb-7">
          <label htmlFor="upload" className="upload-label">
            Add Profile Picture
          </label>
          <input
            type="file"
            id="upload"
            style={{ display: 'none' }}
            onChange={handleProfileImageChange}
          />
        </div>

        {/* Company Information Form */}
        <Form>
          <Form.Group className="mb-4" controlId="companyName">
            <Form.Label className="mb-2">Company Name</Form.Label>
            <Form.Control
              className='mb-5'
              type="text"
              placeholder="Enter company name"
              name="companyName"
              value={companyInfo.companyName}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="mb-4" controlId="country">
            <Form.Label className="mb-2">Total Number of Interns</Form.Label>
            <Form.Control
              className='mb-5'
              type="text"
              placeholder="Enter country"
              name="country"
              value={companyInfo.country}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="mb-4" controlId="address">
            <Form.Label className="mb-2">Total Number of Vacancies</Form.Label>
            <Form.Control
              className='mb-5'
              type="text"
              placeholder="Enter address"
              name="address"
              value={companyInfo.address}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="mb-4" controlId="contactNumber">
            <Form.Label className="mb-2">Contact Number</Form.Label>
            <Form.Control
              className='mb-5'
              type="text"
              placeholder="Enter contact number"
              name="contactNumber"
              value={companyInfo.contactNumber}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="mb-4" controlId="companyEmail">
            <Form.Label className="mb-2">Company Email</Form.Label>
            <Form.Control
              className='mb-5'
              type="email"
              placeholder="Enter company email"
              name="companyEmail"
              value={companyInfo.companyEmail}
              onChange={handleInputChange}
            />
          </Form.Group>

          
        </Form>
        
      </Container>
      <button onClick={handleUpdateInformation} className="mt-2">
            Update Information
          </button>
    </div>
  );
}

export default CompanyProfile;
