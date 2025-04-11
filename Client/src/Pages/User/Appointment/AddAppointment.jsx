import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDoctors } from '../../../Redux/Slices/SuperAdminSlice';
import { addAppointment } from '../../../Redux/Slices/AppointmentSlice';
import axiosInstance from '../../../Helpers/axiosInstance';
import toast from 'react-hot-toast';
import HomeLayout from '../../../layouts/HomeLayout';
import _ from 'lodash'; // Import lodash for debouncing

const AddAppointment = () => {
    const dispatch = useDispatch();

    // State for patient search
    const [patientName, setPatientName] = useState('');
    const [patientMobile, setPatientMobile] = useState('');
    const [patients, setPatients] = useState([]);
    const [loadingPatients, setLoadingPatients] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState(null);

    // State for doctor selection
    const [doctorSearch, setDoctorSearch] = useState('');
    const [selectedDoctor, setSelectedDoctor] = useState(null);

    // State for appointment details
    const [appointmentDate, setAppointmentDate] = useState('');
    const [appointmentTime, setAppointmentTime] = useState('');
    const [OtherDetails, setOtherDetails] = useState('');

    // Redux state (doctors, clinic ID)
    const { doctors } = useSelector((state) => state.superadmin);
    const { loading: appointmentLoading } = useSelector((state) => state.appointments);
    const clinic_id = useSelector((state) => state.auth.data?.clinic_id?._id);

    // Fetch doctors only once when component mounts
    useEffect(() => {
        if (clinic_id) {
            dispatch(getDoctors(clinic_id));
        }
    }, [dispatch, clinic_id]);

    // Debounced API Call for Patient Search
    const fetchPatients = useCallback(
        _.debounce(async (query) => {
            if (!query) return;
            setLoadingPatients(true);
            try {
                const { data } = await axiosInstance.get(`/patients/clinic_id/search?query=${query}`, { params: { clinic_id } });
                setPatients(data.patients);
            } catch (error) {
                toast.error('Error fetching patients');
            } finally {
                setLoadingPatients(false);
            }
        }, 500), // Debounce by 500ms
        []
    );

    // Trigger search when name or mobile input changes
    useEffect(() => {
        const query = patientName || patientMobile;
        fetchPatients(query);
    }, [patientName, patientMobile, fetchPatients]);

    // Handle selecting a patient
    const handleSelectPatient = (patient) => {
        setSelectedPatient(patient);
        setPatientName(patient.patient_name);
        setPatientMobile(patient.contact_no);
        setPatients([]); // Clear patient suggestions
    };

    // Filter doctors on frontend based on input
    const filteredDoctors = doctors.filter((doctor) =>
        doctor.name.toLowerCase().includes(doctorSearch.toLowerCase())
    );

    // Handle doctor selection
    const handleSelectDoctor = (doctor) => {
        setSelectedDoctor(doctor);
        setDoctorSearch(doctor.name);
    };

    // Form Submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Form Validation
        if (!selectedPatient || !selectedDoctor || !appointmentDate || !appointmentTime) {
            toast.error('All fields are required');
            return;
        }

        const appointmentData = {
            patientId: selectedPatient._id,
            doctorId: selectedDoctor._id,
            appointmentDate,
            appointmentTime,
            clinic_id,
        };

        dispatch(addAppointment(appointmentData))
            .unwrap()
            .then(() => {
                toast.success('Appointment added successfully!');
                resetForm();
            })
            .catch((error) => {
                toast.error(error || 'Failed to add appointment');
            });
    };

    // Reset Form
    const resetForm = () => {
        setSelectedPatient(null);
        setPatientName('');
        setPatientMobile('');
        setSelectedDoctor(null);
        setDoctorSearch('');
        setAppointmentDate('');
        setAppointmentTime('');
    };

    return (
        <HomeLayout>
            <div className="flex justify-center items-center p-5 pt-18">
                <div className="p-6 bg-white shadow-md rounded-lg w-full max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl m-auto">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4">Add Appointment</h2>

                    <form onSubmit={handleSubmit}>
                        {/* Patient Search */}
                        <div className="mb-4">
                            <label className="block mb-2 font-semibold">Search Patient:</label>
                            <input
                                type="text"
                                value={patientName}
                                onChange={(e) => setPatientName(e.target.value)}
                                placeholder="Search by name"
                                className="border p-2 w-full rounded-md"
                            />
                            <input
                                type="text"
                                value={patientMobile}
                                onChange={(e) => setPatientMobile(e.target.value)}
                                placeholder="Search by mobile"
                                className="border p-2 w-full rounded-md mt-2"
                            />

                            {/* Patient Suggestions */}
                            {loadingPatients ? (
                                <p>Loading patients...</p>
                            ) : (
                                <div className="bg-gray-100 rounded-md mt-1">
                                    {patients.length === 0 ? (
                                        <p className="p-2 text-gray-500">No patients found</p>
                                    ) : (
                                        patients.map((patient) => (
                                            <p
                                                key={patient._id}
                                                onClick={() => handleSelectPatient(patient)}
                                                className="cursor-pointer hover:bg-gray-200 p-2"
                                            >
                                                {patient.patient_name} ({patient.contact_no})
                                            </p>
                                        ))
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Doctor Search */}
                        <div className="mb-4">
                            <label className="block mb-2 font-semibold">Select Doctor:</label>
                            <input
                                type="text"
                                value={doctorSearch}
                                onChange={(e) => setDoctorSearch(e.target.value)}
                                placeholder="Search doctor"
                                className="border p-2 w-full rounded-md"
                            />

                            {/* Doctor Suggestions */}
                            <div className="bg-gray-100 rounded-md mt-1">
                                {filteredDoctors.length === 0 ? (
                                    <p className="p-2 text-gray-500">No doctors found</p>
                                ) : (
                                    filteredDoctors.map((doctor) => (
                                        <p
                                            key={doctor._id}
                                            onClick={() => handleSelectDoctor(doctor)}
                                            className="cursor-pointer hover:bg-gray-200 p-2"
                                        >
                                            {doctor.name}
                                        </p>
                                    ))
                                )}
                            </div>
                        </div>

                        {/* Date & Time Selection */}
                        <div className='flex gap-10'>
                            <div className="mb-4">
                                <label className="block mb-2 font-semibold">Select Date:</label>
                                <input type="date" value={appointmentDate} onChange={(e) => setAppointmentDate(e.target.value)} className="border p-2 w-full rounded-md" />
                            </div>

                            <div className="mb-4">
                                <label className="block mb-2 font-semibold">Select Time:</label>
                                <input type="time" value={appointmentTime} onChange={(e) => setAppointmentTime(e.target.value)} className="border p-2 w-full rounded-md" />
                            </div>
                            <div>
                                <label className="block mb-2 font-semibold">Other Details</label>
                                <input type="text-area" value={OtherDetails} onChange={(e) => setOtherDetails(e.target.value)} className="border p-2 w-full rounded-md" />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button type="submit" disabled={appointmentLoading} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-800">
                            {appointmentLoading ? 'Booking...' : 'Book Appointment'}
                        </button>
                    </form>
                </div>
            </div>
        </HomeLayout>
    );
};

export default AddAppointment;
