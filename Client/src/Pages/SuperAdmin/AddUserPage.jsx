import React, { useState, useEffect } from "react";
import HomeLayout from "../../layouts/HomeLayout";
import axiosInstance from "../../Helpers/axiosInstance";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../../Redux/Slices/SuperAdminSlice";

const AddUserPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    user_type: "Doctor",
    email: "",
    password: "",
    experience: "",
    education: "",
    clinic_id: "",
    address: "",
    city: "",
    pincode: "",
  });

  const [clinics, setClinics] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchClinics = async () => {
      try {
        const response = await axiosInstance.get("superadmin/getClinic");
        // console.log('Fetched clinics:', response.data.clinics);
        setClinics(response.data.clinics);
      } catch (error) {
        console.error("Error fetching clinics:", error);
      }
    };
    fetchClinics();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleClinicSelect = (clinic) => {
    setFormData({ ...formData, clinic_id: clinic._id });
    setSearchTerm(clinic.name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await dispatch(addUser(formData));
      console.log("User added successfully:", response);
      // alert("User added successfully");
      if (response?.payload?.success)
        navigate("/home");
      setFormData({
        name: "",
        user_type: "Doctor",
        email: "",
        password: "",
        experience: "",
        education: "",
        clinic_id: "",
        address: "",
        city: "",
        pincode: "",
      });
      setSearchTerm("");
    } catch (error) {
      console.error("Error adding user:", error);
      alert("Error adding user");
    }
  };

  const filteredClinics = clinics.filter((clinic) =>
    clinic.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <HomeLayout>
      <div className="flex flex-col justify-center items-center p-10">
        <h2 className="text-2xl font-bold mb-4">Add User</h2>
        <form
          onSubmit={handleSubmit}
          className="max-w-2xl w-full p-6 bg-white rounded-lg shadow-lg"
        >
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div>
              <label>User Type</label>
              <select
                name="user_type"
                value={formData.user_type}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                <option value="Doctor">Doctor</option>
                <option value="Receptionist">Receptionist</option>
              </select>
            </div>

            <div>
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div>
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div>
              <label>Experience</label>
              <input
                type="text"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                placeholder="Experience"
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label>Education</label>
              <input
                type="text"
                name="education"
                value={formData.education}
                onChange={handleChange}
                placeholder="Education"
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label>Clinic Name</label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search Clinic"
                className="w-full p-2 border rounded"
                required
              />
              {searchTerm && (
                <div className="border rounded mt-1 max-h-40 overflow-y-auto">
                  {filteredClinics.map((clinic) => (
                    <div
                      key={clinic._id}
                      className="p-2 hover:bg-gray-200 cursor-pointer"
                      onClick={() => handleClinicSelect(clinic)}
                    >
                      {clinic.name}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label>Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Address"
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label>City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="City"
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label>Pincode</label>
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                placeholder="Pincode"
                className="w-full p-2 border rounded"
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-6 w-full p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Add User
          </button>
        </form>
      </div>
    </HomeLayout>
  );
};

export default AddUserPage;
