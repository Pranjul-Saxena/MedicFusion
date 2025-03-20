
import HomeLayout from '../../layouts/HomeLayout';
import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const DashBoard = () => {
  const [appointments, setAppointments] = useState([]);
  const [sortBy, setSortBy] = useState("appointmentDate");
  const [order, setOrder] = useState("asc");

  const navigate = useNavigate();

  // Fetch Appointments with Sorting
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
          const clinic_id = JSON.parse(localStorage.getItem("data"))?.clinic_id?._id; // Get clinic_id from localStorage
  
          const { data } = await axios.get(
              `http://localhost:5016/api/v1/appointments/getappointments?clinic_id=${clinic_id}&sortBy=${sortBy}&order=${order}`
          );
  
          setAppointments(data.appointments);
      } catch (error) {
          toast.error("Error fetching appointments");
      }
  };
  

    fetchAppointments();
  }, [sortBy, order]);

  // Handle Sorting Change
  const handleSortChange = (field) => {
    if (sortBy === field) {
      setOrder(order === "asc" ? "desc" : "asc"); // Toggle order
    } else {
      setSortBy(field);
      setOrder("asc");
    }
  };

  // Handle Row Click to Navigate to Patient Details
  const handleRowClick = (patientId) => {
    navigate(`/patient/${patientId}`);
  };

  return (
    <HomeLayout>
      <div className="flex flex-col w-[80%] mx-auto mt-6">
        
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Appointments</h2>
          <Link
            to="/addappointment"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            + Add Appointment
          </Link>
        </div>

        {/* Appointments Table */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th
                  className="p-3 cursor-pointer"
                  onClick={() => handleSortChange("appointmentDate")}
                >
                  Date {sortBy === "appointmentDate" ? (order === "asc" ? "↑" : "↓") : ""}
                </th>
                <th
                  className="p-3 cursor-pointer"
                  onClick={() => handleSortChange("appointmentTime")}
                >
                  Time {sortBy === "appointmentTime" ? (order === "asc" ? "↑" : "↓") : ""}
                </th>
                <th className="p-3">Doctor</th>
                <th className="p-3">Patient</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {appointments.length > 0 ? (
                appointments.map((appointment, index) => (
                  <tr
                    key={appointment._id}
                    className={index % 2 === 0 ? "bg-gray-100 cursor-pointer" : "bg-white cursor-pointer"}
                    onClick={() => handleRowClick(appointment.patient._id)}
                  >
                    <td className="p-3">{new Date(appointment.appointmentDate).toLocaleDateString()}</td>
                    <td className="p-3">{appointment.appointmentTime}</td>
                    <td className="p-3">{appointment.doctor.name}</td>
                    <td className="p-3">{appointment.patient.patient_name}</td>
                    <td className={`p-3 font-semibold ${appointment.status === "Completed" ? "text-green-600" : "text-red-600"}`}>
                      {appointment.status}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-4 text-center text-gray-500">
                    No Appointments Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </HomeLayout>
  );
};

export default DashBoard;

























// import HomeLayout from '../../layouts/HomeLayout'
// import { Link } from 'react-router-dom'
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";

// const DashBoard = () => {
//   const [appointments, setAppointments] = useState([]);
//   const [sortBy, setSortBy] = useState("appointmentDate");
//   const [order, setOrder] = useState("asc");

//   // Fetch Appointments with Sorting
//   useEffect(() => {
//     const fetchAppointments = async () => {
//       try {
//         const { data } = await axios.get(
//           `http://localhost:5016/api/v1/appointments/getappointments?sortBy=${sortBy}&order=${order}`
//         );
//         console.log(data);
//         setAppointments(data.appointments);
//       } catch (error) {
//         toast.error("Error fetching appointments");
//       }
//     };

//     fetchAppointments();
//   }, [sortBy, order]);

//   // Handle Sorting Change
//   const handleSortChange = (field) => {
//     if (sortBy === field) {
//       setOrder(order === "asc" ? "desc" : "asc"); // Toggle order
//     } else {
//       setSortBy(field);
//       setOrder("asc");
//     }
//   };
//   return (
//     <HomeLayout>
//       <div className='w-[70vw]'>
//         <div className='relative'>
//           <Link to="/addappointment" className='absolute right-0 p-2 m-2 text-white bg-gray-400  border-2 rounded-2xl hover:text-gray-500 hover:bg-white'>+ Add Appointment
//           </Link>
//         </div>
//         <div className='p-10'>
//           <div className="container mx-auto mt-5 p-4">
//             <h2 className="text-xl font-bold mb-4">Appointments List</h2>

//             <table className="w-full border-collapse border border-gray-300 bg-white">
//               <thead>
//                 <tr className="bg-gray-100 text-left">
//                   <th
//                     className="p-2 cursor-pointer"
//                     onClick={() => handleSortChange("appointmentDate")}
//                   >
//                     Date {sortBy === "appointmentDate" ? (order === "asc" ? "↑" : "↓") : ""}
//                   </th>
//                   <th
//                     className="p-2 cursor-pointer"
//                     onClick={() => handleSortChange("appointmentTime")}
//                   >
//                     Time {sortBy === "appointmentTime" ? (order === "asc" ? "↑" : "↓") : ""}
//                   </th>
//                   <th className="p-2">Doctor</th>
//                   <th className="p-2">Patient</th>
//                   <th className="p-2">Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {appointments.length > 0 ? (
//                   appointments.map((appointment) => (
//                     <tr key={appointment._id} className="border-b">
//                       <td className="p-2">
//                         {new Date(appointment.appointmentDate).toLocaleDateString()}
//                       </td>
//                       <td className="p-2">{appointment.appointmentTime}</td>
//                       <td className="p-2">{appointment.doctor.name}</td>
//                       <td className="p-2">{appointment.patient.patient_name}</td>
//                       <td className="p-2">{appointment.status}</td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="5" className="p-4 text-center text-gray-100">
//                       No Appointments Found
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </HomeLayout>
//   )
// }

// export default DashBoard