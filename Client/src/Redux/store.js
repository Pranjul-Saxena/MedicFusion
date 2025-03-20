import { configureStore } from "@reduxjs/toolkit";

import authSliceReducer from './Slices/AuthSlice';
import superAdminSliceReducer from './Slices/SuperAdminSlice';
import patientSliceReducer from './Slices/PatientSlice';
import appointmentSliceReducer from './Slices/AppointmentSlice';

const store = configureStore({
    reducer: {
        auth: authSliceReducer,
        superadmin: superAdminSliceReducer,
        patients: patientSliceReducer,
        appointments: appointmentSliceReducer
    },
    devTools: true
});

export default store;