import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {
  Button,
  InputAdornment,
  Input,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { addProfile } from "../Redux/Auth/action";
import { PROFILE_FAILURE, PROFILE_SUCCESS } from "../Redux/Auth/actionTypes";
import { useNavigate } from 'react-router-dom';
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
const Profile = ({ setCurrentStep }) => {
   const [firstName,setFirstName]=React.useState("");
   const [lastName, setLastName] = React.useState("");
   const [year, setYear] = React.useState("");
   const [day, setDay] = React.useState("");
   const [month, setMonth] = React.useState("");
   const [gender, setGender] = React.useState("");
   const [phone,setPhone]=React.useState("");
   const [email, setEmail] = React.useState("");
   const [address, setAddress] = React.useState("");
   const [pincode, setPincode] = React.useState("");
   const [selectedState, setSelectedState] = React.useState("");
  const [selectedDistrict, setSelectedDistrict] = React.useState("");
     const [emailError, setEmailError] = React.useState(false);
     const [openToast, setOpenToast] = React.useState(false);
     const [toastMessage, setToastMessage] = React.useState("");
     const [toastSeverity, setToastSeverity] = React.useState("success");
     const handleToastClose = (event, reason) => {
       if (reason === "clickaway") {
         return;
       }
       setOpenToast(false);
     };
    const pattern = new RegExp(/^\d{1,10}$/);
    const pincodepattern = new RegExp(/^\d{1,6}$/);
    const dispatch = useDispatch();
    const navigate = useNavigate();
   const handleEmailChange = (e) => {
     setEmail(e.target.value);
     if (
       !/^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/.test(e.target.value)
     ) {
       setEmailError("Invalid email address");
     } else {
       setEmailError(false);
     }
   };
   const handleForm = (e) => {
      e.preventDefault();
      const payload={
        firstName,lastName,year,day,month,gender,phone,email,address,pincode,selectedState,selectedDistrict
      }
      dispatch(addProfile(payload))
      .then((r)=>{
        if(r.type === PROFILE_FAILURE){
           setToastSeverity("error");
           setToastMessage(r.payload.error);
           setOpenToast(true);
        }
        else if(r.type === PROFILE_SUCCESS){
           setToastSeverity("success");
           setToastMessage(r.payload.success);
           setOpenToast(true);
          navigate("/userSuggestions")
        }
      })
   };
  React.useEffect(() => {
    setCurrentStep(1);
  }, []);
  return (
    <Box
      sx={{
        backgroundColor: "lightblue",
        // border: "1px solid red",
        margin: "auto",
        left: { base: "0%", md: "0%", lg: "34.6%" },
        height: "550px",
        position: "absolute",
        overflow: "scroll",
        overflowX: "hidden",
        width: { base: "100%", md: "100%", lg: "30.8%" },
      }}
    >
      {/* form  */}
      <Box
        component="form"
        sx={{
          textAlign: "start",
          gap: "2",
        }}
        noValidate
        onSubmit={handleForm}
      >
        {/* name */}
        <Box
          sx={{
            // border: "1px solid green",
            marginTop: "15px",
            padding: "15px",
          }}
        >
          <p>Name</p>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <TextField
              required
              label="FirstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              inputProps={{
                pattern: "[A-Za-z ]+",
              }}
            />
            <TextField
              sx={{ marginLeft: "2px" }}
              required
              label="LastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              inputProps={{
                pattern: "[A-Za-z ]+",
              }}
            />
          </Box>
          <p>Date of Birth</p>
          <Box sx={{ minWidth: 180, marginBottom: "5px" }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Year</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={year}
                label="YYYY"
                onChange={(e) => setYear(e.target.value)}
              >
                {years.map((item) => (
                  <MenuItem key={item.year} value={item.year}>
                    {item.year}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              marginTop: "2px",
              gap: "2px",
              padding: "2px",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ minWidth: 180 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Day</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={day}
                  label="Day"
                  onChange={(e) => setDay(e.target.value)}
                >
                  {days.map((item) => (
                    <MenuItem key={item.day} value={item.day}>
                      {item.day}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ minWidth: 180 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Month</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={month}
                  label="Month"
                  onChange={(e) => setMonth(e.target.value)}
                >
                  {months.map((item) => (
                    <MenuItem key={item.month} value={item.month}>
                      {item.month}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>
          <p>Gender</p>
          <ToggleButtonGroup
            value={gender}
            exclusive
            onChange={(e) => setGender(e.target.value)}
            aria-label="text alignment"
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <ToggleButton
              value="male"
              sx={{
                width: "100px",
                borderRadius: "5px",
                border: "1px solid black",
              }}
              variant="outline"
              aria-label="left aligned"
            >
              Male
            </ToggleButton>
            <ToggleButton
              value="female"
              sx={{
                width: "100px",
                borderRadius: "5px",
                border: "1px solid black",
              }}
              aria-label="centered"
            >
              Female
            </ToggleButton>
            <ToggleButton
              value="other"
              sx={{
                width: "100px",
                borderRadius: "5px",
                border: "1px solid black",
              }}
              aria-label="right aligned"
            >
              other
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
        {/* contact Details */}
        <Box
          sx={{
            // border: "1px solid green",
            marginTop: "2px",
            padding: "10px",
          }}
        >
          <p>Phone</p>
          <InputLabel
            sx={{
              width: "100%",
              marginTop: "5px",
              variant: "outline",
              marginLeft: "20%",
            }}
          >
            <Input
              type="text"
              value={phone}
              onChange={(e) => {
                // console.log(pattern.test(e.target.value));
                if (pattern.test(e.target.value)) {
                  setPhone(e.target.value);
                }
              }}
              placeholder="9xxxxxxxxx"
              startAdornment={
                <InputAdornment position="start">+91</InputAdornment>
              }
            />
          </InputLabel>
          <p>Email</p>
          <TextField
            sx={{ width: "100%", marginTop: "5px", variant: "outline" }}
            label="Email"
            value={email}
            onChange={handleEmailChange}
            error={emailError}
            helperText={emailError}
          />
        </Box>
        {/* Address Details */}
        <Box
          sx={{
            // border: "1px solid green",
            marginTop: "5px",
            padding: "5px",
          }}
        >
          <p>Address Details</p>
          <TextField
            sx={{ width: "100%", marginTop: "2px", variant: "outline" }}
            label="Building,apartment,street etc"
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
          />
          <p>Pincode</p>
          <TextField
            sx={{ width: "100%", marginTop: "2px", variant: "outline" }}
            label="eg.110065"
            value={pincode}
            required
            onChange={(e) => {
              if (pincodepattern.test(e.target.value)) {
                setPincode(e.target.value);
              }
            }}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              marginTop: "2px",
              gap: "2px",
              padding: "2px",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ minWidth: 180 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">State</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectedState}
                  label="state"
                  onChange={(e) => setSelectedState(e.target.value)}
                >
                  {states.map((item) => (
                    <MenuItem key={item.state} value={item.state}>
                      {item.state}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ minWidth: 180, marginLeft: "-5px" }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">District</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectedDistrict}
                  label="District"
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                >
                  {selectedState &&
                    states
                      .find((item) => item.state === selectedState)
                      .districts.map((item, index) => (
                        <MenuItem key={index} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                </Select>
              </FormControl>
            </Box>
          </Box>
        </Box>
        <Button
          sx={{ width: "100%" }}
          variant="contained"
          color="primary"
          type="submit"
        >
          Continue
        </Button>
      </Box>
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
  );
};

export default Profile;
const days = Array.from({ length: 31 }, (v, i) => ({ day: i + 1 }));
const months = [
  { month: "January" },
  { month: "February" },
  { month: "March" },
  { month: "April" },
  { month: "May" },
  { month: "June" },
  { month: "July" },
  { month: "August" },
  { month: "September" },
  { month: "October" },
  { month: "November" },
  { month: "December" }
];
const years = Array.from({ length: 2024 - 1947 + 1 }, (v, i) => ({ year: 1947 + i }));
const states = [
  {
    state: "Andhra Pradesh",
    districts: ["Visakhapatnam", "Vijayawada", "Guntur", "Tirupati", "Kurnool"],
  },
  {
    state: "Arunachal Pradesh",
    districts: ["Itanagar", "Tawang", "Changlang", "Namsai", "Papum Pare"],
  },
  {
    state: "Assam",
    districts: ["Guwahati", "Dibrugarh", "Silchar", "Tezpur", "Jorhat"],
  },
  {
    state: "Bihar",
    districts: ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Darbhanga"],
  },
  {
    state: "Chhattisgarh",
    districts: ["Raipur", "Bilaspur", "Durg", "Raigarh", "Korba"],
  },
  {
    state: "Goa",
    districts: ["North Goa", "South Goa"],
  },
  {
    state: "Gujarat",
    districts: ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Gandhinagar"],
  },
  {
    state: "Haryana",
    districts: ["Gurgaon", "Faridabad", "Rohtak", "Hisar", "Panipat"],
  },
  {
    state: "Himachal Pradesh",
    districts: ["Shimla", "Kangra", "Mandi", "Solan", "Una"],
  },
  {
    state: "Jharkhand",
    districts: ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro", "Hazaribagh"],
  },
  {
    state: "Karnataka",
    districts: ["Bengaluru", "Mysuru", "Hubballi", "Belagavi", "Mangaluru"],
  },
  {
    state: "Kerala",
    districts: [
      "Thiruvananthapuram",
      "Kochi",
      "Kozhikode",
      "Thrissur",
      "Kollam",
    ],
  },
  {
    state: "Madhya Pradesh",
    districts: ["Indore", "Bhopal", "Jabalpur", "Gwalior", "Ujjain"],
  },
  {
    state: "Maharashtra",
    districts: ["Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad"],
  },
  {
    state: "Manipur",
    districts: ["Imphal", "Thoubal", "Churachandpur", "Bishnupur", "Senapati"],
  },
  {
    state: "Meghalaya",
    districts: ["Shillong", "Tura", "Jowai", "Nongpoh", "Baghmara"],
  },
  {
    state: "Mizoram",
    districts: ["Aizawl", "Lunglei", "Champhai", "Saiha", "Kolasib"],
  },
  {
    state: "Nagaland",
    districts: ["Kohima", "Dimapur", "Mokokchung", "Tuensang", "Wokha"],
  },
  {
    state: "Odisha",
    districts: ["Bhubaneswar", "Cuttack", "Rourkela", "Sambalpur", "Puri"],
  },
  {
    state: "Punjab",
    districts: ["Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda"],
  },
  {
    state: "Rajasthan",
    districts: ["Jaipur", "Udaipur", "Jodhpur", "Kota", "Bikaner"],
  },
  {
    state: "Sikkim",
    districts: ["Gangtok", "Namchi", "Gyalshing", "Mangan", "Singtam"],
  },
  {
    state: "Tamil Nadu",
    districts: ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem"],
  },
  {
    state: "Telangana",
    districts: ["Hyderabad", "Warangal", "Karimnagar", "Nizamabad", "Khammam"],
  },
  {
    state: "Tripura",
    districts: ["Agartala", "Dharmanagar", "Udaipur", "Ambassa", "Kailasahar"],
  },
  {
    state: "Uttar Pradesh",
    districts: ["Lucknow", "Kanpur", "Agra", "Varanasi", "Meerut"],
  },
  {
    state: "Uttarakhand",
    districts: ["Dehradun", "Haridwar", "Nainital", "Rishikesh", "Almora"],
  },
  {
    state: "West Bengal",
    districts: ["Kolkata", "Howrah", "Durgapur", "Asansol", "Siliguri"],
  },
];
