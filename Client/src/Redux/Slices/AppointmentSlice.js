import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../Helpers/axiosInstance';
import toast from 'react-hot-toast';

// Add Appointment (API Call)
export const addAppointment = createAsyncThunk(
  'appointments/addAppointment',
  async (appointmentData, { rejectWithValue }) => {
    try {
      console.log(appointmentData);
      const response = await axiosInstance.post('appointments/addappointment', appointmentData);
      console.log(response);
      toast.success('Appointment booked successfully!');
      return response.data.appointment;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error booking appointment');
      return rejectWithValue(error.response?.data?.message || 'Error booking appointment');
    }
  }
);
// Async Thunk to fetch appointments with optional filters
export const getAppointments = createAsyncThunk(
  "appointments/getAppointments",
  async ({ doctorId, patientId, date, time, clinic_id }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/appointments/getappointments", {
        params: { doctorId, patientId, date, time, clinic_id }, // Pass filters as query parameters
      });
      return response.data.appointments; // Assuming the API returns appointments inside `appointments` key
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch appointments");
    }
  }
);

// Appointment Slice
const appointmentSlice = createSlice({
  name: 'appointments',
  initialState: {
    appointments: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Add Appointment Cases
      .addCase(addAppointment.pending, (state) => {
        state.loading = true;
      })
      .addCase(addAppointment.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments.push(action.payload);
      })
      .addCase(addAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // get Appointment Cases
      .addCase(getAppointments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments = action.payload;
      })
      .addCase(getAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      });
  },
});

export default appointmentSlice.reducer;
