import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"; // ✅ Added createSlice
import { api, BASE_URL, setAuthHeader } from "../APi/Api";

// ---------------------- SUBMIT TASK ----------------------
export const submitTask = createAsyncThunk(
  "submissions/submitTask",
  async ({ taskId, githubLink }) => {
    setAuthHeader(localStorage.getItem("jwt"), api);

    try {
      const { data } = await api.post(
        `api/submission/submit?taskId=${taskId}&githubLink=${encodeURIComponent(githubLink)}`
      );
      return data;
    } catch (error) {
      console.error("Error submitting task:", error.response?.data || error.message);
      throw error;
    }
  }
);



// ---------------------- FETCH ALL SUBMISSIONS ----------------------
export const fetchAllSubmissions = createAsyncThunk("submissions/fetchAllSubmissions", async () => {
  setAuthHeader(localStorage.getItem("jwt"), api); // ✅ Fixed incorrect arguments

  try {
    const { data } = await api.get(`api/submission/allSubmission`);
    console.log("Fetch all Submissions:", data);
    return data;
  } catch (error) {
    console.log("catch", error);
    throw Error(error.response?.data?.error || "Failed to fetch All Submissions");
  }
});

// ---------------------- FETCH SUBMISSION BY TASK ID ----------------------
export const fetchSubmissionByTaskId = createAsyncThunk(
  "submissions/fetchByTaskId",
  async ({ taskId }, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`${BASE_URL}/api/submission/task/${taskId}`);
      console.log("✅ API Response for Task:", taskId, data);
      return data;
    } catch (error) {
      console.error("❌ Error fetching submissions:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// ---------------------- ACCEPT OR DECLINE SUBMISSION ----------------------
export const acceptDeclineSubmission = createAsyncThunk("submissions/acceptDeclineSubmission", async ({ id, status }) => {
  setAuthHeader(localStorage.getItem("jwt"), api);

  try {
    const { data } = await api.put(`api/submission/accept/${id}?status=${status}`);
    console.log("Accept Task:", data);
    return data;
  } catch (error) {
    console.log("catch", error);
    throw Error(error.response?.data?.error || "Failed to Accept or Decline Submission");
  }
});

// ---------------------- SLICE ----------------------
const submissionSlice = createSlice({
  name: "submission",
  initialState: {
    submissions: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // SUBMIT TASK
      .addCase(submitTask.pending, (state) => {
        state.status = "loading";
      })
      .addCase(submitTask.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.submissions.push(action.payload);
      })
      .addCase(submitTask.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // FETCH ALL SUBMISSIONS
      .addCase(fetchAllSubmissions.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.submissions = action.payload;
      })
      .addCase(fetchAllSubmissions.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // FETCH SUBMISSION BY TASK ID
     .addCase(fetchSubmissionByTaskId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
     .addCase(fetchSubmissionByTaskId.fulfilled, (state, action) => {
        state.loading = false;

        let payload = action.payload;

        // Ensure payload is always an array
        if (!Array.isArray(payload)) {
          payload = payload ? [payload] : [];
        }

        // Remove null/undefined entries
        state.submissions = payload.filter(Boolean);
      })
      .addCase(fetchSubmissionByTaskId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch submissions";
      })

      // ACCEPT OR DECLINE SUBMISSION
      .addCase(acceptDeclineSubmission.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.submissions = state.submissions.map((item) =>
          item.id !== action.payload.id ? item : action.payload 
        );
      });
  },
});

export default submissionSlice.reducer;






























// import { createAsyncThunk } from "@reduxjs/toolkit";
// import { api, setAuthHeader } from "../APi/Api";
// import reducer from "./AuthSlice";

// export const submitTask=createAsyncThunk("submissions/submitTask", async({taskId, githubLink})=>{
//   setAuthHeader(localStorage.getItem("jwt",api))

//   try {
//     const {data}=await api.post(`api/submission ? task_id=${taskId}&github_link=${githubLink}`,{});

//     console.log("Submit Task : ",data);
//     return data;
//   } catch (error) {
//     console.log("catch ", error);
//      throw Error(error.response?.data?.error || "Failed to Submit tasks");
//   }
// })


// export const fetchAllSubmissions=createAsyncThunk("submissions/fetchAllSubmissions", async()=>{
//   setAuthHeader(localStorage.getItem("jwt",api))

//   try {
//     const {data}=await api.get(`api/submission/allSubmission`);

//     console.log("Fetch all Submissions : ",data);
//     return data;
//   } catch (error) {
//     console.log("catch ", error);
//      throw Error(error.response?.data?.error || "Failed to fetch All Submissions");
//   }
// })


// export const fetchSubmissionByTaskId=createAsyncThunk("submissions/fetchSubmissionByTaskId", async({taskId})=>{
//   setAuthHeader(localStorage.getItem("jwt",api))

//   try {
//     const {data}=await api.get(`api/submission/task/${taskId}`);

//     console.log("fetch Task by TaskId : ",data);
//     return data;
//   } catch (error) {
//     console.log("catch ", error);
//      throw Error(error.response?.data?.error || "Failed to fetch Tak By TaskID");
//   }
// })


// export const acceptDeclineSubmission=createAsyncThunk("submissions/acceptDeclineSubmission", async({id, status})=>{
//   setAuthHeader(localStorage.getItem("jwt",api))

//   try {
//     const {data}=await api.put(`api/submission/accept/${id}?status=${status}`);

//     console.log("Accept Task : ",data);
//     return data;
//   } catch (error) {
//     console.log("catch ", error);
//      throw Error(error.response?.data?.error || "Failed to Accept or Decline Submission");
//   }
// })


// const submissionSlice=createSlice({
//   name:"submission",
//   initialState:{
//     submissions:[],
//     status:'idle',
//     error:null,
//   },

//   reducers:{},
//   extraReducers:(builder)=>{
//     builder
//     .addCase(submitTask.pending,(state)=>{
//       state.status='loading';
//     })
//     .addCase(submitTask.fulfilled,(state,action)=>{
//       state.status='succeeded';
//       state.submissions.push(action.payload);
//     })
//       .addCase(submitTask.rejected,(state,action)=>{
//       state.status='failed';
//       state.error=action.error.message;
//     })

//     .addCase(fetchAllSubmissions.fulfilled,(state,action)=>{
//       state.status='succeeded';
//       state.submissions=action.payload;
//     })

//      .addCase(fetchAllSubmissions.rejected,(state,action)=>{
//       state.status='failed';
//       state.error=action.error.message;
//     })
    

//     .addCase(fetchSubmissionByTaskId.fulfilled,(state,action)=>{
//       state.status='succeeded';
//       state.submissions=action.payload;
//     })

  
//       .addCase(acceptDeclineSubmission.fulfilled,(state,action)=>{
//       state.status='succeeded';
//       state.submissions=state.submissions.map((item)=>item.id !== action.payload ? item : action.payload);
//     })
//   }
// })


// export default submissionSlice.reducer;