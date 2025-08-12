import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Grid, TextField, Autocomplete, Button } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Padding } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { fetchTaskById, updateTask } from "../Redux ToolKit/TaskSlice";
import { useLocation } from "react-router-dom";
import { submitTask } from "../Redux ToolKit/SubmissionSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",
  color: "black",
  // border: "2px solid #000",
  boxShadow: 24,
  minHeight: 280, // ✅ Start height but allow auto-grow
  p: 4,
  borderRadius: "10px",
  display: "flex",
  flexDirection: "column",
  gap: 2,
  outline: "none",
};

export default function SubmitFormModel({ item, handleClose, open }) {
  const dispatch = useDispatch();
  // const { task } = useSelector((store) => store);
  const taskDetails = useSelector((store) => store.task.taskDetails);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const taskId = queryParams.get("taskId");
  const [formData, setFormData] = React.useState({
    githubLink: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const inputStyle = {
    height: "50px",
    width: "340px",
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(submitTask({ taskId, githubLink: formData.githubLink }));
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
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* Title Field */}
            <Grid item xs={12}>
              <TextField
                label="Github Link"
                fullWidth
                name="githubLink"
                value={formData.githubLink}
                onChange={handleChange}
                InputLabelProps={{ style: { color: "black" } }}
                InputProps={{ style: { color: "black", ...inputStyle } }}
              />
            </Grid>

            {/* Description Field */}
            <Grid item xs={12}>
              <TextField
                label="Description"
                fullWidth
                multiline
                minRows={2}
                name="description"
                value={formData.description}
                onChange={handleChange}
                InputLabelProps={{ style: { color: "black" } }}
                InputProps={{
                  style: {
                    color: "black",
                    minHeight: "50px",
                    width: "340px", // ✅ Same as tags field
                  },
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                fullWidth
                sx={{
                  height: "50px", // ✅ Match input height
                  width: "340px", // ✅ Match input width
                  backgroundColor: "#1976d2",
                  color: "white",
                  textTransform: "none",
                  borderRadius: "8px",
                  "&:hover": { backgroundColor: "#1565c0" },
                }}
                type="submit"
                className="customBtn"
                onClick={handleSubmit}
              >
                submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Modal>
  );
}
