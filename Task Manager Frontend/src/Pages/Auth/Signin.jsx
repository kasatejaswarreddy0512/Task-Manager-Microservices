import { TextField, Button } from "@mui/material";
import React, { useState } from "react";

const Signin = ({ togglePannel }) => {
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
    console.log("Login form:", formData);
  };

  return (
    <div>
      <h1 className="text-lg font-bold text-center pb-8 text-white">Login</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <TextField
          fullWidth
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
            "& .MuiInputBase-input": { color: "white" }, // ✅ Input text white
            "& .MuiInputLabel-root": { color: "white" }, // ✅ Label text white
            "& .MuiOutlinedInput-root fieldset": { borderColor: "white" }, // ✅ Border white
            "&:hover .MuiOutlinedInput-root fieldset": { borderColor: "white" },
            "&.Mui-focused .MuiOutlinedInput-root fieldset": {
              borderColor: "white",
            },
          }}
        />

        <TextField
          fullWidth
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
            "&:hover .MuiOutlinedInput-root fieldset": { borderColor: "white" },
            "&.Mui-focused .MuiOutlinedInput-root fieldset": {
              borderColor: "white",
            },
          }}
        />

        <Button
          fullWidth
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

      <div>
        <span>Don't have an account ? </span>
        <Button onClick={togglePannel}>SignUp</Button>
      </div>
    </div>
  );
};

export default Signin;
