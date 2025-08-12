import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./AuthSlice";
import taskReducer from "./TaskSlice";
import submissionReducer from "./SubmissionSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  task: taskReducer,
  submission: submissionReducer, // ✅ matches slice name
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
