import { Avatar } from "@mui/material";
import React from "react";
import "./NavBar.css";
import Auth from "./Auth/Auth";
import { useSelector } from "react-redux";

const NavBar = () => {
  const { task, auth } = useSelector((store) => store);

  return (
    <div className="container z-10 sticky left-0 right-0 top-0 py-3 px-5 flex justify-between items-center shadow-md w-full">
      <p className="text-lg font-bold">Task Manager</p>

      <div className="flex items-center gap-5">
        <p>{auth.user.fullName}</p>

        <Avatar sx={{ backgroundColor: "#c24dd0" }}>T</Avatar>
      </div>
    </div>
  );
};

export default NavBar;
