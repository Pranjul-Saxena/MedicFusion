import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../Redux/Slices/AuthSlice";
import { FiMenu } from "react-icons/fi";

function HomeLayout({ children }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);
    const role = useSelector((state) => state?.auth?.role);

    async function handleLogout(e) {
        e.preventDefault();
        const res = await dispatch(logout());
        if (res?.payload?.success) navigate("/home");
    }

    return (
        <div className="flex w-full min-h-screen overflow-hidden relative bg-gray-400">
            {/* Menu Icon for Small Screens */}
            <div className="sm:hidden fixed top-4 left-4 z-50">
                <FiMenu size={28} onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="cursor-pointer text-white" />
            </div>

            {/* Overlay to Close Sidebar on Click Outside */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}

            {/* Sidebar */}
            <div
                className={`w-64 bg-gray-800 text-white h-screen fixed left-0 top-0 p-4 transition-transform transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                    } sm:translate-x-0 z-50`}
            >
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
                        <div>
                            <li>
                                <NavLink to="/addClinic" className={({ isActive }) => `block py-2 px-4 rounded-md transition ${isActive ? "bg-gray-900" : "hover:bg-gray-700"}`}>
                                    Add Clinic
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/addUser" className={({ isActive }) => `block py-2 px-4 rounded-md transition ${isActive ? "bg-gray-900" : "hover:bg-gray-700"}`}>
                                    Add User
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/userDetails" className={({ isActive }) => `block py-2 px-4 rounded-md transition ${isActive ? "bg-gray-900" : "hover:bg-gray-700"}`}>
                                    User List
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/clinicDetails" className={({ isActive }) => `block py-2 px-4 rounded-md transition ${isActive ? "bg-gray-900" : "hover:bg-gray-700"}`}>
                                    Clinic List
                                </NavLink>
                            </li>
                        </div>
                    )}
                    {isLoggedIn && (role === "Doctor" || role === "Receptionist") && (
                        <div>
                            <li>
                                <NavLink to="/dashboard" className={({ isActive }) => `block py-2 px-4 rounded-md transition ${isActive ? "bg-gray-900" : "hover:bg-gray-700"}`}>
                                    Dashboard
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/appointments" className={({ isActive }) => `block py-2 px-4 rounded-md transition ${isActive ? "bg-gray-900" : "hover:bg-gray-700"}`}>
                                    Appointments
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/addpatient" className={({ isActive }) => `block py-2 px-4 rounded-md transition ${isActive ? "bg-gray-900" : "hover:bg-gray-700"}`}>
                                    Add Patient
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/addappointment" className={({ isActive }) => `block py-2 px-4 rounded-md transition ${isActive ? "bg-gray-900" : "hover:bg-gray-700"}`}>
                                    Add Appointment
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/patientlist" className={({ isActive }) => `block py-2 px-4 rounded-md transition ${isActive ? "bg-gray-900" : "hover:bg-gray-700"}`}>
                                    Patient List
                                </NavLink>
                            </li>
                        </div>
                    )}
                    {isLoggedIn && role === "Doctor" && (
                        <li>
                            <NavLink to="/referrals" className={({ isActive }) => `block py-2 px-4 rounded-md transition ${isActive ? "bg-gray-900" : "hover:bg-gray-700"}`}>
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
            <div className="flex-1 pt-6 sm:ml-64">
                {!isLoggedIn ? (
                    <div className="flex flex-col justify-center items-center h-screen">
                        <h1 className="text-4xl font-extrabold text-center">Welcome to MedicFusion</h1>
                        <NavLink to="/login" className="mt-8 px-6 py-3 bg-black text-white rounded-lg">
                            Login
                        </NavLink>
                    </div>
                ) : (
                    <div className="w-full overflow-x-auto">
                        {children}
                    </div>
                )}
            </div>
        </div>
    );
}

export default HomeLayout;
