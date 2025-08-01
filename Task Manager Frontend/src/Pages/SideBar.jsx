import React, { useState } from "react";
import "./SideBar.css";
import { Avatar, Button } from "@mui/material";
import CreateTask from "../Task/CreateTask";

const SideBar = () => {
  const menu = [
    { name: "HOME", value: "Home", role: ["ADMIN", "USER"] },
    { name: "DONE", value: "DONE", role: ["ADMIN", "USER"] },
    { name: "ASSIGNED", value: "ASSIGNED", role: ["ADMIN"] },
    { name: "NOT ASSIGNED", value: "NOT ASSIGNED", role: ["ADMIN"] },
    { name: "CREATE NEW TASK", value: "CREATE NEW TASK", role: ["ADMIN"] },
    { name: "NOTIFICATION", value: "NOTIFICATION", role: ["USER"] },
  ];

  const role = "ADMIN";
  const [activeMenu, setActiveMenu] = useState("HOME");

  // Create Task Modal State
  const [openCreateTaskForm, setOpenCreateTaskForm] = useState(false);
  const handleOpenCreateTaskForm = () => setOpenCreateTaskForm(true);
  const handleCloseCreateTaskForm = () => setOpenCreateTaskForm(false);

  // Menu Change Handler
  const handleMenuChange = (item) => {
    if (item.name === "CREATE NEW TASK") {
      handleOpenCreateTaskForm();
    }
    setActiveMenu(item.name);
  };

  return (
    <>
      <div className="card min-h-[85vh] w-[20vw] flex flex-col justify-center items-center">
        {/* Avatar */}
        <Avatar
          src="https://learntech.in/wp-content/uploads/2015/05/logo-design.jpg"
          sx={{ backgroundColor: "#c24dd0", width: "8rem", height: "8rem" }}
          className="border-2 border-red-500 mb-6"
        />

        {/* Menu Items */}
        <div className="flex flex-col w-full space-y-2 px-4">
          {menu
            .filter((item) => item.role.includes(role))
            .map((item, index) => (
              <p
                onClick={() => handleMenuChange(item)}
                key={index}
                className={`text-sm text-center text-white mt-2 border border-gray-300 py-2 rounded-full cursor-pointer ${
                  activeMenu === item.name ? "activeMenuItem" : "menuItem"
                }`}
              >
                {item.name}
              </p>
            ))}

          {/* Logout Button */}
          <Button
            onClick={() => console.log("Log Out Successfully")}
            sx={{ padding: "6px", borderRadius: "60px", marginTop: "6px" }}
            className="logOut"
          >
            Log Out
          </Button>
        </div>
      </div>

      {/* Create Task Modal */}
      <CreateTask
        open={openCreateTaskForm}
        handleClose={handleCloseCreateTaskForm}
      />
    </>
  );
};

export default SideBar;
