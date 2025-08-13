import React, { useState } from "react";
import "./SideBar.css";
import { Avatar, Button } from "@mui/material";
import CreateTask from "../Task/CreateTask";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux ToolKit/AuthSlice";

const SideBar = () => {
  const menu = [
    { name: "HOME", value: "Home", role: ["ADMIN", "USER"] },
    { name: "DONE", value: "DONE", role: ["ADMIN", "USER"] },
    { name: "ASSIGNED", value: "ASSIGNED", role: ["ADMIN"] },
    { name: "NOT ASSIGNED", value: "PENDING", role: ["ADMIN"] },
    { name: "CREATE NEW TASK", value: "CREATE NEW TASK", role: ["ADMIN"] },
    { name: "NOTIFICATION", value: "NOTIFICATION", role: ["USER"] },
  ];

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Get role from Redux auth state (or localStorage if you store it there)
  const { auth } = useSelector((store) => store);
  const role = auth.user?.role || "USER"; // fallback to USER if undefined

  const [activeMenu, setActiveMenu] = useState("HOME");

  const [openCreateTaskForm, setOpenCreateTaskForm] = useState(false);
  const handleOpenCreateTaskForm = () => setOpenCreateTaskForm(true);
  const handleCloseCreateTaskForm = () => setOpenCreateTaskForm(false);

  const handleMenuChange = (item) => {
    const updatedParams = new URLSearchParams(location.search);

    if (item.name === "CREATE NEW TASK") {
      handleOpenCreateTaskForm();
    } else if (item.name === "HOME") {
      updatedParams.delete("filter");
      const queryString = updatedParams.toString();
      const updatePath = queryString ? `/?${queryString}` : "/";
      navigate(updatePath); // ✅ Navigate to root, not current path
    } else {
      updatedParams.set("filter", encodeURIComponent(item.value));
      navigate(`/?${updatedParams.toString()}`); // ✅ Always base route
    }

    setActiveMenu(item.name);
  };

  const handleLogout = () => {
    dispatch(logout());
    console.log(" LogOut Successfully...!");
  };

  return (
    <>
      <div className="card min-h-[85vh] w-[20vw] ml-5 flex flex-col justify-center items-center">
        <Avatar
          src="https://4.bp.blogspot.com/-LLst6-jf4FA/VeRJjUNrFsI/AAAAAAAADIQ/W9FCba0BQZA/s1600/prabhas1.jpg"
          sx={{
            // backgroundColor: "#c24dd0",
            // color: "white",

            width: "8rem",
            height: "8rem",
            marginBottom: "16px",
          }}
          className="border-2 border-gray-800 mb-6"
        />

        <div className="flex flex-col w-full  space-y-2 px-4">
          {menu
            .filter((item) => item.role.includes(role))
            .map((item, index) => (
              <p
                onClick={() => handleMenuChange(item)}
                key={index}
                className={`text-sm text-center mt-8 border  py-2 rounded-full cursor-pointer ${
                  activeMenu === item.name ? "activeMenuItem" : "menuItem"
                }`}
              >
                {item.name}
              </p>
            ))}

          <Button
            onClick={handleLogout}
            sx={{ padding: "6px", borderRadius: "60px", marginTop: "6px" }}
            className="logOut"
          >
            Log Out
          </Button>
        </div>
      </div>

      <CreateTask
        open={openCreateTaskForm}
        handleClose={handleCloseCreateTaskForm}
      />
    </>
  );
};

export default SideBar;
