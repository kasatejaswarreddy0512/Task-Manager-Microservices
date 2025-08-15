import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api, BASE_URL, setAuthHeader } from "../APi/Api";

// ---------------------- FETCH ALL TASKS ----------------------
export const fetchTasks = createAsyncThunk("task/fetchTasks", async ({ status }) => {
  setAuthHeader(localStorage.getItem("jwt"), api);
  try {
    const { data } = await api.get(`${BASE_URL}/api/task/allTask`, { params: { status } });
    console.log("fetch tasks:", data);
    return data;
  } catch (error) {
    console.error("fetchTasks error:", error);
    throw Error(error.response?.data?.error || "Failed to fetch tasks");
  }
});

// ---------------------- FETCH USER TASKS ----------------------
export const fetchUsersTasks = createAsyncThunk("task/fetchUsersTasks", async ({ status }) => {
  setAuthHeader(localStorage.getItem("jwt"), api);
  try {
    const { data } = await api.get(`${BASE_URL}/api/task/user`, { params: { status } });
    console.log("fetch users tasks:", data);
    return data;
  } catch (error) {
    console.error("fetchUsersTasks error:", error);
    throw Error(error.response?.data?.error || "Failed to fetch user tasks");
  }
});

// ---------------------- FETCH TASK BY ID ----------------------
export const fetchTaskById = createAsyncThunk("task/fetchTaskById", async (taskId) => {
  setAuthHeader(localStorage.getItem("jwt"), api);
  try {
    const { data } = await api.get(`${BASE_URL}/api/task/${taskId}`);
    // console.log("fetch task by ID:", data);
    return data;
  } catch (error) {
    console.error("fetchTaskById error:", error);
    throw Error(error.response?.data?.error || "Failed to fetch task by ID");
  }
});

// ---------------------- CREATE TASK ----------------------
export const createtask = createAsyncThunk("task/createTask", async (taskData) => {
  setAuthHeader(localStorage.getItem("jwt"), api);
  try {
    const { data } = await api.post(`${BASE_URL}/api/task/create`, taskData);
    console.log("Created Task:", data);
    return data;
  } catch (error) {
    console.error("createtask error:", error);
    throw Error(error.response?.data?.error || "Failed to create task");
  }
});

// ---------------------- UPDATE TASK ----------------------
export const updateTask = createAsyncThunk("task/updateTask", async ({ id, updatedTaskData }) => {
  setAuthHeader(localStorage.getItem("jwt"), api);
  try {
    const { data } = await api.put(`${BASE_URL}/api/task/${id}`, updatedTaskData);
    console.log("Updated Task:", data);
    return data;
  } catch (error) {
    console.error("updateTask error:", error);
    throw Error(error.response?.data?.error || "Failed to update task");
  }
});

// ---------------------- ASSIGN TASK TO USER ----------------------
export const assinedTaskToUser = createAsyncThunk("task/assinedTaskToUser", async ({ taskId, userId }) => {
  setAuthHeader(localStorage.getItem("jwt"), api);
  try {
    const { data } = await api.put(`${BASE_URL}/api/task/${taskId}/user/${userId}/assigned`);
    console.log("Assigned Task To User:", data);
    return data;
  } catch (error) {
    console.error("assinedTaskToUser error:", error);
    throw Error(error.response?.data?.error || "Failed to assign task");
  }
});

// ---------------------- DELETE TASK ----------------------
export const deleteTask = createAsyncThunk("task/deleteTask", async ({ taskId }) => {
  setAuthHeader(localStorage.getItem("jwt"), api);
  try {
    await api.delete(`${BASE_URL}/api/task/${taskId}`);
    console.log("Task Deleted Successfully");
    return taskId;
  } catch (error) {
    console.error("deleteTask error:", error);
    throw Error(error.response?.data?.error || "Failed to delete task");
  }
});

// ---------------------- SLICE ----------------------
const taskSlice = createSlice({
  name: "task",
  initialState: {
    tasks: [],
    usersTask: [],
    taskDetails: null,
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH TASKS
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // FETCH USER TASKS
      .addCase(fetchUsersTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsersTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.usersTask = action.payload;
      })
      .addCase(fetchUsersTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // FETCH TASK BY ID
      .addCase(fetchTaskById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTaskById.fulfilled, (state, action) => {
        state.loading = false;
        state.taskDetails = action.payload;

        // also update in tasks if exists
        const index = state.tasks.findIndex((task) => task.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(fetchTaskById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // CREATE TASK
      .addCase(createtask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createtask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks.push(action.payload);
      })
      .addCase(createtask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // UPDATE TASK
      .addCase(updateTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = state.tasks.map((task) =>
          task.id === action.payload.id ? { ...task, ...action.payload } : task
        );
      })

      // ASSIGN TASK TO USER
      .addCase(assinedTaskToUser.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = state.tasks.map((task) =>
          task.id === action.payload.id ? { ...task, ...action.payload } : task
        );
      })

      // DELETE TASK
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      });
  }
});

export default taskSlice.reducer;
