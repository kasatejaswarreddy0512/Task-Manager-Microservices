import React from "react";
import "./TaskCard.css";
import { IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import UserList from "../UserList";
import SubmissionList from "../SubmissionList";
import EditTaskCard from "../EditTaskCard";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask } from "../../Redux ToolKit/TaskSlice";
import { useLocation, useNavigate } from "react-router-dom";
import SubmitFormModel from "../SubmitFormModel";

const TaskCard = ({ item }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ Get auth slice directly instead of the whole store
  const auth = useSelector((store) => store.auth);
  const role = auth?.user?.role || ""; // ✅ fallback to empty string

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // -------------------- User List --------------------
  const [openUserList, setOpenUserList] = React.useState(false);
  const handleCloseUserList = () => setOpenUserList(false);
  const handleOpenUserList = () => {
    const updatedParams = new URLSearchParams(location.search);
    updatedParams.set("taskId", encodeURIComponent(item.id));
    navigate(`/?${updatedParams.toString()}`);
    setOpenUserList(true);
    handleMenuClose();
  };

  // -------------------- Submission List --------------------
  const [openSubmissionList, setOpenSubmissionList] = React.useState(false);
  const handleCloseSubmissionList = () => setOpenSubmissionList(false);
  const handleOpenSubmissionList = () => {
    const updatedParams = new URLSearchParams(location.search);
    updatedParams.set("taskId", encodeURIComponent(item.id));
    navigate(`/?${updatedParams.toString()}`);
    setOpenSubmissionList(true);
    handleMenuClose();
  };

  // -------------------- Edit Task --------------------
  const [openEditTask, setOpenEditTask] = React.useState(false);
  const handleCloseEditTask = () => setOpenEditTask(false);
  const handleOpenUpdateTaskModel = () => {
    const updatedParams = new URLSearchParams(location.search);
    updatedParams.set("taskId", encodeURIComponent(item.id));
    navigate(`/?${updatedParams.toString()}`);
    setOpenEditTask(true);
    handleMenuClose();
  };

  const handleDeleteTask = () => {
    dispatch(deleteTask({ taskId: item.id }));
    window.location.reload();
    handleMenuClose();
  };

  // -------------------- Submit Form --------------------
  const [openSubmitFormModel, setOpenSubmitFormModel] = React.useState(false);
  const handleCloseSubmitFormModel = () => setOpenSubmitFormModel(false);
  const handleOpenSubmitFormModel = () => {
    const updatedParams = new URLSearchParams(location.search);
    updatedParams.set("taskId", encodeURIComponent(item.id));
    navigate(`/?${updatedParams.toString()}`);
    setOpenSubmitFormModel(true);
    handleMenuClose();
  };

  console.log("User role from Redux:", role); // ✅ Debug check

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
          {role === "ADMIN" && (
            <>
              <MenuItem onClick={handleOpenUserList}>Assigned User</MenuItem>
              <MenuItem onClick={handleOpenSubmissionList}>
                See Submissions
              </MenuItem>
              <MenuItem onClick={handleOpenUpdateTaskModel}>Edit</MenuItem>
              <MenuItem onClick={handleDeleteTask}>Delete</MenuItem>
            </>
          )}

          {role === "USER" && (
            <>
              <MenuItem onClick={handleOpenSubmitFormModel}>Submit</MenuItem>
            </>
          )}
        </Menu>
      </div>

      {/* Left Section */}
      <div className="lg:flex gap-4 items-center w-[90%] lg:w-[70%] space-y-2 lg:space-y-0">
        <div className="lg:w-[12rem] lg:h-[8rem] image">
          <img
            src={item.image}
            alt="Task"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        <div className="space-y-5">
          <div className="space-y-2">
            <h1 className="font-bold text-lg">{item.title}</h1>
            <p className="text-gray-500 text-sm">{item.description}</p>
          </div>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-2 items-center">
            {item.tags.map((tag) => (
              <span key={tag} className="py-1 px-5 rounded-full techStack">
                {tag}
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
      <EditTaskCard
        item={item}
        open={openEditTask}
        handleClose={handleCloseEditTask}
      />
      <SubmitFormModel
        open={openSubmitFormModel}
        handleClose={handleCloseSubmitFormModel}
      />
    </div>
  );
};

export default TaskCard;
