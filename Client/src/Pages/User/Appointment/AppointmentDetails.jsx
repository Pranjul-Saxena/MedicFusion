import React, { useState, useEffect } from "react";
import HomeLayout from "../../../layouts/HomeLayout";
import { useParams } from "react-router-dom";
import axios from "axios";

const AppointmentDetails = () => {
  const [prescription, setPrescription] = useState({
    symptoms: "",
    medicine: "",
    tests: "",
    suggestions: "",
  });
  const [reports, setReports] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  const { patientId, appointmentId } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [patient, setPatient] = useState(null);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [patientResponse, appointmentsResponse, prescriptionResponse] = await Promise.all([
          axios.get(`http://localhost:5016/api/v1/patients/${patientId}`),
          axios.get(`http://localhost:5016/api/v1/appointments/getappointments`, {
            params: { patientId, appointmentId },
          }),
          axios.get(`http://localhost:5016/api/v1/appointments/prescription/${appointmentId}`)
        ]);

        setPatient(patientResponse.data.patient);
        setAppointments(appointmentsResponse.data.appointments);
        if (prescriptionResponse.data.length) {
          setPrescription(prescriptionResponse.data[0]);
        }
      } catch (err) {
        setError("Failed to load data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [patientId, appointmentId]);

  useEffect(() => {
    return () => previewUrls.forEach((url) => URL.revokeObjectURL(url));
  }, [previewUrls]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPrescription((prev) => ({ ...prev, [name]: value }));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const { name, value } = e.target;
      setPrescription((prev) => ({ ...prev, [name]: value + "\n• " }));
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const newUrl = URL.createObjectURL(file);
      setReports((prev) => [...prev, file]);
      setPreviewUrls((prev) => [...prev, newUrl]);
    }
  };

  const handleSavePrescription = async () => {
    try {
      await axios.post(`http://localhost:5016/api/v1/appointments/prescription/${appointmentId}`, {
        ...prescription,
        appointmentId,
      });
      setIsEditing(false);
      alert("Prescription saved successfully!");
    } catch (error) {
      console.error("Error saving prescription", error);
    }
  };

  if (loading) {
    return (
      <HomeLayout>
        <p className="text-center text-gray-600">Loading...</p>
      </HomeLayout>
    );
  }

  if (error) {
    return (
      <HomeLayout>
        <p className="text-center text-red-500">{error}</p>
      </HomeLayout>
    );
  }

  return (
    <HomeLayout>
      <div className="pt-10 px-5">
        <div className="bg-white p-8 shadow-md rounded-lg">
          <h2 className="text-2xl font-bold mb-3">Patient Details</h2>
          <div className="mb-1"><strong>Name:</strong> {patient.patient_name}</div>
          <div className="mb-1"><strong>Contact:</strong> {patient.contact_no}</div>

          {patient.doctor && (
            <div className="mb-3">
              <strong>Doctor:</strong> {patient.doctor.name} ({patient.doctor.specialization})
            </div>
          )}

          <h3 className="text-lg font-semibold mt-6">Appointment Detail</h3>
          <table className="w-full border-collapse border border-gray-300 mt-2">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="p-3 border">#</th>
                <th className="p-3 cursor-pointer border">Date</th>
                <th className="p-3 cursor-pointer border">Time</th>
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
                  <tr key={appointment._id} className="bg-gray-100 hover:bg-gray-200 cursor-pointer text-center">
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

        {/* Prescription Details */}
        <div className="mt-10 mx-auto text-black bg-white shadow-lg p-8 rounded-lg">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <h2 className="text-2xl text-black font-bold text-center">Prescription Details</h2>
            <div className="flex justify-center gap-6 mt-4 md:mt-0">
              <button
                className={`text-lg px-5 py-3 rounded-lg shadow-md transition ${isEditing ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-400 hover:bg-blue-600'}`}
                onClick={() => setIsEditing(true)}
                disabled={isEditing}
              >
                Edit
              </button>
              <button
                className={`text-lg px-5 py-3 rounded-lg shadow-md transition ${isEditing ? 'bg-green-400 hover:bg-green-600' : 'bg-gray-400 cursor-not-allowed'}`}
                onClick={handleSavePrescription}
                disabled={!isEditing}
              >
                Save
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
            <div className="border p-6 rounded-lg">
              <h3 className="text-center text-black font-semibold text-lg">Prescription</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                {["symptoms", "medicine", "tests", "suggestions"].map((field) => (
                  <div key={field}>
                    <label className="block font-medium text-lg capitalize">{field}</label>
                    <textarea
                      name={field}
                      className="w-full h-32 border p-3 rounded-md text-lg"
                      value={prescription[field] || ""}
                      onChange={handleChange}
                      onKeyPress={handleKeyPress}
                      disabled={!isEditing}
                    />
                  </div>
                ))}
              </div>
            </div>
            {/* Test Reports Section */}
            <div className="border p-4 rounded-lg">
              <h3 className="text-center text-black font-semibold text-lg">
                Test Reports
              </h3>
              <div className="grid grid-cols-4 gap-4 mt-6">
                {reports.map((report, index) => (
                  <div key={index} className="p-4 flex flex-col items-center">
                    {report.type.startsWith("image/") ? (
                      <img
                        src={URL.createObjectURL(report)}
                        alt="Preview"
                        className="w-20 h-20 object-cover rounded-md"
                      />
                    ) : (
                      <div className="w-20 h-20 flex items-center justify-center bg-gray-200 rounded-md">
                        <span className="text-lg">📄</span>
                      </div>
                    )}
                    <span className="text-center mt-2 truncate w-20" title={report.name}>
                      {report.name}
                    </span>
                  </div>
                ))}
                {isEditing && (
                  <div className="p-4 flex flex-col items-center">
                    <input
                      type="file"
                      className="hidden"
                      id="file-upload"
                      onChange={handleFileChange}
                    />
                    <label
                      htmlFor="file-upload"
                      className="cursor-pointer border p-4 flex items-center justify-center w-20 h-20 rounded-md text-center text-lg bg-gray-100 hover:bg-gray-200 transition"
                    >
                      +
                    </label>
                  </div>
                )}
              </div>
            </div>
            {/*<div className="border p-6 rounded-lg">
              <h3 className="text-center text-black font-semibold text-lg">Test Reports</h3>
              {isEditing && (
                <input type="file" onChange={handleFileChange} className="block w-full mt-4" />
              )}
            </div>*/}
          </div>
        </div>
      </div>
    </HomeLayout>
  );
};

export default AppointmentDetails;
