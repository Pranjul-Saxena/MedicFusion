import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import axiosInstance from "../../Helpers/axiosInstance";
import HomeLayout from "../../layouts/HomeLayout";

const PatientDetails = () => {
    let { patientId } = useParams();
    const navigate = useNavigate(); // Initialize navigate function
    const [patient, setPatient] = useState(null);
    const [appointments, setAppointments] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [order, setOrder] = useState("asc");
    const [sortBy, setSortBy] = useState("appointmentDate");

    useEffect(() => {
        const fetchPatientDetails = async () => {
            try {
                const response = await axiosInstance.get(`patients/${patientId}`);
                setPatient(response.data.patient);                        // set patient data here for details of a particular patient

                const response1 = await axiosInstance.get(`appointments/getappointments?order=${order}&sortBy=${sortBy}`, {
                    params: { patientId }
                });
                setAppointments(response1.data.appointments);            //set appointments data here for all appointments of a particular patient
            } catch (err) {
                setError("Failed to load patient details");
            } finally {
                setLoading(false);
            }
        };
        fetchPatientDetails();
    }, [patientId, sortBy, order]);

    const handleSortChange = (field) => {
        if (sortBy === field) {
            setOrder(order === "asc" ? "desc" : "asc");
        } else {
            setSortBy(field);
            setOrder("asc");
        }
    };

    // Function to handle row click
    const handleRowClick = (appointmentId) => {
        navigate(`/patient/appointments/${appointmentId}/${patientId}`);
    };

    if (loading) return <HomeLayout><p className="text-center text-gray-600">Loading...</p></HomeLayout>;
    if (error) return <HomeLayout><p className="text-center text-red-500">{error}</p></HomeLayout>;

    return (
        <HomeLayout>
            <div className="px-5 pt-10 p-0">
                <div className="bg-white p-6 shadow-md rounded-lg">
                    <h2 className="text-2xl font-bold mb-3">Patient Details</h2>

                    <div className="mb-1">
                        <strong>Name:</strong> {patient.patient_name}
                    </div>
                    <div className="mb-1">
                        <strong>Contact:</strong> {patient.contact_no}
                    </div>

                    {patient.doctor && (
                        <div className="mb-3">
                            <strong>Doctor:</strong> {patient.doctor.name} ({patient.doctor.specialization})
                        </div>
                    )}

                    {/* Appointments Table */}
                    <h3 className="text-lg font-semibold mt-3">Appointments</h3>
                    <table className="w-full border-collapse border border-gray-300 mt-2">
                        <thead>
                            <tr className="bg-gray-800 text-white">
                                <th className="p-3 border">#</th>
                                <th
                                    className="p-3 cursor-pointer border"
                                    onClick={() => handleSortChange("appointmentDate")}
                                >
                                    Date {sortBy === "appointmentDate" ? (order === "asc" ? "↑" : "↓") : ""}
                                </th>
                                <th
                                    className="p-3 cursor-pointer border"
                                    onClick={() => handleSortChange("appointmentTime")}
                                >
                                    Time {sortBy === "appointmentTime" ? (order === "asc" ? "↑" : "↓") : ""}
                                </th>
                                <th className="p-3 border">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="p-4 text-center text-gray-500">
                                        No Appointments Found
                                    </td>
                                </tr>
                            ) : (
                                appointments.map((appointment, idx) => (
                                    <tr
                                        key={appointment._id} // Assuming `_id` is the unique identifier
                                        className="bg-gray-100 hover:bg-gray-200 cursor-pointer text-center"
                                        onClick={() => handleRowClick(appointment._id)} // Navigate on click
                                    >
                                        <td className="p-3 border">{idx + 1}</td>
                                        <td className="p-3 border">{new Date(appointment.appointmentDate).toLocaleDateString()}</td>
                                        <td className="p-3 border">{appointment.appointmentTime}</td>
                                        <td className="p-3 border">{appointment.status}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </HomeLayout>
    );
};

export default PatientDetails;
