import * as React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PropTypes from "prop-types";
import { Input, InputAdornment } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import ErrorTwoToneIcon from "@mui/icons-material/ErrorTwoTone";
import { useDispatch } from "react-redux";
import { getAadhar, getPhone } from "../Redux/Auth/action";
import { AADHAR_NUMBER_FAILURE, AADHAR_NUMBER_SUCCESS, PHONE_NUMBER_FAILURE, PHONE_NUMBER_SUCCESS } from "../Redux/Auth/actionTypes";
import { Link, useNavigate } from "react-router-dom";
// import { styled } from "@mui/system";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{width:"100%",height:"200px", p: 2 }}>{children}</Box>}
    </div>
  );
}

const Login = ({ setCurrentStep }) => {
  const [phone, setPhone] = React.useState("");
  const [aadhar,setAadhar]=React.useState("");
  const [value, setValue] = React.useState(0); // Changed initial state to 0
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(true);
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const pattern = new RegExp(/^\d{1,10}$/);
  const aadharpattern = new RegExp(/^\d{1,12}$/);
  const dispatch = useDispatch();
  const navigate = useNavigate();
    const [openToast, setOpenToast] = React.useState(false);
    const [toastMessage, setToastMessage] = React.useState("");
    const [toastSeverity, setToastSeverity] = React.useState("success");
     const handleToastClose = (event, reason) => {
       if (reason === "clickaway") {
         return;
       }
       setOpenToast(false);
     };
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    const handlePhoneChange = () => {
      const number = /^[0-9]{10}$/;
      if (phone.indexOf(number)) {
        setIsButtonDisabled(false);
      } else {
        setIsButtonDisabled(true);
      }
    };
     const handleAdharCheck = () => {
       const number = /^[0-9]{12}$/;
       if (aadhar.indexOf(number)) {
         setIsButtonDisabled(false);
       } else {
         setIsButtonDisabled(true);
       }
     };
    handlePhoneChange();
    handleAdharCheck()
  }, []);
  const handleAadhar=()=>{
     setCurrentStep(0);
         dispatch(getAadhar({ aadhar })).then((r) => {
           if (r.type === AADHAR_NUMBER_SUCCESS) {
              setToastSeverity("success");
              setToastMessage(r.payload.success);
              setOpenToast(true);
              navigate("/otp");
           } else if (r.type === AADHAR_NUMBER_FAILURE) {
              setToastSeverity("error");
              setToastMessage(r.payload.error);
              setOpenToast(true);
           }
         });
  };
  const handleOTPRequest = () => {
    // Here you would normally make an API request to get the OTP
    // alert("OTP requested for phone number: " + `+91${phone}`);
    setCurrentStep(0);
    dispatch(getPhone({phone}))
    .then((r)=>{
      if(r.type === PHONE_NUMBER_SUCCESS){
         setToastSeverity("success");
         setToastMessage(r.payload.success);
         setOpenToast(true);
         navigate("/otp");
      }
       else if(r.type === PHONE_NUMBER_FAILURE){
        setToastSeverity("error");
        setToastMessage(r.payload.error);
        setOpenToast(true);
      }
    })
  };

  console.log(phone);
  return (
    <>
      <Box
        sx={{
          backgroundColor: "lightblue",
          // border: "1px solid red",
          margin: "auto",
          left: { base: "0%", md: "0%", lg: "34.6%" },
          height: "480px",
          position: "absolute",
          width: { base: "100%", md: "100%", lg: "30.8%" },
        }}
      >
        <Box width={{ base: "100%", lg: "100%" }}>
          <h1
            style={{
              textAlign: "start",
              padding: "2px",
              marginLeft: "10px",
              color: "blue",
            }}
          >
            Welcome!
          </h1>
          <p
            style={{
              textAlign: "start",
              padding: "2px",
              marginLeft: "10px",
              marginTop: "-25px",
              fontSize: "15px",
            }}
          >
            You are about to create your ABHA number
          </p>
        </Box>
        <Box
          sx={{
            width: "100%",
            height: "200px",
            backgroundColor: "white",
            // border:"1px solid green",
            boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
          }}
        >
          <Box sx={{ width: "100%" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
              aria-label="basic tabs example"
            >
              <Tab
                sx={{
                  width: "50%",
                  textAlign: "center",
                }}
                label="Aadhar"
                {...a11yProps(0)}
              />
              <Tab
                sx={{
                  width: "50%",
                  textAlign: "center",
                }}
                label="Phone"
                {...a11yProps(1)}
              />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <InputLabel sx={{ Top: "-15px" }}>
              <Input
                type="text"
                value={aadhar}
                inputProps={{
                  maxLength: 12,
                }}
                sx={{
                  width: "70%",
                  margin: "auto",
                  border: "1px solid lightblue",
                  alignItems: "center",
                }}
                onChange={(e) => {
                  setAadhar(e.target.value);
                  if (!aadharpattern.test(e.target.value)) {
                    setIsButtonDisabled(false);
                  } else {
                    setIsButtonDisabled(true);
                  }
                }}
                placeholder="xxxx-xxxx-xxxx"
              />
            </InputLabel>
            <Box
              sx={{
                display: "flex",
                margin: "auto",
                top: "-70px",
                marginLeft: "15%",
                alignItems: "center",
              }}
            >
              <ErrorTwoToneIcon
                position="start"
                width="250px"
                sx={{ color: "red" }}
              />
              <p
                style={{
                  // border: "1px solid red",
                  fontFamily: "-moz-initial",
                  textAlign: "start",
                  fontSize: "12px",
                  fontWeight: "bold",
                }}
              >
                You'll have to complete KYC verfication <br />
                later to get ABHA number
              </p>
            </Box>
            <Button
              sx={{ width: "300px" }}
              variant="contained"
              disableElevation
              disabled={!isButtonDisabled}
              onClick={handleAadhar}
            >
              Continue
            </Button>
          </CustomTabPanel>
          <CustomTabPanel
            value={value}
            index={1}
            sx={{ border: "1px solid green" }}
          >
            <InputLabel sx={{ Top: "-15px" }}>
              <Input
                type="text"
                value={phone}
                inputProps={{
                  maxLength: 10,
                }}
                sx={{
                  width: "80%",
                  margin: "auto",
                  border: "1px solid lightblue",
                  textAlign: "center",
                }}
                onChange={(e) => {
                  setPhone(e.target.value);
                  if (!pattern.test(e.target.value)) {
                    setIsButtonDisabled(false);
                  } else {
                    setIsButtonDisabled(true);
                  }
                }}
                placeholder="9xxxxxxxxx"
                startAdornment={
                  <InputAdornment position="start">+91</InputAdornment>
                }
              />
            </InputLabel>
            <Box
              sx={{
                display: "flex",
                margin: "auto",
                top: "-70px",
                marginLeft: "15%",
                alignItems: "center",
              }}
            >
              <ErrorTwoToneIcon
                position="start"
                width="250px"
                sx={{ color: "red" }}
              />
              <p
                style={{
                  // border: "1px solid red",
                  fontFamily: "-moz-initial",
                  textAlign: "start",
                  fontSize: "12px",
                  fontWeight: "bold",
                }}
              >
                You'll have to complete KYC verfication <br />
                later to get ABHA number
              </p>
            </Box>
            <Button
              sx={{ width: "300px" }}
              variant="contained"
              disableElevation
              disabled={!isButtonDisabled}
              onClick={handleOTPRequest}
            >
              Continue
            </Button>
          </CustomTabPanel>
        </Box>
        <p>
          Already have ABHA number?<Link to={"/abha"}> Click here</Link>
        </p>
        <p style={{ fontSize: "15px" }}>
          <Checkbox {...label} defaultChecked />
          Accept Terms and Condition and Privacy Policy
        </p>
        <Snackbar
          open={openToast}
          autoHideDuration={6000}
          onClose={handleToastClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }} // Adjust the vertical position
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
    </>
  );
};

export default Login;

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
// propTypes is a typechecking props