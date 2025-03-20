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
  const [isEditing, setIsEditing] = useState(false);
  const [previewUrls, setPreviewUrls] = useState([]);

  let { patientId, appointmentId } = useParams();
  console.log(patientId, "aaaaaaaaaaaaaa", appointmentId);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [patient, setPatient] = useState(null);
  const [appointments, setAppointments] = useState(null);
  // const [prescriptionExists, setPrescriptionExists] = useState(false);

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const [patientResponse, appointmentsResponse] = await Promise.all([
          axios.get(`http://localhost:5016/api/v1/patients/${patientId}`),
          axios.get(`http://localhost:5016/api/v1/appointments/getappointments`, {
            params: { patientId, appointmentId },
          }),
        ]);

        setPatient(patientResponse.data.patient);
        setAppointments(appointmentsResponse.data.appointments);
      } catch (err) {
        setError("Failed to load patient details");
      } finally {
        setLoading(false);
      }
    };

    const fetchPrescription = async () => {
      try {
        const response = await axios.get(`http://localhost:5016/api/v1/appointments/prescription/${appointmentId}`);
        console.log(">>>>>>fetchPrescription>>>>>>>>", response.data);
        if (response.data) {
          setPrescription(response.data[0]);
          // setPrescriptionExists(true);
        }
      } catch (error) {
        // setPrescriptionExists(false);
        console.log("No existing prescription, using empty form.");
      }
    };

    fetchPatientDetails();
    fetchPrescription();
  }, [patientId, appointmentId]);

  console.log(">>>>>>>>>>>>>prescription",prescription);
  useEffect(() => {
    return () => {
      previewUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previewUrls]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPrescription((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const { name, value } = e.target;
      setPrescription((prevState) => ({ ...prevState, [name]: value + "\n• " }));
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const newUrl = URL.createObjectURL(file);
      setReports((prevReports) => [...prevReports, file]);
      setPreviewUrls((prevUrls) => [...prevUrls, newUrl]);
    }
  };

  const handleSavePrescription = async () => {
    try {
      // console.log(">>>>>>.fsgd",prescriptionExists)
      // if (!prescriptionExists.length==0) {
      //   await axios.put(`http://localhost:5016/api/v1/appointments/prescription/${appointmentId}`, {
      //     ...prescription,
      //     // appointmentId,
      //   });
      // } else
       {
        await axios.post(`http://localhost:5016/api/v1/appointments/prescription/${appointmentId}`, {
          ...prescription,
          appointmentId,
        });
        // setPrescriptionExists(true);
      }
      setIsEditing(false);
      alert("Prescription saved successfully!");
    } catch (error) {
      console.error("Error saving prescription", error);
    }
  };

  if (loading) return <HomeLayout><p className="text-center text-gray-600">Loading...</p></HomeLayout>;
  if (error) return <HomeLayout><p className="text-center text-red-500">{error}</p></HomeLayout>;

  return (
    <HomeLayout>
      <div className="py-6 px-10">
        <div className="bg-white p-8 shadow-md rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Patient Details</h2>

          <div className="mb-4"><strong>Name:</strong> {patient.patient_name}</div>
          <div className="mb-4"><strong>Contact:</strong> {patient.contact_no}</div>

          {patient.doctor && (
            <div className="mb-4">
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
                  <tr key={appointment._id} className="bg-gray-100 hover:bg-gray-200 cursor-pointer">
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

        <div className="mt-10 mx-auto text-black bg-white shadow-lg p-8 rounded-lg">
          <h2 className="text-xl text-black font-semibold text-center">Prescription Details</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
            <div className="border p-6 rounded-lg">
              <h3 className="text-center text-black font-semibold text-lg">Prescription</h3>
              <div className="grid grid-cols-2 gap-6 mt-6">
                {["symptoms", "medicine", "tests", "suggestions"].map((field) => (
                  <div key={field}>
                    <label className="block font-medium text-lg capitalize">{field}</label>
                    <textarea
                      name={field}
                      className="w-full h-32 border p-3 rounded-md text-lg"
                      value={prescription?.[field] || ""}
                      onChange={handleChange}
                      onKeyPress={handleKeyPress}
                      disabled={!isEditing}
                    />
                  </div>
                ))}
              </div>
            </div>

          {/* Test Reports Section */}
          <div className="border p-6 rounded-lg">
            <h3 className="text-center text-black font-semibold text-lg">
              Test Reports
            </h3>
            <div className="grid grid-cols-3 gap-6 mt-6">
              {reports.map((report, index) => (
                <div key={index} className="p-4 flex flex-col items-center">
                  {report.type.startsWith("image/") ? (
                    <img
                      src={URL.createObjectURL(report)}
                      alt="Preview"
                      className="w-24 h-24 object-cover rounded-md"
                    />
                  ) : (
                    <div className="w-24 h-24 flex items-center justify-center bg-gray-200 rounded-md">
                      <span className="text-lg">📄</span>
                    </div>
                  )}
                  <span className="text-center mt-2 truncate w-24" title={report.name}>
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
                    className="cursor-pointer border p-8 flex items-center justify-center w-28 h-28 rounded-md text-center text-lg bg-gray-100 hover:bg-gray-200 transition"
                  >
                    +
                  </label>
                </div>
              )}
            </div>
          </div>
          </div>
        <div className="flex justify-center gap-6 mt-8">
          <button className="bg-blue-400 text-white text-lg px-5 py-3 rounded-lg shadow-md hover:bg-blue-600 transition" onClick={() => setIsEditing(true)} disabled={isEditing}>
            Edit
          </button>
          <button className="bg-blue-400 text-white text-lg px-5 py-3 rounded-lg shadow-md hover:bg-blue-600 transition" onClick={handleSavePrescription} disabled={!isEditing}>
            Save
          </button>
        </div>
      </div>
    </div>
    </HomeLayout >
  );
};

export default AppointmentDetails;
























// import React, { useState, useEffect } from "react";
// import HomeLayout from "../../../layouts/HomeLayout";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// const AppointmentDetails = () => {
//   const [prescription, setPrescription] = useState({
//     symptoms: "",
//     medicine: "",
//     tests: "",
//     suggestions: "",
//   });
//   const [reports, setReports] = useState([]);
//   const [isEditing, setIsEditing] = useState(false);

//   let { patientId, appointmentId } = useParams();
//   // console.log(patientId);

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [patient, setPatient] = useState(null);
//   const [appointments, setAppointments] = useState(null);

//   const [prescriptionExists, setPrescriptionExists] = useState(false);

//   useEffect(() => {
//     const fetchPatientDetails = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5016/api/v1/patients/${patientId}`);
//         setPatient(response.data.patient);                        // set patient data here for details of a particular patient
//         // console.log(">>>>>>>patient4", response.data.patient);
//         const response1 = await axios.get(`http://localhost:5016/api/v1/appointments/getappointments`, {
//           params: { patientId, appointmentId }
//         });
//         setAppointments(response1.data.appointments);
//         // console.log(">>>>>>>appointment", response1.data.appointments);
//         //set appointments data here for all appointments of a particular patient
//       } catch (err) {
//         setError("Failed to load patient details");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchPatientDetails();

//     const fetchPrescription = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5016/api/v1/appointments/prescription/${appointmentId}`);
//         if (response.data) {
//           setPrescription(response.data);
//           setPrescriptionExists(true);
//         }
//       } catch (error) {
//         console.log("No existing prescription, using empty form.");
//       }
//     };
//     fetchPrescription();
//   }, [patientId, appointmentId]);

//   // console.log(patient);
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setPrescription({ ...prescription, [name]: value });
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") {
//       e.preventDefault();
//       const { name, value } = e.target;
//       const newValue = value + "\n• ";
//       setPrescription({ ...prescription, [name]: newValue });
//     }
//   };

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setReports([...reports, file]);
//     }
//   };

//   const handleSavePrescription = async () => {
//     try {
//       if (prescriptionExists) {
//         await axios.put(`http://localhost:5016/api/v1/appointments/prescription/${appointmentId}`, prescription);
//       } else {
//         await axios.post(`http://localhost:5016/api/v1/appointments/prescription/${appointmentId}`, { ...prescription, appointmentId });
//         setPrescriptionExists(true);
//       }
//       alert("Prescription saved successfully!");
//     } catch (error) {
//       console.error("Error saving prescription", error);
//     }
//   };

//   if (loading) return <HomeLayout><p className="text-center text-gray-600">Loading...</p></HomeLayout>;
//   if (error) return <HomeLayout><p className="text-center text-red-500">{error}</p></HomeLayout>;
//   return (
//     <HomeLayout>
//       <div className="py-6 px-10">
//         <div className="bg-white p-8 shadow-md rounded-lg">
//           <h2 className="text-2xl font-bold mb-4">Patient Details</h2>

//           <div className="mb-4">
//             <strong>Name:</strong> {patient.patient_name}
//           </div>
//           <div className="mb-4">
//             <strong>Contact:</strong> {patient.contact_no}
//           </div>

//           {patient.doctor && (
//             <div className="mb-4">
//               <strong>Doctor:</strong> {patient.doctor.name} ({patient.doctor.specialization})
//             </div>
//           )}

//           <h3 className="text-lg font-semibold mt-6">Appointment Detail</h3>
//           <table className="w-full border-collapse border border-gray-300 mt-2">
//             <thead>
//               <tr className="bg-gray-800 text-white">
//                 <th className="p-3 border">#</th>
//                 <th
//                   className="p-3 cursor-pointer border"
//                 >
//                   Date
//                 </th>
//                 <th
//                   className="p-3 cursor-pointer border"
//                 >
//                   Time
//                 </th>
//                 <th className="p-3 border">Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {appointments.length === 0 ? (
//                 <tr>
//                   <td colSpan="4" className="p-4 text-center text-gray-500">
//                     No Appointments Found
//                   </td>
//                 </tr>
//               ) : (
//                 appointments.map((appointment, idx) => (
//                   <tr
//                     key={appointment._id} // Assuming `_id` is the unique identifier
//                     className="bg-gray-100 hover:bg-gray-200 cursor-pointer"
//                     onClick={() => handleRowClick(appointment._id)} // Navigate on click
//                   >
//                     <td className="p-3 border">{idx + 1}</td>
//                     <td className="p-3 border">{new Date(appointment.appointmentDate).toLocaleDateString()}</td>
//                     <td className="p-3 border">{appointment.appointmentTime}</td>
//                     <td className="p-3 border">{appointment.status}</td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//         <div className="mt-10 mx-auto text-black bg-white shadow-lg p-8 rounded-lg">
//           <h2 className="text-xl text-black font-semibold text-center">
//             Prescription Details
//           </h2>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
//             {/* Prescription Section */}
//             <div className="border p-6 rounded-lg">
//               <h3 className="text-center text-black font-semibold text-lg">
//                 Prescription
//               </h3>
//               <div className="grid grid-cols-2 gap-6 mt-6">
//                 {["symptoms", "medicine", "tests", "suggestions"].map((field) => (
//                   <div key={field}>
//                     <label className="block font-medium text-lg capitalize">
//                       {field}
//                     </label>
//                     <textarea
//                       name={field}
//                       className="w-full h-32 border p-3 rounded-md text-lg"
//                       value={prescription[field]}
//                       onChange={handleChange}
//                       onKeyPress={handleKeyPress}
//                       disabled={!isEditing}
//                     />
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Test Reports Section */}
//             <div className="border p-6 rounded-lg">
//               <h3 className="text-center text-black font-semibold text-lg">
//                 Test Reports
//               </h3>
//               <div className="grid grid-cols-3 gap-6 mt-6">
//                 {reports.map((report, index) => (
//                   <div key={index} className="p-4 flex flex-col items-center">
//                     {report.type.startsWith("image/") ? (
//                       <img
//                         src={URL.createObjectURL(report)}
//                         alt="Preview"
//                         className="w-24 h-24 object-cover rounded-md"
//                       />
//                     ) : (
//                       <div className="w-24 h-24 flex items-center justify-center bg-gray-200 rounded-md">
//                         <span className="text-lg">📄</span>
//                       </div>
//                     )}
//                     <span className="text-center mt-2 truncate w-24" title={report.name}>
//                       {report.name}
//                     </span>
//                   </div>
//                 ))}
//                 {isEditing && (
//                   <div className="p-4 flex flex-col items-center">
//                     <input
//                       type="file"
//                       className="hidden"
//                       id="file-upload"
//                       onChange={handleFileChange}
//                     />
//                     <label
//                       htmlFor="file-upload"
//                       className="cursor-pointer border p-8 flex items-center justify-center w-28 h-28 rounded-md text-center text-lg bg-gray-100 hover:bg-gray-200 transition"
//                     >
//                       +
//                     </label>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Buttons */}
//           <div className="flex justify-center gap-6 mt-8">
//             <button
//               className="bg-blue-400 text-white text-lg px-5 py-3 rounded-lg shadow-md hover:bg-blue-600 transition"
//               onClick={() => setIsEditing(true)}
//               disabled={isEditing}
//             >
//               Edit
//             </button>
//             <button
//               className="bg-blue-400 text-white text-lg px-5 py-3 rounded-lg shadow-md hover:bg-blue-600 transition"
//               onClick={handleSavePrescription}
//               disabled={!isEditing}
//             >
//               Save
//             </button>
//           </div>
//         </div>
//       </div>
//     </HomeLayout>
//   );
// };

// export default AppointmentDetails;
