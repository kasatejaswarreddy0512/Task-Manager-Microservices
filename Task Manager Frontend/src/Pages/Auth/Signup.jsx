import {
  TextField,
  Button,
  InputLabel,
  FormControl,
  MenuItem,
  Select,
} from "@mui/material";
import React, { useState } from "react";

const Signup = ({ togglePannel }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRoleChange = (e) => {
    setFormData({ ...formData, role: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signup form:", formData);
  };

  return (
    <div className="flex justify-center items-center w-full">
      <div
        className="flex flex-col items-center p-6 rounded-lg shadow-lg"
        style={{ width: "400px" }}
      >
        <h1 className="text-lg font-bold text-center pb-8 text-white">
          Register
        </h1>

        <form
          className="space-y-4 flex flex-col items-center"
          onSubmit={handleSubmit}
        >
          {/* Full Name Field */}
          <TextField
            label="Full name"
            name="fullName"
            type="text"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter your Full Name..."
            required
            sx={textFieldStyles}
          />

          {/* Email Field */}
          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your Email..."
            required
            sx={textFieldStyles}
          />

          {/* Password Field */}
          <TextField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your Password..."
            required
            sx={textFieldStyles}
          />

          {/* Role Selection */}
          <FormControl sx={{ width: "380px", mb: 2 }}>
            <InputLabel sx={{ color: "white" }}>Role</InputLabel>
            <Select
              value={formData.role}
              onChange={handleRoleChange}
              sx={{
                color: "white",
                "& .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "white",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "white",
                },
                "& .MuiSvgIcon-root": { color: "white" }, // Dropdown arrow color
              }}
            >
              <MenuItem value={"ADMIN"}>ADMIN</MenuItem>
              <MenuItem value={"USER"}>USER</MenuItem>
            </Select>
          </FormControl>

          {/* Register Button */}
          <Button
            sx={{
              height: "50px",
              width: "380px",
              backgroundColor: "#1976d2",
              color: "white",
              textTransform: "none",
              borderRadius: "8px",
              "&:hover": { backgroundColor: "#1565c0" },
            }}
            type="submit"
            className="customBtn"
          >
            Register
          </Button>
        </form>

        <div className="pt-4 text-white">
          <span>Already have an account? </span>
          <Button
            onClick={togglePannel}
            sx={{ textTransform: "none", color: "#1976d2" }}
          >
            Sign In
          </Button>
        </div>
      </div>
    </div>
  );
};

/* ✅ Shared input styles */
const textFieldStyles = {
  mb: 2,
  width: "380px",
  "& .MuiInputBase-input": { color: "white" },
  "& .MuiInputLabel-root": { color: "white" },
  "& .MuiOutlinedInput-root fieldset": { borderColor: "white" },
  "&:hover .MuiOutlinedInput-root fieldset": { borderColor: "white" },
  "&.Mui-focused .MuiOutlinedInput-root fieldset": { borderColor: "white" },
};

export default Signup;
