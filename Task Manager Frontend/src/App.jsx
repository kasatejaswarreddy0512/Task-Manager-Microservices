import { ThemeProvider } from "@mui/material";
import React, { useEffect } from "react";
import DarkTheme from "./themes/DarkTheme";
import NavBar from "./Pages/NavBar";
import Home from "./Pages/Home";
import Auth from "./Pages/Auth/Auth";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "./Redux ToolKit/TaskSlice";
import { getUserProfile } from "./Redux ToolKit/AuthSlice";

const App = () => {
  const user = true;

  const dispatch = useDispatch();
  const { task, auth } = useSelector((store) => store);

  useEffect(() => {
    dispatch(fetchTasks({}));
    dispatch(getUserProfile(auth.jwt || localStorage.getItem("jwt")));
  }, [auth.jwt]);

  return (
    <div>
      {/* <ThemeProvider theme={DarkTheme}> task manager</ThemeProvider> */}
      {auth.user ? (
        <div>
          <NavBar />
          <Home />
        </div>
      ) : (
        <div>
          <Auth />
        </div>
      )}
    </div>
  );
};

export default App;
