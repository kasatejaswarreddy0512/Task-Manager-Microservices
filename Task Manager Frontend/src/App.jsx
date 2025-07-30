import { ThemeProvider } from "@mui/material";
import React from "react";
import DarkTheme from "./themes/DarkTheme";
import NavBar from "./Pages/NavBar";
import Home from "./Pages/Home";

const App = () => {
  return (
    <div>
      {/* <ThemeProvider theme={DarkTheme}> task manager</ThemeProvider> */}
      <NavBar />
      <Home />
    </div>
  );
};

export default App;
