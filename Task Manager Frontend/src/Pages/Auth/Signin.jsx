import { TextField, Button } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../Redux ToolKit/AuthSlice";

const Signin = ({ togglePannel }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData));
    console.log("Login form:", formData);
  };

  return (
    <div className="flex justify-center items-center w-full">
      {/* Centered wrapper */}
      <div
        className="flex flex-col items-center  p-6 rounded-lg shadow-lg"
        style={{ width: "400px" }}
      >
        <h1 className="text-lg font-bold  text-center pb-8 text-white">
          Login
        </h1>

        <form
          className="space-y-4 flex flex-col items-center"
          onSubmit={handleSubmit}
        >
          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your Email..."
            required
            sx={{
              mb: 2,
              width: "380px",
              "& .MuiInputBase-input": { color: "white" },
              "& .MuiInputLabel-root": { color: "white" },
              "& .MuiOutlinedInput-root fieldset": { borderColor: "white" },
              "&:hover .MuiOutlinedInput-root fieldset": {
                borderColor: "white",
              },
              "&.Mui-focused .MuiOutlinedInput-root fieldset": {
                borderColor: "white",
              },
            }}
          />

          <TextField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your Password..."
            required
            sx={{
              mb: 2,
              width: "380px",
              "& .MuiInputBase-input": { color: "white" },
              "& .MuiInputLabel-root": { color: "white" },
              "& .MuiOutlinedInput-root fieldset": { borderColor: "white" },
              "&:hover .MuiOutlinedInput-root fieldset": {
                borderColor: "white",
              },
              "&.Mui-focused .MuiOutlinedInput-root fieldset": {
                borderColor: "white",
              },
            }}
          />

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
            Login
          </Button>
        </form>

        <div className="pt-4 text-white">
          <span>Don't have an account? </span>
          <Button
            onClick={togglePannel}
            sx={{ textTransform: "none", color: "#1976d2" }}
          >
            Sign Up
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Signin;
