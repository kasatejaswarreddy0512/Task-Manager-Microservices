import React from "react";
import "./TaskCard.css";
import { IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import UserList from "../UserList";
import SubmissionList from "../SubmissionList";
import EditTaskCard from "../EditTaskCard";

const roles = "ADMIN";

const TaskCard = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // User List
  const [openUserList, setOpenUserList] = React.useState(false);
  const handleCloseUserList = () => setOpenUserList(false);
  const handleOpenUserList = () => {
    setOpenUserList(true);
    handleMenuClose();
  };

  // Submission List
  const [openSubmissionList, setOpenSubmissionList] = React.useState(false);
  const handleCloseSubmissionList = () => setOpenSubmissionList(false);
  const handleOpenSubmissionList = () => {
    setOpenSubmissionList(true);
    handleMenuClose();
  };

  // Edit Task
  const [openEditTask, setOpenEditTask] = React.useState(false);
  const handleCloseEditTask = () => setOpenEditTask(false);
  const handleOpenUpdateTaskModel = () => {
    setOpenEditTask(true);
    handleMenuClose();
  };

  const handleDeleteTask = () => {
    handleMenuClose();
  };

  return (
    <div className="card relative p-4 border rounded-lg shadow-md">
      {/* Icon Button in top-right corner */}
      <div className="absolute top-2 right-2">
        <IconButton
          id="basic-button"
          aria-controls={openMenu ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={openMenu ? "true" : undefined}
          onClick={handleMenuClick}
        >
          <MoreVertIcon className="text-white" />
        </IconButton>

        {/* Dropdown Menu */}
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={openMenu}
          onClose={handleMenuClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          {roles === "ADMIN" && (
            <>
              <MenuItem onClick={handleOpenUserList}>Assigned User</MenuItem>
              <MenuItem onClick={handleOpenSubmissionList}>
                See Submissions
              </MenuItem>
              <MenuItem onClick={handleOpenUpdateTaskModel}>Edit</MenuItem>
              <MenuItem onClick={handleDeleteTask}>Delete</MenuItem>
            </>
          )}
        </Menu>
      </div>

      {/* Left Section */}
      <div className="lg:flex gap-5 items-center w-[90%] lg:w-[70%] space-y-2 lg:space-y-0">
        <div className="lg:w-[7rem] lg:h-[7rem]">
          <img
            src="https://tse1.mm.bing.net/th/id/OIP.B89JFviebUWHqx55l28wEQHaE7?rs=1&pid=ImgDetMain&o=7&rm=3"
            alt="Car"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        <div className="space-y-5">
          <div className="space-y-2">
            <h1 className="font-bold text-lg">Car Rental Website</h1>
            <p className="text-gray-500 text-sm">
              Uses the latest frameworks and technologies to build this website.
            </p>
          </div>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-2 items-center">
            {[1, 1, 1, 1].map((_, index) => (
              <span key={index} className="py-1 px-5 rounded-full techStack">
                Angular
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Modals */}
      <UserList open={openUserList} handleClose={handleCloseUserList} />
      <SubmissionList
        open={openSubmissionList}
        handleClose={handleCloseSubmissionList}
      />
      <EditTaskCard open={openEditTask} handleClose={handleCloseEditTask} />
    </div>
  );
};

export default TaskCard;
