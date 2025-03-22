import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import HomeLayout from "../../layouts/HomeLayout";
import axiosInstance from "../../Helpers/axiosInstance";
import mongoose from "mongoose";
import { addPatient } from "../../Redux/Slices/PatientSlice"; // Import addPatient action

const AddPatient = () => {
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        patient_name: "",
        contact_no: "",
        email_add: "",
        doctor_re: "",
        age: "",
        address: "",
        gender: "",
        advance_pay: "",
    });

    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const clinicId = useSelector((state) => state.auth.data?.clinic_id?._id);

    // Validate MongoDB ObjectId
    const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

    const fetchDoctors = async () => {
        if (!clinicId || !isValidObjectId(clinicId)) {
            setError("Invalid Clinic ID");
            return;
        }

        try {
            setLoading(true);
            setError(null);
            const response = await axiosInstance.get(`user/getDoctors/${clinicId}`);
            if (response.data.success) {
                setDoctors(response.data.doctors);
            } else {
                setError(response.data.message || "Failed to fetch doctors");
            }
        } catch (error) {
            console.error("Error fetching doctors:", error);
            setError("Error fetching doctors. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDoctors();
    }, [clinicId]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Ensure required fields are filled
        if (Object.values(formData).some((value) => value === "")) {
            alert("Please fill all fields.");
            return;
        }

        const clinic_id = clinicId;
        dispatch(addPatient({ ...formData, clinic_id }));

        // Reset form after submission
        setFormData({
            patient_name: "",
            contact_no: "",
            email_add: "",
            doctor_re: "",
            age: "",
            address: "",
            gender: "",
            advance_pay: "",
        });
    };

    return (
        <HomeLayout>
            <div className="flex flex-col items-center p-8">
                <h1 className="text-3xl font-semibold text-gray-800 mb-6">Add Patient</h1>

                <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-300 max-w-2xl w-full">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Name & Contact */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-600">Patient Name</label>
                                <input
                                    type="text"
                                    name="patient_name"
                                    placeholder="Enter Name"
                                    value={formData.patient_name}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-600">Contact Number</label>
                                <input
                                    type="text"
                                    name="contact_no"
                                    placeholder="+91 1234567890"
                                    value={formData.contact_no}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
                                />
                            </div>
                        </div>

                        {/* Email & Doctor Reference */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-600">Email Address</label>
                                <input
                                    type="email"
                                    name="email_add"
                                    placeholder="Enter Email"
                                    value={formData.email_add}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-600">Doctor's Reference</label>
                                {loading ? (
                                    <p className="text-gray-600">Loading doctors...</p>
                                ) : (
                                    <select
                                        name="doctor_re"
                                        value={formData.doctor_re}
                                        onChange={handleChange}
                                        required
                                        className="w-full p-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-blue-400"
                                    >
                                        <option value="">Select Doctor</option>
                                        {doctors.map((doctor) => (
                                            <option key={doctor._id} value={doctor._id}>
                                                {doctor.name}
                                            </option>
                                        ))}
                                    </select>
                                )}
                                {error && <p className="text-red-500">{error}</p>}
                            </div>
                        </div>

                        {/* Age & Address */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-600">Age</label>
                                <input
                                    type="number"
                                    name="age"
                                    placeholder="Enter Age"
                                    value={formData.age}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-600">Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    placeholder="Enter Address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
                                />
                            </div>
                        </div>

                        {/* Gender & Advance Payment */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-600">Gender</label>
                                <select
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
                                >
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-gray-600">Advance Payment</label>
                                <input
                                    type="text"
                                    name="advance_pay"
                                    placeholder="Enter Amount"
                                    value={formData.advance_pay}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-center">
                            <button
                                type="submit"
                                className="bg-indigo-500 text-white px-6 py-2 rounded-full shadow-md hover:bg-indigo-600 transition"
                            >
                                Add Patient
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </HomeLayout>
    );
};

export default AddPatient;
























// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import HomeLayout from '../../layouts/HomeLayout';
// import axiosInstance from '../../Helpers/axiosInstance';
// import mongoose from 'mongoose';
// import { addPatient } from '../../Redux/Slices/PatientSlice';// Import addPatient action

// const AddPatient = () => {
//     const dispatch = useDispatch();

//     const [formData, setFormData] = useState({
//         patient_name: '',
//         contact_no: '',
//         email_add: '',
//         doctor_re: '',
//         age: '',
//         address: '',
//         gender: '',
//         advance_pay: '',
//     });

//     const [doctors, setDoctors] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);

//     const clinicId = useSelector((state) => state.auth.data?.clinic_id?._id);

//     // Validate MongoDB ObjectId
//     const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

//     const fetchDoctors = async () => {
//         if (!clinicId || !isValidObjectId(clinicId)) {
//             setError('Invalid Clinic ID');
//             return;
//         }

//         try {
//             setLoading(true);
//             setError(null);
//             const response = await axiosInstance.get(`user/getDoctors/${clinicId}`);
//             if (response.data.success) {
//                 setDoctors(response.data.doctors);
//             } else {
//                 setError(response.data.message || 'Failed to fetch doctors');
//             }
//         } catch (error) {
//             console.error('Error fetching doctors:', error);
//             setError('Error fetching doctors. Please try again.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchDoctors();
//     }, [clinicId]);

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         // Ensure required fields are filled
//         if (Object.values(formData).some((value) => value === '')) {
//             alert('Please fill all fields.');
//             return;
//         }
//         // console.log({ ...formData, clinicId });
//         const clinic_id = clinicId;
//         // Dispatch the addPatient action to backend
//         dispatch(addPatient({ ...formData, clinic_id }));

//         // Reset form after submission
//         setFormData({
//             patient_name: '',
//             contact_no: '',
//             email_add: '',
//             doctor_re: '',
//             age: '',
//             address: '',
//             gender: '',
//             advance_pay: '',
//         });
//     };

//     return (
//         <HomeLayout>
//             <div className='flex flex-col justify-center items-center'>
//                 <h1 className="text-2xl font-bold text-gray-700 mt-10">Add Patient</h1>
//                 <div className="flex items-center mt-10">
//                     <div className="bg-white shadow-xl rounded-lg p-6 border border-gray-300 max-w-3xl w-full">
//                         <form onSubmit={handleSubmit} className="space-y-4">
//                             <div className="grid grid-cols-2 gap-4">
//                                 <div>
//                                     <label className="block text-gray-600 mb-1">Patient Name</label>
//                                     <input type="text" name="patient_name" placeholder="Enter Name"
//                                         value={formData.patient_name} onChange={handleChange} required
//                                         className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400" />
//                                 </div>
//                                 <div>
//                                     <label className="block text-gray-600 mb-1">Contact Number</label>
//                                     <input type="text" name="contact_no" placeholder="+91 1234567890"
//                                         value={formData.contact_no} onChange={handleChange} required
//                                         className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400" />
//                                 </div>
//                             </div>

//                             <div className="grid grid-cols-2 gap-4">
//                                 <div>
//                                     <label className="block text-gray-600 mb-1">Email Address</label>
//                                     <input type="email" name="email_add" placeholder="Enter Email"
//                                         value={formData.email_add} onChange={handleChange} required
//                                         className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400" />
//                                 </div>
//                                 <div>
//                                     <label className="block text-gray-600 mb-1">Doctor's Reference</label>
//                                     {loading ? (
//                                         <p>Loading doctors...</p>
//                                     ) : (
//                                         <select name="doctor_re" value={formData.doctor_re} onChange={handleChange} required
//                                             className="w-full p-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-blue-400">
//                                             <option value="">Select Doctor</option>
//                                             {doctors.map((doctor) => (
//                                                 <option key={doctor._id} value={doctor._id}>
//                                                     {doctor.name}
//                                                 </option>
//                                             ))}
//                                         </select>
//                                     )}
//                                     {error && <p className="text-red-500">{error}</p>}
//                                 </div>
//                             </div>

//                             <div className="grid grid-cols-2 gap-4">
//                                 <div>
//                                     <label className="block text-gray-600 mb-1">Age</label>
//                                     <input type="number" name="age" placeholder="Enter Age"
//                                         value={formData.age} onChange={handleChange} required
//                                         className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400" />
//                                 </div>
//                                 <div>
//                                     <label className="block text-gray-600 mb-1">Address</label>
//                                     <input type="text" name="address" placeholder="Enter Address"
//                                         value={formData.address} onChange={handleChange} required
//                                         className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400" />
//                                 </div>
//                             </div>

//                             <div className="grid grid-cols-2 gap-4">
//                                 <div>
//                                     <label className="block text-gray-600 mb-1">Gender</label>
//                                     <select name="gender" value={formData.gender} onChange={handleChange} required
//                                         className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400">
//                                         <option value="">Select Gender</option>
//                                         <option value="Male">Male</option>
//                                         <option value="Female">Female</option>
//                                         <option value="Other">Other</option>
//                                     </select>
//                                 </div>
//                                 <div>
//                                     <label className="block text-gray-600 mb-1">Advance Payment</label>
//                                     <input type="text" name="advance_pay" placeholder="Enter Amount"
//                                         value={formData.advance_pay} onChange={handleChange} required
//                                         className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400" />
//                                 </div>
//                             </div>

//                             <div className="flex mt-4">
//                                 <button type="submit"
//                                     className="bg-indigo-500 text-white px-6 py-2 rounded-full shadow-md hover:bg-indigo-600 transition">
//                                     Add Patient
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </HomeLayout>
//     );
// };

// export default AddPatient;
