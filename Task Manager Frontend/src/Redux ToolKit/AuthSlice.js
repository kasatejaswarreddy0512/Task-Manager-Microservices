import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"; // ✅ Added axios import
import { api, BASE_URL, setAuthHeader } from "../APi/Api";

// ---------------------- LOGIN ----------------------
export const login = createAsyncThunk(
  "auth/login", // ✅ changed from "/auth/login" to a valid slice name
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${BASE_URL}/auth/signin`, userData);

      if (data?.token) {
        // ✅ Save JWT token to localStorage
        localStorage.setItem("jwt", data.token);
        console.log("Login successfully...!", data);
        return data;
      } else {
        throw new Error("Token missing in response");
      }
    } catch (error) {
      console.log("Login error:", error);
      return rejectWithValue(
        error.response?.data?.error || error.message || "Login failed"
      );
    }
  }
);

// ---------------------- REGISTER ----------------------
export const register = createAsyncThunk("/auth/register", async (userData, { rejectWithValue }) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/auth/signup`, userData);
    localStorage.setItem("jwt", data.token);
    console.log("Register Successfully..!", data);
    return data;
  } catch (error) {
    console.log("catch error ", error);
    return rejectWithValue(error.response?.data?.error || "Registration failed");
  }
});

// ---------------------- LOGOUT ----------------------
export const logout = createAsyncThunk("auth/logout", async () => {
  try {
    localStorage.clear();
    return true;
  } catch (error) {
    console.log("catch error ", error);
    throw Error(error.response?.data?.error || "Logout failed");
  }
});

// ---------------------- GET USER PROFILE ----------------------
export const getUserProfile = createAsyncThunk(
  "auth/getUserProfile",
  async (jwt, { rejectWithValue }) => {
    try {
      setAuthHeader(jwt); // ✅ fixed: no need to pass 'api'
      const { data } = await api.get("/api/users/profile"); // BASE_URL already set in api instance
      console.log("User Profile Success", data);
      return data;
    } catch (error) {
      console.log("catch error ", error);
      return rejectWithValue(
        error.response?.data?.error || "Failed to fetch user profile"
      );
    }
  }
);

// ---------------------- GET USER LIST ----------------------
export const getUserList = createAsyncThunk("auth/getUserList", async (jwt, { rejectWithValue }) => {
  try {
    setAuthHeader(jwt, api);
    const { data } = await api.get(`${BASE_URL}/api/users`);
    console.log("User List Success", data);
    return data;
  } catch (error) {
    console.log("catch error ", error);
    return rejectWithValue(error.response?.data?.error || "Failed to fetch user list");
  }
});

// ---------------------- SLICE ----------------------
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loggedIn: false,
    loading: false,
    error: null,
    jwt: null,
    users: []
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.jwt = action.payload.jwt;
        state.loggedIn = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // REGISTER
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.jwt = action.payload.jwt;
        state.loggedIn = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // GET USER PROFILE
      .addCase(getUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.loggedIn = true;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // GET USER LIST
      .addCase(getUserList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserList.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getUserList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // LOGOUT
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.jwt = null;
        state.users = [];
        state.loggedIn = false;
        state.error = null;
      });
  }
});

export default authSlice.reducer;
