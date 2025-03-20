import React, { useState, useEffect } from 'react';
import HomeLayout from '../../layouts/HomeLayout';
import axios from 'axios';

const ClinicDetails = () => {
  const [clinics, setClinics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClinics = async () => {
      try {
        const response = await axios.get('http://localhost:5016/api/v1/superadmin/getClinic');
        console.log(response)
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
      <div className="flex flex-col items-center justify-center p-6">
        <h2 className="text-xl font-bold mb-4">Clinic Details</h2>
        {loading ? (
          <p className='flex justify-center items-center text-3xl'>Loading...</p>
        ) : (
          <div className="overflow-x-auto w-full max-w-4xl">
            <table className="min-w-full bg-white border rounded-lg shadow-lg">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="py-2 px-4">Name</th>
                  <th className="py-2 px-4">Address</th>
                  <th className="py-2 px-4">City</th>
                  <th className="py-2 px-4">Pincode</th>
                  <th className="py-2 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {clinics.map((clinic) => (
                  <tr key={clinic._id} className="border-t">
                    <td className="py-2 px-4">{clinic.name}</td>
                    <td className="py-2 px-4">{clinic.address}</td>
                    <td className="py-2 px-4">{clinic.city}</td>
                    <td className="py-2 px-4">{clinic.pincode}</td>
                    <td className="py-2 px-4">
                      <button className="bg-yellow-500 text-white px-3 py-1 rounded-lg mr-2 hover:bg-yellow-600">Edit</button>
                      <button className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600">Delete</button>
                    </td>
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

export default ClinicDetails;
