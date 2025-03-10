import React, { useState } from 'react';
import './input.css';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login Data:', formData);
    
    setFormData({
      email: '', 
      password: '',
    });
  };

  return (
    <div className='login-container'>
      <div className='login-head'>
        <h1>Login</h1>
        <h6>Please login to book an appointment</h6>
      </div>
      <form onSubmit={handleSubmit}>
        <div className='login-input'>
          <label>Email</label>
          <input type="email" name='email' value={formData.email} onChange={handleChange} required />

          <label>Password</label>
          <input type="password" name='password' value={formData.password} onChange={handleChange} required />
        </div>
        <div className='login-btn'>
          <button type='submit'>Login</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
