import React, { useState } from 'react';
import './input.css';

const AddClinic = () => {
  const [formData, setFormData] = useState({
    clinic_id: '',
    clinic_name: '',
    address: '',
    city: '',
    pincode: '',
    clinic_image: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, clinic_image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Clinic Data:', formData);
    setFormData({
      clinic_id: '',
      clinic_name: '',
      address: '',
      city: '',
      pincode: '',
      clinic_image: null,
    })
  };

  return (
    <>
      <h1 className="title">Add Clinic</h1>

      <div className="addclinic-container">
        <div className="upload-section">
          <label className="upload-label">
            <input type="file" onChange={handleImageChange} hidden />
            <div className="upload-box">
              <img
                src={formData.clinic_image ? URL.createObjectURL(formData.clinic_image) : "/image/clinic.png"}
              />
            </div>
          </label>
          <p className="upload-text">Upload clinic picture</p>
        </div>

        <form onSubmit={handleSubmit} className="form-container">
          <label>Clinic ID</label>
          <input type="text" name="clinic_id" placeholder="Enter the clinic_id" value={formData.clinic_id} onChange={handleChange} required />

          <label>Clinic Name</label>
          <input type="text" name="clinic_name" placeholder="Enter the clinic_name" value={formData.clinic_name} onChange={handleChange} required />

          <label>Address</label>
          <input type="text" name="address" placeholder="address" value={formData.address} onChange={handleChange} required />

          <label>City</label>
          <input type="text" name="city" placeholder="city" value={formData.city} onChange={handleChange} required />

          <label>Pincode</label>
          <input type="text" name="pincode" placeholder="pincode" value={formData.pincode} onChange={handleChange} required />

          <button type="submit" className="submit-btn">Add Clinic</button>
        </form>
      </div>
    </>
  );
};

export default AddClinic;
