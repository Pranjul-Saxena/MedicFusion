import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosInstance";

// Async thunk to add a clinic
export const addClinic = createAsyncThunk(
    "/superadmin/addClinic",
    async (clinicData, { rejectWithValue }) => {
        // console.log("superadminSlice",clinicData);
        const { name, address, city, pincode } = clinicData;
        try {
            const res = axiosInstance.post("superadmin/addClinic", {
                name,
                address,
                city,
                pincode,
            });

            toast.promise(res, {
                loading: "Adding clinic, please wait...",
                success: (data) => data?.data?.message || "Clinic added successfully!",
                error: "Failed to add clinic.",
            });

            return (await res).data;
        } catch (error) {
            toast.error(error?.response?.data?.message || "An error occurred");
            return rejectWithValue(
                error.response ? error.response.data : error.message
            );
        }
    }
);
// Async thunk to add a clinic
export const addUser = createAsyncThunk(
    "/superadmin/addUser",
    async (clinicData, { rejectWithValue }) => {
        // console.log("superadminSlice",clinicData);
        const {
            name,
            user_type,
            email,
            password,
            experience,
            education,
            clinic_id,
            address,
            city,
            pincode,
        } = clinicData;
        try {
            const res = axiosInstance.post("superadmin/addUser", {
                name,
                user_type,
                email,
                password,
                experience,
                education,
                clinic_id,
                address,
                city,
                pincode,
            });

            toast.promise(res, {
                loading: "Adding clinic, please wait...",
                success: (data) => data?.data?.message || "Clinic added successfully!",
                error: "Failed to add clinic.",
            });

            return (await res).data;
        } catch (error) {
            toast.error(error?.response?.data?.message || "An error occurred");
            return rejectWithValue(
                error.response ? error.response.data : error.message
            );
        }
    }
);
// Get Doctors (Fetch Doctors for SuperAdmin)
export const getDoctors = createAsyncThunk(
    'superadmin/getDoctors',
    async (clinicId, { rejectWithValue }) => {
        try {
            const clinic_id = clinicId;
            const response = await axiosInstance.get(`/user/getDoctors/${clinic_id}`);
            // console.log("inside the superAdminSlice>>>",response.data.doctors);
            toast.success('Doctors fetched successfully!');
            return response.data.doctors; // Assuming the response structure
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error fetching doctors');
            return rejectWithValue(error.response?.data?.message || 'Error fetching doctors');
        }
    }
);
const superadminSlice = createSlice({
    name: "superadmin",
    initialState: {
        clinics: [],
        doctors: [],
        // loading: false, // Flag to show loading state
        status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addClinic.pending, (state) => {
                state.status = "loading";
            })
            .addCase(addClinic.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.clinics.push(action.payload);
            })
            .addCase(addClinic.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            // Get Doctors
            .addCase(getDoctors.pending, (state) => {
                state.loading = true;
            })
            .addCase(getDoctors.fulfilled, (state, action) => {
                state.loading = false;
                // state.doctors = action.payload;
                state.doctors = action.payload;
            })
            .addCase(getDoctors.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

    },
});

export default superadminSlice.reducer;
