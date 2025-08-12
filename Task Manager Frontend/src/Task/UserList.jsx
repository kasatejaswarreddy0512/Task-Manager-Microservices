import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getUserList } from "../Redux ToolKit/AuthSlice";
import { assinedTaskToUser } from "../Redux ToolKit/TaskSlice";
import { useLocation } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "black",
  boxShadow: 24,
  outline: "none",
  p: 2,
  color: "white",
};

export default function UserList({ handleClose, open }) {
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const taskId = queryParams.get("taskId");

  React.useEffect(() => {
    dispatch(getUserList(localStorage.getItem("jwt")));
  }, [dispatch]);

  const handleAssignedtask = (item) => {
    dispatch(assinedTaskToUser({ userId: item.id, taskId: taskId }));
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          gutterBottom
        >
          Assigned Users
        </Typography>

        {/* Scrollable list */}
        <List
          sx={{
            maxHeight: "50vh",
            overflowY: "auto",
            scrollbarWidth: "thin", // Firefox
            scrollbarColor: "#888 #000", // Firefox (thumb, track)
            "&::-webkit-scrollbar": {
              width: "6px",
            },
            "&::-webkit-scrollbar-track": {
              background: "black",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#888",
              borderRadius: "4px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              background: "#555",
            },
          }}
        >
          {auth.users.map((item, index) => (
            <React.Fragment key={index}>
              <ListItem
                secondaryAction={
                  <Button
                    className="customBtn"
                    variant="contained"
                    size="small"
                    onClick={() => handleAssignedtask(item)}
                  >
                    Select
                  </Button>
                }
              >
                <ListItemAvatar>
                  <Avatar src="https://tse1.mm.bing.net/th/id/OIP.B89JFviebUWHqx55l28wEQHaE7?rs=1&pid=ImgDetMain&o=7&rm=3" />
                </ListItemAvatar>
                <ListItemText
                  primary={item.fullName}
                  secondary={`@${item.fullName
                    .split(" ")
                    .join("_")
                    .toLowerCase()}`}
                  primaryTypographyProps={{ style: { color: "white" } }}
                  secondaryTypographyProps={{ style: { color: "lightgray" } }}
                />
              </ListItem>
              {index < auth.users.length - 1 && (
                <Divider sx={{ bgcolor: "gray" }} />
              )}
            </React.Fragment>
          ))}
        </List>
      </Box>
    </Modal>
  );
}
