import React from "react";
import "./SideBar.css";
import { Avatar } from "@mui/material";

const SideBar = () => {
  const menu = [
    { name: "Home", value: "Home", role: ["ADMIN", "USER"] },
    { name: "DONE", value: "DONE", role: ["ADMIN", "USER"] },
    { name: "Assigned", value: "Assigned", role: ["ADMIN"] },
    { name: "Not Assigned", value: "Not Assigned", role: ["ADMIN"] },
    { name: "Create New task", value: "Create New task", role: ["ADMIN"] },
    { name: "Notification", value: "Notification", role: ["USER"] },
    { name: "Log Out", value: "Log Out", role: ["ADMIN", "USER"] },
  ];

  return (
    <div className="card min-h-[85vh] flex flex-col justify-center fixed w-[20vw]">
      <div className="space-y-4 h-full">
        <Avatar
          sx={{ backgroundColor: "#c24dd0", width: "8rem", height: "8rem" }}
          className="border-2 border-red-500 mx-auto"
        >
          T
        </Avatar>
      </div>
      <button className=" btn bg-[#c24dd0] text-white p-2 w-full mt-5">
        Home
      </button>
      <button className="btn bg-[#c24dd0] text-white p-2 w-full mt-5">
        DONE
      </button>
      <button className="btn bg-[#c24dd0] text-white p-2 w-full mt-5">
        Not Assigned
      </button>
      <button className="btn bg-[#c24dd0] text-white p-2 w-full mt-5">
        In Progress
      </button>
      <button className="btn bg-[#c24dd0] text-white p-2 w-full mt-5">
        Completed
      </button>
      <button className="btn bg-[#c24dd0] text-white p-2 w-full mt-5">
        Log Out
      </button>
    </div>
  );
};

export default SideBar;
