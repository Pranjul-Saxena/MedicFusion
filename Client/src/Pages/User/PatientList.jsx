import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HomeLayout from '../../layouts/HomeLayout';
import { getPatients } from '../../Redux/Slices/PatientSlice';

const PatientList = () => {
    const dispatch = useDispatch();
    const { patients, loading, error } = useSelector((state) => state.patients);
    const clinic_id = useSelector((state) => state.auth.data?.clinic_id?._id);

    // Fetch patients only when clinic_id is available
    useEffect(() => {
        if (clinic_id) {
            dispatch(getPatients(clinic_id));
        }
    }, [clinic_id, dispatch]);

    return (
        <HomeLayout>
            <div className="max-w-6xl mx-auto p-4">
                <h1 className="text-3xl font-semibold text-gray-800 mb-8">Patient List</h1>

                {/* Loading & Error States */}
                {loading && <p className="text-indigo-600 font-semibold">Loading patients...</p>}
                {error && (
                    <div className="text-red-500 bg-red-100 border border-red-400 px-4 py-2 rounded-md">
                        Error: {error}
                    </div>
                )}

                {!loading && !error && (!patients || patients.length === 0) && (
                    <p className="text-gray-600">No patients found for this clinic.</p>
                )}

                {!loading && !error && patients?.length > 0 && (
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                            <thead className="bg-indigo-500 text-white">
                                <tr>
                                    <th className="py-3 px-6 text-left">Patient Name</th>
                                    <th className="py-3 px-6 text-left">Contact</th>
                                    <th className="py-3 px-6 text-right">Age</th>
                                    <th className="py-3 px-6 text-left">Gender</th>
                                    <th className="py-3 px-6 text-left">Doctor Reference</th>
                                    <th className="py-3 px-6 text-left">Address</th>
                                    <th className="py-3 px-6 text-right">Advance Payment</th>
                                </tr>
                            </thead>
                            <tbody>
                                {patients.map((patient) => (
                                    <tr key={patient._id} className="border-b hover:bg-gray-100">
                                        <td className="py-3 px-6">{patient.patient_name}</td>
                                        <td className="py-3 px-6">{patient.contact_no}</td>
                                        <td className="py-3 px-6 text-right">{patient.age}</td>
                                        <td className="py-3 px-6 capitalize">{patient.gender}</td>
                                        <td className="py-3 px-6">{patient.doctor_re?.name || 'N/A'}</td>
                                        <td className="py-3 px-6">{patient.address || 'N/A'}</td>
                                        <td className="py-3 px-6 text-right">₹ {patient.advance_pay || 0}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </HomeLayout>
    );
};

export default PatientList;
























// components/PatientList.jsx
// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import HomeLayout from '../../layouts/HomeLayout';
// import { getPatients } from '../../Redux/Slices/PatientSlice';

// const PatientList = () => {
//     const dispatch = useDispatch();
//     const { patients, loading, error } = useSelector((state) => state.patients);
//     const clinic_id = useSelector((state) => state.auth.data?.clinic_id?._id);
//     // console.log("ClinicId From State", clinic_id);

//     // Fetch patients on component mount
//     useEffect(() => {
//         if (clinic_id) {
//             dispatch(getPatients(clinic_id));
//         }
//     }, [clinic_id, dispatch]);

//     return (
//         <HomeLayout>
//             <div className="max-w-6xl mx-auto p-4">
//                 <h1 className="text-3xl font-semibold text-gray-800 mb-8">Patient List</h1>

//                 {loading && <p>Loading patients...</p>}
//                 {error && <p className="text-red-500">Error: {error}</p>}

//                 {!loading && patients.length === 0 && <p>No patients found for this clinic.</p>}

//                 {!loading && patients.length > 0 && (
//                     <div className="overflow-x-auto">
//                         <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
//                             <thead className="bg-indigo-500 text-white">
//                                 <tr>
//                                     <th className="py-3 px-6 text-left">Patient Name</th>
//                                     <th className="py-3 px-6 text-left">Contact</th>
//                                     <th className="py-3 px-6 text-left">Age</th>
//                                     <th className="py-3 px-6 text-left">Gender</th>
//                                     <th className="py-3 px-6 text-left">Doctor Reference</th>
//                                     <th className="py-3 px-6 text-left">Address</th>
//                                     <th className="py-3 px-6 text-left">Advance Payment</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {patients.map((patient) => (
//                                     <tr key={patient._id} className="border-b hover:bg-gray-100">
//                                         <td className="py-3 px-6">{patient.patient_name}</td>
//                                         <td className="py-3 px-6">{patient.contact_no}</td>
//                                         <td className="py-3 px-6">{patient.age}</td>
//                                         <td className="py-3 px-6 capitalize">{patient.gender}</td>
//                                         <td className="py-3 px-6">{patient.doctor_re?.name || 'N/A'}</td>
//                                         <td className="py-3 px-6">{patient.address}</td>
//                                         <td className="py-3 px-6">₹ {patient.advance_pay}</td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 )}
//             </div>
//         </HomeLayout>
//     );
// };

// export default PatientList;
