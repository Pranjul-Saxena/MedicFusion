import HomeLayout from '../../layouts/HomeLayout';
import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import axiosInstance from "../../Helpers/axiosInstance";
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
        const clinic_id = JSON.parse(localStorage.getItem("data"))?.clinic_id?._id;
        const { data } = await axiosInstance.get(
          `appointments/getappointments?clinic_id=${clinic_id}&sortBy=${sortBy}&order=${order}`
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
      setOrder(order === "asc" ? "desc" : "asc");
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
      <div className="flex flex-col w-full max-w-6xl mx-auto mt-6 p-4 max-sm:p-2 md:p-8">

        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800">Appointments</h2>
          <div className='flex gap-2'>
            <Link
              to="/addpatient"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              + Add New Patient
            </Link>
            <Link
              to="/addappointment"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              + Add Existing Patient
            </Link>
          </div>
        </div>

        {/* Appointments Table */}
        <div className="bg-white shadow-md rounded-lg overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-800 text-white text-left">
                <th
                  className="p-2 cursor-pointer"
                  onClick={() => handleSortChange("appointmentDate")}
                >
                  Date {sortBy === "appointmentDate" ? (order === "asc" ? "↑" : "↓") : ""}
                </th>
                <th
                  className="p-2 cursor-pointer"
                  onClick={() => handleSortChange("appointmentTime")}
                >
                  Time {sortBy === "appointmentTime" ? (order === "asc" ? "↑" : "↓") : ""}
                </th>
                <th className="p-2">Doctor</th>
                <th className="p-2">Patient</th>
                <th className="p-2">Status</th>
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
                    <td className="p-2">{new Date(appointment.appointmentDate).toLocaleDateString()}</td>
                    <td className="p-2">{appointment.appointmentTime}</td>
                    <td className="p-2">{appointment.doctor.name}</td>
                    <td className="p-2">{appointment.patient.patient_name}</td>
                    <td className={`p-2 font-semibold ${appointment.status === "Completed" ? "text-green-600" : "text-red-600"}`}>
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
