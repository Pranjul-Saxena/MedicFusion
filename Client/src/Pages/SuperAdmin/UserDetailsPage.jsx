import React, { useEffect, useState } from 'react';
import HomeLayout from '../../layouts/HomeLayout';
import axios from 'axios';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5016/api/v1/superadmin/userDetails');
        console.log(response);
        setUsers(response.data.users);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <HomeLayout><p>Loading users...</p></HomeLayout>;

  return (
    <HomeLayout>
      <div className="flex flex-col items-center">
        <div className="w-full max-w-4xl px-4 sm:px-6 md:px-8 pt-5">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 text-left">User Details</h2>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="py-2 px-2 sm:px-4">Name</th>
                  <th className="py-2 px-2 sm:px-4">User Type</th>
                  <th className="py-2 px-2 sm:px-4">Email</th>
                  <th className="py-2 px-2 sm:px-4">Experience</th>
                  <th className="py-2 px-2 sm:px-4">Education</th>
                  <th className="py-2 px-2 sm:px-4">Clinic Name</th>
                  <th className="py-2 px-2 sm:px-4">Status</th>
                  <th className="py-2 px-2 sm:px-4">Actions</th>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className="border-t">
                    <td className="py-2 px-2 sm:px-4">{user.name}</td>
                    <td className="py-2 px-2 sm:px-4">{user.user_type}</td>
                    <td className="py-2 px-2 sm:px-4">{user.email}</td>
                    <td className="py-2 px-2 sm:px-4">{user.experience} years</td>
                    <td className="py-2 px-2 sm:px-4">{user.education}</td>
                    <td className="py-2 px-2 sm:px-4">{user.clinic_id?.name || 'N/A'}</td>
                    <td className="py-2 px-2 sm:px-4">
                      <span className={
                        user.status === 'Active'
                          ? 'text-green-600'
                          : 'text-red-600'
                      }>
                        {user.status}
                      </span>
                    </td>
                    <td className="py-2 px-2 sm:px-4">
                      <button className="bg-yellow-500 text-white px-2 sm:px-3 py-1 rounded mr-2 hover:bg-yellow-600">
                        Edit
                      </button>
                      <button className="bg-red-500 text-white px-2 sm:px-3 py-1 rounded hover:bg-red-600">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
};

export default UserList;









// import React, { useEffect, useState } from 'react';
// import HomeLayout from '../../layouts/HomeLayout';
// import axios from 'axios';

// const UserList = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await axios.get('http://localhost:5016/api/v1/superadmin/userDetails');
//         console.log(response);
//         setUsers(response.data.users);
//       } catch (error) {
//         console.error('Error fetching users:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, []);

//   if (loading) return <HomeLayout><p>Loading users...</p></HomeLayout>;

//   return (
//     <HomeLayout>
//       <div className="flex flex-col items-centercp-6">
//         <div className="w-[80%] p-6 sm:p-6 md:p-8">
//           <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 text-left">User Details</h2>

//           <div className="overflow-x-auto">
//             <table className="min-w-full bg-white shadow-md rounded-lg">
//               <thead>
//                 <tr className="bg-blue-600 text-white">
//                   <th className="py-2 px-2 sm:px-4">Name</th>
//                   <th className="py-2 px-2 sm:px-4">User Type</th>
//                   <th className="py-2 px-2 sm:px-4">Email</th>
//                   <th className="py-2 px-2 sm:px-4">Experience</th>
//                   <th className="py-2 px-2 sm:px-4">Education</th>
//                   <th className="py-2 px-2 sm:px-4">Clinic Name</th>
//                   <th className="py-2 px-2 sm:px-4">Status</th>
//                   <th className="py-2 px-2 sm:px-4">Actions</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {users.map((user) => (
//                   <tr key={user._id} className="border-t">
//                     <td className="py-2 px-2 sm:px-4">{user.name}</td>
//                     <td className="py-2 px-2 sm:px-4">{user.user_type}</td>
//                     <td className="py-2 px-2 sm:px-4">{user.email}</td>
//                     <td className="py-2 px-2 sm:px-4">{user.experience} years</td>
//                     <td className="py-2 px-2 sm:px-4">{user.education}</td>
//                     <td className="py-2 px-2 sm:px-4">{user.clinic_id?.name || 'N/A'}</td>
//                     <td className="py-2 px-2 sm:px-4">
//                       <span className={
//                         user.status === 'Active'
//                           ? 'text-green-600'
//                           : 'text-red-600'
//                       }>
//                         {user.status}
//                       </span>
//                     </td>
//                     <td className="py-2 px-2 sm:px-4">
//                       <button className="bg-yellow-500 text-white px-2 sm:px-3 py-1 rounded mr-2 hover:bg-yellow-600">
//                         Edit
//                       </button>
//                       <button className="bg-red-500 text-white px-2 sm:px-3 py-1 rounded hover:bg-red-600">
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </HomeLayout>
//   );
// };

// export default UserList;
