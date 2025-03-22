import React, { useState, useEffect } from 'react';
import HomeLayout from '../../layouts/HomeLayout';
import axiosInstance from "../../Helpers/axiosInstance";

const ClinicDetails = () => {
  const [clinics, setClinics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClinics = async () => {
      try {
        const response = await axiosInstance.get('superadmin/getClinic');
        console.log(response);
        setClinics(response.data.clinics);
      } catch (error) {
        console.error('Error fetching clinics:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchClinics();
  }, []);

  return (
    <HomeLayout>
      <div className="flex flex-col items-center">
        <div className="w-[75%] p-0 sm:p-0 md:p-8 lg:p-8">
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-4 text-left">Clinic Details</h2>
          {loading ? (
            <p className="flex justify-center items-center text-xl sm:text-2xl md:text-3xl">Loading...</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border rounded-lg shadow-lg">
                <thead className="bg-blue-600 text-white">
                  <tr>
                    <th className="py-2 px-2 sm:px-4 text-left">Name</th>
                    <th className="py-2 px-2 sm:px-4 text-left">Address</th>
                    <th className="py-2 px-2 sm:px-4 text-left">City</th>
                    <th className="py-2 px-2 sm:px-4 text-left">Pincode</th>
                    <th className="py-2 px-2 sm:px-4 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {clinics.map((clinic) => (
                    <tr key={clinic._id} className="border-t hover:bg-gray-100">
                      <td className="py-2 px-2 sm:px-4">{clinic.name}</td>
                      <td className="py-2 px-2 sm:px-4">{clinic.address}</td>
                      <td className="py-2 px-2 sm:px-4">{clinic.city}</td>
                      <td className="py-2 px-2 sm:px-4">{clinic.pincode}</td>
                      <td className="py-2 px-2 sm:px-4">
                        <button className="bg-yellow-500 text-white px-2 py-1 sm:px-3 sm:py-1 rounded-lg mr-2 hover:bg-yellow-600">Edit</button>
                        <button className="bg-red-500 text-white px-2 py-1 sm:px-3 sm:py-1 rounded-lg hover:bg-red-600">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </HomeLayout>
  );
};

export default ClinicDetails;
