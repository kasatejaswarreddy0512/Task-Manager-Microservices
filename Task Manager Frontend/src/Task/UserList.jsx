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

const tasks = [1, 2, 3, 4, 5];

export default function UserList({ handleClose, open }) {
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

        <List>
          {tasks.map((item, index) => (
            <div key={item}>
              <ListItem
                secondaryAction={
                  <Button
                    className="customBtn"
                    variant="contained"
                    size="small"
                  >
                    Select
                  </Button>
                }
              >
                <ListItemAvatar>
                  <Avatar src="https://tse1.mm.bing.net/th/id/OIP.B89JFviebUWHqx55l28wEQHaE7?rs=1&pid=ImgDetMain&o=7&rm=3" />
                </ListItemAvatar>
                <ListItemText
                  primary="Code with Reddy"
                  secondary="@Code_With_Reddy"
                  primaryTypographyProps={{ style: { color: "white" } }}
                  secondaryTypographyProps={{ style: { color: "lightgray" } }}
                />
              </ListItem>

              {/* Divider between users */}
              {index < tasks.length - 1 && <Divider sx={{ bgcolor: "gray" }} />}
            </div>
          ))}
        </List>
      </Box>
    </Modal>
  );
}
