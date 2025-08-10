import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./AuthSlice";
import TaskSlice from "./TaskSlice";
import SubmissionSlicelice from "./SubmissionSlice"

const rootReducer = combineReducers({
  auth: authReducer,
  task: TaskSlice,
  submisson: SubmissionSlicelice
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware() // ✅ thunk is already included
});

export default store;




