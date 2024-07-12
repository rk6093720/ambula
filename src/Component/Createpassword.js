import React, { useState } from "react";
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Button,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { createpassword } from "../Redux/Auth/action";
import { CHANGE_PASSWORD } from "../Redux/Auth/actionTypes";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const checkPasswordCriteria = (password) => {
  const hasNumber = /\d/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasSpecialSymbol = /[!@#$%^&*()_+[\]{}|;:,.<>?]/.test(password);

  return {
    hasNumber,
    hasUppercase,
    hasLowercase,
    hasSpecialSymbol,
  };
};

const Createpassword = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openToast, setOpenToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastSeverity, setToastSeverity] = useState("success");

  const { hasNumber, hasUppercase, hasLowercase, hasSpecialSymbol } =
    checkPasswordCriteria(password);

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleToastClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenToast(false);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handlepassword = () => {
    dispatch(createpassword({ password })).then((r) => {
      if (r.type === CHANGE_PASSWORD) {
        setToastSeverity("success");
        setToastMessage(r.payload.success);
        setOpenToast(true);
        navigate("/abha");
      }
    });
  };

  return (
    <Box
      sx={{
        backgroundColor: "lightblue",
        margin: "auto",
        left: { xs: "0%", lg: "34.6%" },
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        overflowY: "auto",
        width: { xs: "100%", lg: "30.8%" },
      }}
    >
      <Box sx={{ width: "100%", textAlign: "center", padding: 2 }}>
        <Typography variant="h4" color="blue">
          Congratulations !
        </Typography>
        <Typography variant="body1">
          You have successfully created your ABHA number
        </Typography>
      </Box>
      <Box sx={{ width: "100%", padding: 2 }}>
        <Typography variant="h6" sx={{ textAlign: "start", fontSize: "18px" }}>
          Create Password
        </Typography>
        <FormControl sx={{ marginY: 2, width: "100%" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={handlePasswordChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        <Box sx={{ marginY: 2 }}>
          <Typography>Password must contain:</Typography>
          <Typography color={hasNumber ? "green" : "red"}>
            {hasNumber ? "✔" : "✖"} At least one number
          </Typography>
          <Typography color={hasUppercase ? "green" : "red"}>
            {hasUppercase ? "✔" : "✖"} At least one uppercase letter
          </Typography>
          <Typography color={hasLowercase ? "green" : "red"}>
            {hasLowercase ? "✔" : "✖"} At least one lowercase letter
          </Typography>
          <Typography color={hasSpecialSymbol ? "green" : "red"}>
            {hasSpecialSymbol ? "✔" : "✖"} At least one special symbol
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Button
          sx={{ width: "200px", marginBottom: "15px" }}
          onClick={handlepassword}
          variant="contained"
        >
          Continue
        </Button>
        <Button sx={{ width: "200px" }} variant="contained">
          Skip for now
        </Button>
      </Box>
      <Snackbar
        open={openToast}
        autoHideDuration={6000}
        onClose={handleToastClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleToastClose}
          severity={toastSeverity}
        >
          {toastMessage}
        </MuiAlert>
      </Snackbar>
    </Box>
  );
};

export default Createpassword;
