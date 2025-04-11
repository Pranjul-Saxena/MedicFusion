import React from 'react'
import { Route, Routes } from "react-router-dom";

import Login from './components/Login'
import HomeLayout from './layouts/HomeLayout';
import AddClinicPage from './Pages/SuperAdmin/AddClinicPage';
import AddUserPage from './Pages/SuperAdmin/AddUserPage';
import UserDetailsPage from './Pages/SuperAdmin/UserDetailsPage';
import ClinicDetails from './Pages/SuperAdmin/ClinicDetailsPage';
import AddPatient from './Pages/User/AddPatient';
import PatientList from './Pages/User/PatientList';
import AddAppointment from './Pages/User/Appointment/AddAppointment';
import DashBoard from './Pages/User/DashBoard';
import Appointments from './Pages/User/Appointment/Appointments';
import PatientDetails from './Pages/User/PatientDetails';
import AppointmentDetails from './Pages/User/Appointment/AppointmentDetails';
import LandingPage from './components/LandingPage';
import LandingPage1 from './components/LandingPage1';
import Pricing from './components/Pricing';
import Contact from './components/Contact';
import Features from './components/LandingPage/Features';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/pricing" element={<Pricing/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/features" element={<Features/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<DashBoard />} />
        <Route path="/addClinic" element={<AddClinicPage />} />
        <Route path="/addUser" element={<AddUserPage />} />
        <Route path="/userDetails" element={<UserDetailsPage />} />
        <Route path="/clinicDetails" element={<ClinicDetails />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/addpatient" element={<AddPatient />} />
        <Route path="/addappointment" element={<AddAppointment />} />
        <Route path="/patientlist" element={<PatientList />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/patient/:patientId" element={<PatientDetails />} />
        <Route path="/patient/appointments/:appointmentId/:patientId" element={<AppointmentDetails />} />


        {/*
          <Route path="/about" element={<AboutUs />}></Route>
        <Route path="/courses" element={<CourseList />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/denied" element={<Denied />} />
        <Route path="/course/description" element={<CourseDescription />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<RequireAuth allowedRoles={["ADMIN"]} />}>
          <Route path="/course/create" element={<CreateCourse />} />
          <Route path="/course/addlecture" element={<AddLecture />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={["ADMIN", "USER"]} />}>
          <Route path="/user/profile" element={<Profile />} />
          <Route path="/user/editprofile" element={<EditProfile />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/checkout/success" element={<CheckoutSuccess />} />
          <Route path="/checkout/fail" element={<CheckoutFailure />} />
          <Route path="/course/displaylectures" element={<Displaylectures />} />
        </Route>
        <Route path="*" element={<NotFound />}></Route>
    */}
      </Routes>
    </>
  )
}

export default App