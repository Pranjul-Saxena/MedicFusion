import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../Redux/Slices/AuthSlice';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  async function onLogin(event) {
    event.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error("Please fill all the details");
      return;
    }
    const response = await dispatch(login(formData));
    console.log(response);
    if (response?.payload?.success) navigate("/home");
    setFormData({ email: "", password: "", });
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-4">
      <div className=" max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg bg-white shadow-md rounded-xl p-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Login</h1>
          <h6 className="text-gray-600 mt-2">Please login to book an appointment</h6>
        </div>
        <form onSubmit={onLogin} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1 text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1 text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 mt-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
