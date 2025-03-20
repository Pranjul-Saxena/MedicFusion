import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

import axiosInstance from "../../Helpers/axiosInstance"

const initialState = {
    isLoggedIn: localStorage.getItem('isLoggedIn') || false,
    role: localStorage.getItem('role') || "",
    // clinic_id: localStorage.getItem('clinic_id') || "",
    data: localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data')) : {}
};
// export const createAccount = createAsyncThunk("/auth/signup", async (data) => {
//     try {
//         const res = axiosInstance.post("user/register", data);
//         toast.promise(res, {
//             loading: "Wait! creating your account",
//             success: (data) => {
//                 return data?.data?.message;
//             },
//             error: "Failed to create account"
//         });
//         return (await res).data;
//     } catch (error) {
//         toast.error(error?.response?.data?.message);
//     }
// })
export const login = createAsyncThunk("/user/login", async (data) => {
    try {
        const res = axiosInstance.post("user/login", data);
        console.log("inside the thunk",res.data);
        toast.promise(res, {
            loading: "Wait! authentication in progress...",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to log in"
        });
        return (await res).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
});
export const logout = createAsyncThunk("/user/logout", async () => {
    try {
        const res = axiosInstance.post("user/logout");
        toast.promise(res, {
            loading: "Logging out...",
            success: "Logged out successfully",
            error: "Failed to log out",
        });
        return (await res).data;
    } catch (error) {
        toast.error(error?.response?.data?.message || "Logout error");
        throw error;
    }
});
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                localStorage.setItem("data", JSON.stringify(action?.payload?.user || {}));
                localStorage.setItem("isLoggedIn", true);
                localStorage.setItem("role", action?.payload?.user?.user_type);
                state.isLoggedIn = true;
                state.data = action?.payload?.user;
                console.log("inside the builder>>>",state.data);
                state.role = action?.payload?.user?.user_type;
            })
            .addCase(logout.fulfilled, (state) => {
                localStorage.clear();
                state.data = {};
                state.isLoggedIn = false;
                state.user_type = "";
            })
        // .addCase(getUserData.fulfilled, (state, action) => {
        //     if (!action?.payload?.user) return;
        //     localStorage.setItem("data", JSON.stringify(action?.payload?.user));
        //     localStorage.setItem("isLoggedIn", true);
        //     localStorage.setItem("role", action?.payload?.user?.role);
        //     state.isLoggedIn = true;
        //     state.data = action?.payload?.user;
        //     state.role = action?.payload?.user?.role
        // });
    }
});

// export const {} = authSlice.actions;
export default authSlice.reducer;