import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../Redux/Slices/AuthSlice";

function HomeLayout({ children }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);
    const role = useSelector((state) => state?.auth?.role);

    async function handleLogout(e) {
        e.preventDefault();
        const res = await dispatch(logout());
        if (res?.payload?.success) navigate("/home");
    }

    return (
        <div className="flex min-h-screen bg-gray-400">
            {/* Sidebar */}
            <div className="w-64 bg-gray-800 text-white min-h-screen fixed left-0 top-0 p-4">
                {isLoggedIn && role === "SuperAdmin" && (
                    <h2 className="text-2xl font-bold mb-6 text-center">SuperAdmin Dashboard</h2>
                )}
                {isLoggedIn && role === "Doctor" && (
                    <h2 className="text-2xl font-bold mb-6 text-center">Doctor Dashboard</h2>
                )}
                {isLoggedIn && role === "Receptionist" && (
                    <h2 className="text-2xl font-bold mb-6 text-center">Receptionist Dashboard</h2>
                )}
                <ul className="space-y-3">
                    {isLoggedIn && role === "SuperAdmin" && (
                        <>
                            <li>
                                <NavLink
                                    to="/addClinic"
                                    className={({ isActive }) =>
                                        `block py-2 px-4 rounded-md transition ${isActive ? "bg-gray-900" : "hover:bg-gray-700"
                                        }`
                                    }>
                                    Add Clinic
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/addUser"
                                    className={({ isActive }) =>
                                        `block py-2 px-4 rounded-md transition ${isActive ? "bg-gray-900" : "hover:bg-gray-700"
                                        }`
                                    }>
                                    Add User
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/userDetails"
                                    className={({ isActive }) =>
                                        `block py-2 px-4 rounded-md transition ${isActive ? "bg-gray-900" : "hover:bg-gray-700"
                                        }`
                                    }>
                                    User List
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/clinicDetails"
                                    className={({ isActive }) =>
                                        `block py-2 px-4 rounded-md transition ${isActive ? "bg-gray-900" : "hover:bg-gray-700"
                                        }`
                                    }>
                                    Clinic List
                                </NavLink>
                            </li>
                        </>
                    )}
                    {isLoggedIn && (role === "Doctor" || role === "Receptionist") && (
                        <>
                            <li>
                                <NavLink
                                    to="/dashboard"
                                    className={({ isActive }) =>
                                        `block py-2 px-4 rounded-md transition ${isActive ? "bg-gray-900" : "hover:bg-gray-700"
                                        }`
                                    }>
                                    Dashboard
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/appointmests"
                                    className={({ isActive }) =>
                                        `block py-2 px-4 rounded-md transition ${isActive ? "bg-gray-900" : "hover:bg-gray-700"
                                        }`
                                    }>
                                    Appointments
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/addpatient"
                                    className={({ isActive }) =>
                                        `block py-2 px-4 rounded-md transition ${isActive ? "bg-gray-900" : "hover:bg-gray-700"
                                        }`
                                    }>
                                    Add Patient
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/addappointment"
                                    className={({ isActive }) =>
                                        `block py-2 px-4 rounded-md transition ${isActive ? "bg-gray-900" : "hover:bg-gray-700"
                                        }`
                                    }>
                                    Add Appointment
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/patientlist"
                                    className={({ isActive }) =>
                                        `block py-2 px-4 rounded-md transition ${isActive ? "bg-gray-900" : "hover:bg-gray-700"
                                        }`
                                    }>
                                    Patient List
                                </NavLink>
                            </li>
                        </>
                    )}
                    {isLoggedIn && role === "Doctor" && (
                        <li>
                            <NavLink
                                to="/referrals"
                                className={({ isActive }) =>
                                    `block py-2 px-4 rounded-md transition ${isActive ? "bg-gray-900" : "hover:bg-gray-700"
                                    }`
                                }>
                                Referrals
                            </NavLink>
                        </li>
                    )}
                    {!isLoggedIn && (
                        <li className="mt-8">
                            <div className="flex flex-col space-y-2">
                                <NavLink to="/login" className="bg-blue-500 text-white text-center py-2 rounded-md">
                                    Login
                                </NavLink>
                                <NavLink to="/signup" className="bg-green-500 text-white text-center py-2 rounded-md">
                                    Signup
                                </NavLink>
                            </div>
                        </li>
                    )}
                    {isLoggedIn && (
                        <li className="mt-8">
                            <div className="flex flex-col space-y-2">
                                <NavLink to="/user/profile" className="bg-blue-500 text-white text-center py-2 rounded-md">
                                    Profile
                                </NavLink>
                                <button onClick={handleLogout} className="bg-red-500 text-white cursor-pointer py-2 rounded-md">
                                    Logout
                                </button>
                            </div>
                        </li>
                    )}
                </ul>
            </div>

            {/* Main Content */}
            <div className="flex-1 ml-64 p-6">
                {!isLoggedIn ? (
                    <div className="flex flex-col justify-center items-center h-screen">
                        <h1 className="text-4xl font-extrabold text-center">Welcome to MedicFusion</h1>
                        <NavLink to="/login" className="mt-8 px-6 py-3 bg-black text-white rounded-lg">
                            Login
                        </NavLink>
                    </div>
                ) : (
                    children
                )}
            </div>
        </div>
    );
}

export default HomeLayout;
























// import { AiFillCloseCircle } from 'react-icons/ai';
// import { FiMenu } from 'react-icons/fi';
// import { useDispatch, useSelector } from 'react-redux';
// import { Link, useNavigate } from 'react-router-dom';
// import Footer from '../components/Footer';
// import { logout } from '../Redux/Slices/AuthSlice';

// // import { logout } from '../Redux/Slices/AuthSlice';
// function HomeLayout({ children }) {

//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     // for checking if user is logged in
//     const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);

//     // for displaying the options acc to role
//     const role = useSelector((state) => state?.auth?.role);

//     function changeWidth() {
//         const drawerSide = document.getElementsByClassName("drawer-side");
//         drawerSide[0].style.width = 'auto';
//     }

//     function hideDrawer() {
//         const element = document.getElementsByClassName("drawer-toggle");
//         element[0].checked = false;

//         const drawerSide = document.getElementsByClassName("drawer-side");
//         drawerSide[0].style.width = '0';
//     }

//     async function handleLogout(e) {
//         e.preventDefault();

//         const res = await dispatch(logout());
//         if (res?.payload?.success)
//             navigate("/home");
//     }

//     return (
//         <div className="min-h-[100vh] bg-gray-400">
//             <div className="drawer absolute left-0 z-50 w-fit">
//                 <input className="drawer-toggle" id="my-drawer" type="checkbox" />
//                 <div className="drawer-content">
//                     <label htmlFor="my-drawer" className="cursor-pointer relative">
//                         <FiMenu
//                             onClick={changeWidth}
//                             size={"32px"}
//                             className="font-bold text-white m-4"
//                         />
//                     </label>
//                 </div>
//                 <div className="drawer-side w-0">
//                     <label htmlFor="my-drawer" className="drawer-overlay">
//                     </label>
//                     <ul className="menu p-4 w-48 h-[100%] sm:w-80 bg-base-200 text-base-content relative">
//                         <li className="w-fit absolute right-2 z-50">
//                             <button onClick={hideDrawer}>
//                                 <AiFillCloseCircle size={24} />
//                             </button>
//                         </li>
//                         {isLoggedIn && role === 'SuperAdmin' && (
//                             <li>
//                                 <Link to="/addClinic"> Add Clinic</Link>
//                             </li>
//                         )}
//                         {isLoggedIn && role === 'SuperAdmin' && (
//                             <li>
//                                 <Link to="/addUser"> Add User</Link>
//                             </li>
//                         )}
//                         {isLoggedIn && role === 'SuperAdmin' && (
//                             <li>
//                                 <Link to="/userDetails">User List</Link>
//                             </li>
//                         )}
//                         {isLoggedIn && role === 'SuperAdmin' && (
//                             <li>
//                                 <Link to="/clinicDetails">Clinic List</Link>
//                             </li>
//                         )}
//                         {isLoggedIn && (role === 'Doctor' || role === 'Receptionist') && (
//                             <li>
//                                 <Link to="/dashboard"> DashBoard</Link>
//                             </li>
//                         )}
//                         {isLoggedIn && (role === 'Doctor' || role === 'Receptionist') && (
//                             <li>
//                                 <Link to="/appointmests"> Appointments </Link>
//                             </li>
//                         )}
//                         {isLoggedIn && (role === 'Doctor' || role === 'Receptionist') && (
//                             <li>
//                                 <Link to="/addpatient"> Add Patient</Link>
//                             </li>
//                         )}
//                         {isLoggedIn && (role === 'Doctor' || role === 'Receptionist') && (
//                             <li>
//                                 <Link to="/addappointment"> Add Appointment</Link>
//                             </li>
//                         )}
//                         {isLoggedIn && (role === 'Doctor' || role === 'Receptionist') && (
//                             <li>
//                                 <Link to="/patientlist">Patient List</Link>
//                             </li>
//                         )}
//                         {isLoggedIn && (role === 'Doctor') && (
//                             <li>
//                                 <Link to="#">Referals</Link>
//                             </li>
//                         )}
//                         {!isLoggedIn && (
//                             <li className="absolute bottom-4 w-[90%]">
//                                 <div className="w-full flex items-center justify-center">
//                                     <button className='btn-primary px-4 py-1 font-semibold rounded-md w-full'>
//                                         <Link to="/login">Login</Link>
//                                     </button>
//                                     <button className='btn-secondary px-4 py-1 font-semibold rounded-md w-full'>
//                                         <Link to="/login">Signup</Link>
//                                     </button>
//                                 </div>
//                             </li>
//                         )}

//                         {isLoggedIn && (
//                             <li className="absolute bottom-4 w-[90%] bg-red-200 rounded-lg">
//                                 <div className="w-full flex items-center justify-center">
//                                     <button className='btn-primary bg-[#5F6FFF] px-4 py-1 font-semibold rounded-md w-full'>
//                                         <Link to="/user/profile">Profile</Link>
//                                     </button>
//                                     <button className='btn-secondary bg-[#5F6FFF] px-4 py-1 font-semibold rounded-md w-full'>
//                                         <Link onClick={handleLogout}>Logout</Link>
//                                     </button>
//                                 </div>
//                             </li>
//                         )}
//                     </ul>
//                 </div>
//             </div>
//             {!isLoggedIn && (
//                 <div className='w-[100vw] h-[100vh] flex flex-col justify-center items-center'>
//                     <h1 className='text-6xl flex font-extrabold  text-center'>Welcome to the MedicFusion</h1>
//                     <Link to="/login" className='p-4 m-4 border-4 border-b-black rounded-2xl ml-[50vw] mt-8 '>Login</Link>
//                 </div>

//             )}

//             {children}

//             {/*            <div className='bottom-0 left-0 absolute w-full'><Footer /></div> */}
//         </div>
//     );
// }

// export default HomeLayout;