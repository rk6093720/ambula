import * as React from "react";
import Box from "@mui/material/Box";
import { Button, ImageList, ImageListItem } from "@mui/material";
import { PropTypes } from 'prop-types';
import { Input as BaseInput } from "@mui/base/Input";
import { styled } from "@mui/system";
import { useDispatch } from 'react-redux';
import { getOtp } from "../Redux/Auth/action";
import { OTP_FAILURE, OTP_SUCCESS } from "../Redux/Auth/actionTypes";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
function OTP({ separator, length, value, onChange }) {
  const inputRefs = React.useRef(new Array(length).fill(null));
  const focusInput = (targetIndex) => {
    const targetInput = inputRefs.current[targetIndex];
    targetInput.focus();
  };

  const selectInput = (targetIndex) => {
    const targetInput = inputRefs.current[targetIndex];
    targetInput.select();
  };

  const handleKeyDown = (event, currentIndex) => {
    switch (event.key) {
      case "ArrowUp":
      case "ArrowDown":
      case " ":
        event.preventDefault();
        break;
      case "ArrowLeft":
        event.preventDefault();
        if (currentIndex > 0) {
          focusInput(currentIndex - 1);
          selectInput(currentIndex - 1);
        }
        break;
      case "ArrowRight":
        event.preventDefault();
        if (currentIndex < length - 1) {
          focusInput(currentIndex + 1);
          selectInput(currentIndex + 1);
        }
        break;
      case "Delete":
        event.preventDefault();
        onChange((prevOtp) => {
          const otp =
            prevOtp.slice(0, currentIndex) + prevOtp.slice(currentIndex + 1);
          return otp;
        });

        break;
      case "Backspace":
        event.preventDefault();
        if (currentIndex > 0) {
          focusInput(currentIndex - 1);
          selectInput(currentIndex - 1);
        }

        onChange((prevOtp) => {
          const otp =
            prevOtp.slice(0, currentIndex) + prevOtp.slice(currentIndex + 1);
          return otp;
        });
        break;

      default:
        break;
    }
  };

  const handleChange = (event, currentIndex) => {
    const currentValue = event.target.value;
    let indexToEnter = 0;

    while (indexToEnter <= currentIndex) {
      if (
        inputRefs.current[indexToEnter].value &&
        indexToEnter < currentIndex
      ) {
        indexToEnter += 1;
      } else {
        break;
      }
    }
    onChange((prev) => {
      const otpArray = prev.split("");
      const lastValue = currentValue[currentValue.length - 1];
      otpArray[indexToEnter] = lastValue;
      return otpArray.join("");
    });
    if (currentValue !== "") {
      if (currentIndex < length - 1) {
        focusInput(currentIndex + 1);
      }
    }
  };

  const handleClick = (event, currentIndex) => {
    selectInput(currentIndex);
  };

  const handlePaste = (event, currentIndex) => {
    event.preventDefault();
    const clipboardData = event.clipboardData;

    // Check if there is text data in the clipboard
    if (clipboardData.types.includes("text/plain")) {
      let pastedText = clipboardData.getData("text/plain");
      pastedText = pastedText.substring(0, length).trim();
      let indexToEnter = 0;

      while (indexToEnter <= currentIndex) {
        if (
          inputRefs.current[indexToEnter].value &&
          indexToEnter < currentIndex
        ) {
          indexToEnter += 1;
        } else {
          break;
        }
      }

      const otpArray = value.split("");

      for (let i = indexToEnter; i < length; i += 1) {
        const lastValue = pastedText[i - indexToEnter] ?? " ";
        otpArray[i] = lastValue;
      }

      onChange(otpArray.join(""));
    }
  };

  return (
    <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
      {new Array(length).fill(null).map((_, index) => (
        <React.Fragment key={index}>
          <BaseInput
            slots={{
              input: InputElement,
            }}
            aria-label={`Digit ${index + 1} of OTP`}
            slotProps={{
              input: {
                ref: (ele) => {
                  inputRefs.current[index] = ele;
                },
                onKeyDown: (event) => handleKeyDown(event, index),
                onChange: (event) => handleChange(event, index),
                onClick: (event) => handleClick(event, index),
                onPaste: (event) => handlePaste(event, index),
                value: value[index] ?? "",
              },
            }}
          />
          {index === length - 1 ? null : separator}
        </React.Fragment>
      ))}
    </Box>
  );
}
const Otp = () => {
    const [otp,setOtp]=React.useState("");
    const [timeleft,setTimeleft]=React.useState(null);
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
    const phone = useSelector((state) => state?.Auth?.phonenumber) || JSON.parse(localStorage.getItem("phone"));
    const handleOtp =()=>{
        if(otp === "")
        {
           setToastSeverity("error");
           setToastMessage("please write otp");
           setOpenToast(true);
            return
        }
       dispatch(getOtp({ otp })).then((r) => {
  switch (r.type) {
    case OTP_SUCCESS:
      setToastSeverity("success");
      setToastMessage(r.payload.success);
      setOpenToast(true);
      navigate("/profile");
      break;
    case OTP_FAILURE:
      setToastSeverity("error");
      setToastMessage(r.payload.error);
      setOpenToast(true);
      break;

    default:
      setToastMessage("Unexpected error occurred");
      setOpenToast(true);
  }
});
    }
    const handleResendotp=()=>{
        setTimeleft(60);
    }
     const formatTime = (timeLeft) => {
       if (timeLeft <= 0) {
         return "00:00";
       }
    //    const hours = Math.floor(timeLeft / 3600);
    //    const remainingSeconds = timeLeft % 3600;
       const minutes = Math.floor(timeLeft / 60);
       const seconds = timeLeft % 60;
// ${hours < 10 ? "0" : ""}${hours}:
       return `${
         minutes < 10 ? "0" : ""
       }${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
     };
    //  function timeCounter(){
    //       const expiryDate = timeleft;
    //       const interval = setInterval(() => {
    //         const timeNow = Math.floor(Date.now() / 1000);
    //         const difference = expiryDate - timeNow;
    //         console.log(difference)
    //         if (difference <= 0) {
    //           clearInterval(interval);
    //           setTimeleft(0);
    //           return;
    //         }
    //         setTimeleft(difference);
    //       }, 1000);
    //       return () => clearInterval(interval);
    //  }
    //  React.useEffect(()=>{
    //   timeCounter()
    //  },[])
    // const splitnumber = getnumber(phone);
     React.useEffect(() => {
       const interval = setInterval(() => {
         setTimeleft((prev) => (prev > 0 ? prev - 1 : 0));
       }, 1000);

       return () => clearInterval(interval);
     }, [timeleft]);
    //  function getnumber(phone){
    //    return phone?.split("+91")[1];
    //  }
  return (
    <Box
      sx={{
        backgroundColor: "lightblue",
        // border: "1px solid red",
        margin: "auto",
        left: { base: "0%", md: "0%", lg: "34.6%" },
        height: "550px",
        width: { base: "100%", md: "100%", lg: "30.8%" },
        position: "absolute",
      }}
    >
      <Box sx={{ width: { base: "100%", lg: "100%" } }}>
        <p
          style={{
            textAlign: "center",
            padding: "2px",
            marginLeft: "10px",
            fontSize: "18px",
            // color: "blue",
          }}
        >
          OTP Verfication
        </p>
        <p
          style={{
            textAlign: "center",
            padding: "2px",
            marginLeft: "10px",
            marginTop: "25px",
            fontSize: "15px",
          }}
        >
          We have sent a 6 digit OTP to {phone?.split("+91")[1]}
        </p>
      </Box>
      <ImageList
        sx={{
          marginLeft: "30%",
          marginTop: "15px",
          width: "300px",
          height: "150px",
        }}
      >
        {itemData.map((item) => (
          <ImageListItem key={item.img}>
            <img
              srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
              alt={item.title}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          padding: "25px",
          //   border: "1px solid red",
        }}
      >
        <span style={{ textAlign: "start" }}>Enter Otp</span>
        <OTP
          separator={<span></span>}
          value={otp}
          onChange={setOtp}
          length={6}
        />
        <Button onClick={handleOtp} variant="contained">
          Verify and Continue
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          padding: "12px",
          marginTop: "-25px",
          // border: "1px solid red",
        }}
      >
        <p>Didn't receive OTP?</p>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            // border: "1px solid red",
          }}
        >
          <Button onClick={handleResendotp} disabled={timeleft > 0}>
            Resend Otp
          </Button>
          <p>{formatTime(timeleft)}</p>
        </Box>
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
}

export default Otp;
const itemData = [
  {
    img: "https://img.freepik.com/premium-vector/otp-one-time-password-security-illustration_258153-467.jpg",
    title: "otp",
  },
];

OTP.propTypes = {
  length: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  separator: PropTypes.node,
  value: PropTypes.string.isRequired,
};
const InputElement = styled("input")(
  ({ theme }) => `
  width: 40px;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 8px 0px;
  border-radius: 8px;
  text-align: center;
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
  box-shadow: 0px 2px 4px ${
    theme.palette.mode === "dark" ? "rgba(0,0,0, 0.5)" : "rgba(0,0,0, 0.05)"
  };

  &:hover {
    border-color: ${blue[400]};
  }

  &:focus {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${
      theme.palette.mode === "dark" ? blue[600] : blue[200]
    };
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`
);
const blue = {
  100: "#DAECFF",
  200: "#80BFFF",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  700: "#0059B2",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};