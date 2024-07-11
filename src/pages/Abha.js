import React, { useEffect } from 'react';
import {
  Box
} from "@mui/material";
const Abha = ({ setCurrentStep }) => {
  useEffect(() => {
    setCurrentStep(2);
  }, []);
  return (
    <Box
      sx={{
        width: { base: "100%", md: "100%", lg: "30.8%" },
        backgroundColor: "lightblue",
        // border: "1px solid red",
        margin: "auto",
        left: { base: "100%", md: "50%", lg: "34.6%" },
        height: "200px",
        position: "absolute",
      }}
    >
      <Box  sx={{width:{ base: "100%", md: "100%", lg: "100%" }}}>
        <Box
          sx={{
            textAlign: "start",
            padding: "2px",
            marginLeft: "10px",
            marginTop: "45px",
            fontSize: "28px",
            fontFamily: "bold",
            color: "blue",
            width: { base: "100%", md: "100%", lg: "100%" },
            // border: "1px solid black",
          }}
        >
          Congratulations !
        </Box>
        <Box
          style={{
            textAlign: "start",
            marginLeft: "10px",
            marginTop: "5px",
            fontSize: "15px",
            // border: "1px solid black",
          }}
        >
          You have successfully created your ABHA number
        </Box>
      </Box>
    </Box>
  );
};

export default Abha;
