import { createTheme } from "@mui/material";

const DarkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#121212",
    },
    text: {
      primary: "#ffffff",
    },
    primary: {
      main: "rgba(46, 7, 60, 0.51)",
    },
  },
});
export default DarkTheme;
