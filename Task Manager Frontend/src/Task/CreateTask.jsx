import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Grid, TextField, Autocomplete, Button } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Padding } from "@mui/icons-material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",
  color: "black",
  border: "2px solid #000",
  boxShadow: 24,
  minHeight: 400, // ✅ Start height but allow auto-grow
  p: 4,
  borderRadius: "10px",
  display: "flex",
  flexDirection: "column",
  gap: 2,
};

const tags = [
  "Angular",
  "React",
  "Spring Boot",
  "Microservices",
  "Java",
  "Node js",
  "Python",
];

export default function CreateTask({ handleClose, open }) {
  const [formData, setFormData] = React.useState({
    title: "",
    description: "",
    image: "",
    tag: [],
    deadLine: new Date(),
  });

  const [selectedTags, setSelectedTags] = React.useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleTagChange = (event, value) => {
    setSelectedTags(value);
    setFormData({ ...formData, tag: value });
  };

  const inputStyle = {
    height: "50px",
    width: "340px",
  };

  const handleDeadLineChange = () => {
    setFormData({ ...formData, deadLine: new Date() });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { deadLine } = formData;
    console.log("Form data : ", formData, "deadLine :", deadLine);
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
                label="Title"
                fullWidth
                name="title"
                value={formData.title}
                onChange={handleChange}
                InputLabelProps={{ style: { color: "black" } }}
                InputProps={{ style: { color: "black", ...inputStyle } }}
              />
            </Grid>

            {/* Image Field */}
            <Grid item xs={12}>
              <TextField
                label="Image"
                fullWidth
                name="image"
                value={formData.image}
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

            {/* Tags Field */}
            <Grid item xs={12}>
              <Autocomplete
                multiple
                id="multiple-limit-tags"
                options={tags}
                value={selectedTags}
                onChange={handleTagChange}
                getOptionLabel={(option) => option}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    label="Tags"
                    placeholder="Enter tags"
                    InputLabelProps={{ style: { color: "black" } }}
                    InputProps={{
                      ...params.InputProps,
                      style: {
                        color: "black",
                        minHeight: "50px",
                        width: "340px",
                      },
                    }}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  onChange={handleDeadLineChange}
                  renderInput={(params) => <textField {...params} />}
                  label="Dead Line"
                  slotProps={{
                    textField: {
                      InputLabelProps: { style: { color: "black" } },
                      InputProps: { style: inputStyle },
                    },
                  }}
                />
              </LocalizationProvider>
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
                Create Task
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Modal>
  );
}
