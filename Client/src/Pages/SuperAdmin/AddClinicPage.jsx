import React, { useState } from 'react'
import HomeLayout from '../../layouts/HomeLayout';
import { addClinic } from '../../Redux/Slices/SuperAdminSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AddClinicPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        address: "",
        city: "",
        pincode: "",
        clinic_image: null,
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        setFormData({ ...formData, clinic_image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.address || !formData.city || !formData.pincode) {
            toast.error("Please fill all the details");
            return;
        }
        // console.log("Clinic Data:", formData);
        const response = await dispatch(addClinic(formData));
        console.log(response);
        if (response?.payload?.success)
            navigate("/home");
        setFormData({
            name: "",
            address: "",
            city: "",
            pincode: "",
            clinic_image: null,
        });
    };

    return (
        <>
            <HomeLayout>
                    <div className="flex flex-col justify-center items-center m-auto p-10 w-[80%]">
                        <h1 className="text-2xl font-bold text-gray-800 mb-5">Add Clinic</h1>

                        <div className="w-full max-w-md bg-white shadow-md rounded-xl p-4">
                            <div className="flex flex-col items-center mb-4">
                                <label className="cursor-pointer">
                                    <input type="file" onChange={handleImageChange} hidden />
                                    <div className="w-20 h-20 border-2 border-dashed rounded-full flex items-center justify-center overflow-hidden">
                                        <img
                                            src={
                                                formData.clinic_image
                                                    ? URL.createObjectURL(formData.clinic_image)
                                                    : "/image/clinic.png"
                                            }
                                            alt="Clinic"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </label>
                                <p className="mt-2 text-gray-600 text-sm">Upload clinic picture</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                {[
                                    { label: "Clinic Name", name: "name", placeholder: "Enter the clinic name" },
                                    { label: "Address", name: "address", placeholder: "Enter address" },
                                    { label: "City", name: "city", placeholder: "Enter city" },
                                    { label: "Pincode", name: "pincode", placeholder: "Enter pincode" },
                                ].map((field) => (
                                    <div key={field.name}>
                                        <label className="block text-gray-700 mb-1 text-sm font-medium">{field.label}</label>
                                        <input
                                            type="text"
                                            name={field.name}
                                            placeholder={field.placeholder}
                                            value={formData[field.name]}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                ))}

                                <button
                                    type="submit"
                                    className="w-full py-2 mt-2 text-black text-sm rounded-lg hover:bg-blue-700 transition duration-300 btn-secondary bg-[#5F6FFF] px-4 font-semibold "
                                >
                                    Add Clinic
                                </button>
                            </form>
                        </div>
                    </div>
            </HomeLayout>
        </>
    )
}

export default AddClinicPage;