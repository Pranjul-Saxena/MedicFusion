import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../Helpers/axiosInstance';
import { toast } from 'react-hot-toast';

// Fetch Patients in a particular clinic 
export const getPatients = createAsyncThunk(
  'patients/getPatients',
  async (clinicId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/patients/getPatients/${clinicId}`);
      return response.data.patients; // Send patient data to reducer
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Error fetching patients');
    }
  }
);

// Add Patient
export const addPatient = createAsyncThunk(
  'patients/addPatient',
  async (patientData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('patients/addpatient', patientData);
      return response.data.patient; // Send the new patient to reducer
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Error adding patient');
    }
  }
);

const PatientSlice = createSlice({
  name: 'patients',
  initialState: {
    patients: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Patients
      .addCase(getPatients.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPatients.fulfilled, (state, action) => {
        state.loading = false;
        state.patients = action.payload;
        toast.success('Patients fetched successfully!');
      })
      .addCase(getPatients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`Error: ${action.payload}`);
      })

      // Add Patient
      .addCase(addPatient.pending, (state) => {
        state.loading = true;
      })
      .addCase(addPatient.fulfilled, (state, action) => {
        state.loading = false;
        state.patients.push(action.payload); // Update state with new patient
        toast.success('Patient added successfully!');
      })
      .addCase(addPatient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`Error: ${action.payload}`);
      });
  },
});

export default PatientSlice.reducer;
