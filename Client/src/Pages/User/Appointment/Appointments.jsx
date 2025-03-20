import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { getAppointments } from "../../../Redux/Slices/AppointmentSlice";
import HomeLayout from "../../../layouts/HomeLayout";

const Appointments = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Initialize navigation
    const { appointments, loading } = useSelector((state) => state.appointments);
    const clinic_id = useSelector((state) => state.auth.data?.clinic_id?._id);
    // console.log("inside the Appointments component>>>",clinic_id);
    // Filters State
    const [doctorId, setDoctorId] = useState("");
    const [patientId, setPatientId] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");

    // Fetch Appointments on Load
    useEffect(() => {
        dispatch(getAppointments({ doctorId, patientId, date, time, clinic_id }));
    }, [dispatch, doctorId, patientId, date, time]);

    // console.log("Appointments>>>>id of patient: " + appointments);
    // console.log("Appointments>>>>id of patient: " + appointments.patient);
    // Handle Filter Search
    const handleFilter = (e) => {
        e.preventDefault();
        dispatch(getAppointments({ doctorId, patientId, date, time }));
    };

    // Handle Row Click Navigation
    const handleRowClick = (patientId) => {
        // console.log("Appointments", patientId);
        navigate(`/patient/${patientId}`);
    };

    return (
        <HomeLayout>
            <div className="flex flex-col items-center p-6">
                <div className="bg-white shadow-md rounded-lg w-[80%] p-6">

                    {/* Section Header */}
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Appointments</h2>

                    {/* Filter Section */}
                    <form onSubmit={handleFilter} className="grid grid-cols-3 gap-4 mb-6">
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

























// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getAppointments } from "../../../Redux/Slices/AppointmentSlice";
// import HomeLayout from "../../../layouts/HomeLayout";

// const Appointments = () => {
//     const dispatch = useDispatch();
//     const { appointments, loading } = useSelector((state) => state.appointments);

//     // Filters State
//     const [doctorId, setDoctorId] = useState("");
//     const [patientId, setPatientId] = useState("");
//     const [date, setDate] = useState("");
//     const [time, setTime] = useState("");

//     // Fetch Appointments on Load
//     useEffect(() => {
//         dispatch(getAppointments({ doctorId, patientId, date, time }));
//     }, [dispatch, doctorId, patientId, date, time]);

//     // Handle Filter Search
//     const handleFilter = (e) => {
//         e.preventDefault();
//         dispatch(getAppointments({ doctorId, patientId, date, time }));
//     };

//     return (
//         <HomeLayout>
//             <div className="flex justify-center items-center p-10">
//                 <div className="p-6 bg-white shadow-md rounded-lg w-[70vw]">
//                     <h2 className="text-2xl font-bold mb-4">Appointments</h2>

//                     {/* Filter Section */}
//                     <form onSubmit={handleFilter} className="mb-4 grid grid-cols-3 gap-10">

//                        {/* <input
//                             type="text"
//                             placeholder="Doctor ID"
//                             value={doctorId}
//                             onChange={(e) => setDoctorId(e.target.value)}
//                             className="border p-2 rounded-md"
//                         />
//                         <input
//                             type="text"
//                             placeholder="Patient ID"
//                             value={patientId}
//                             onChange={(e) => setPatientId(e.target.value)}
//                             className="border p-2 rounded-md"
//                         />
//                         */}
//                         <input
//                             type="date"
//                             value={date}
//                             onChange={(e) => setDate(e.target.value)}
//                             className="border p-2 rounded-md"
//                         />
//                         <input
//                             type="time"
//                             value={time}
//                             onChange={(e) => setTime(e.target.value)}
//                             className="border p-2 rounded-md"
//                         />
//                         <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-800">
//                             Apply Filters
//                         </button>
//                     </form>

//                     {/* Appointments Table */}
//                     <div className="overflow-x-auto">
//                         <table className="w-full border-collapse border border-gray-200">
//                             <thead>
//                                 <tr className="bg-gray-100">
//                                     <th className="border p-2">#</th>
//                                     <th className="border p-2">Doctor</th>
//                                     <th className="border p-2">Patient</th>
//                                     <th className="border p-2">Date</th>
//                                     <th className="border p-2">Time</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {loading ? (
//                                     <tr>
//                                         <td colSpan="5" className="border p-2 text-center">Loading...</td>
//                                     </tr>
//                                 ) : appointments.length === 0 ? (
//                                     <tr>
//                                         <td colSpan="5" className="border p-2 text-center">No Appointments Found</td>
//                                     </tr>
//                                 ) : (
//                                     appointments.map((appointment, index) => (
//                                         <tr key={appointment._id} className="hover:bg-gray-50">
//                                             <td className="border p-2">{index + 1}</td>
//                                             <td className="border p-2">{appointment.doctor.name}</td>
//                                             <td className="border p-2">{appointment.patient.patient_name}</td>
//                                             <td className="border p-2">{appointment.appointmentDate}</td>
//                                             <td className="border p-2">{appointment.appointmentTime}</td>
//                                         </tr>
//                                     ))
//                                 )}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             </div>
//         </HomeLayout>
//     );
// };

// export default Appointments;
