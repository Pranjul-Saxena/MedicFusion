import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAppointments } from "../../../Redux/Slices/AppointmentSlice";
import HomeLayout from "../../../layouts/HomeLayout";

const Appointments = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { appointments, loading } = useSelector((state) => state.appointments);
    const clinic_id = useSelector((state) => state.auth.data?.clinic_id?._id);

    const [doctorId, setDoctorId] = useState("");
    const [patientId, setPatientId] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");

    useEffect(() => {
        dispatch(getAppointments({ doctorId, patientId, date, time, clinic_id }));
    }, [dispatch, doctorId, patientId, date, time]);

    const handleFilter = (e) => {
        e.preventDefault();
        dispatch(getAppointments({ doctorId, patientId, date, time }));
    };

    const handleRowClick = (patientId) => {
        navigate(`/patient/${patientId}`);
    };

    return (
        <HomeLayout>
            <div className="flex flex-col items-center pt-6 p-1 sm:p-6 md:p-8">
                <div className="bg-white shadow-md rounded-lg w-full max-w-4xl p-4 sm:p-6 md:p-8">

                    {/* Section Header */}
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800 mb-4">Appointments</h2>

                    {/* Filter Section */}
                    <form onSubmit={handleFilter} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="border p-2 rounded-md w-full"
                        />
                        <input
                            type="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            className="border p-2 rounded-md w-full"
                        />
                        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
                            Apply Filters
                        </button>
                    </form>

                    {/* Appointments Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse border border-gray-300 bg-white">
                            <thead>
                                <tr className="bg-gray-800 text-white">
                                    <th className="p-3 border">#</th>
                                    <th className="p-3 border">Doctor</th>
                                    <th className="p-3 border">Patient</th>
                                    <th className="p-3 border">Date</th>
                                    <th className="p-3 border">Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan="5" className="p-4 text-center text-gray-600">Loading...</td>
                                    </tr>
                                ) : appointments.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="p-4 text-center text-gray-500">No Appointments Found</td>
                                    </tr>
                                ) : (
                                    appointments.map((appointment, index) => (
                                        <tr
                                            key={appointment._id}
                                            className={`cursor-pointer ${index % 2 === 0 ? "bg-gray-100" : "bg-white"}`}
                                            onClick={() => handleRowClick(appointment.patient._id)}
                                        >
                                            <td className="p-3 border">{index + 1}</td>
                                            <td className="p-3 border">{appointment.doctor.name}</td>
                                            <td className="p-3 border">{appointment.patient.patient_name}</td>
                                            <td className="p-3 border">{new Date(appointment.appointmentDate).toLocaleDateString()}</td>
                                            <td className="p-3 border">{appointment.appointmentTime}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </HomeLayout>
    );
};

export default Appointments;
