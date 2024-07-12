import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Login from "../Component/Login";
import Profile from "./Profile";
import Abha from "./Abha";
import Usersuggestions from "./Usersuggestions";
import Createpassword from "../Component/Createpassword";

const MainRoutes = () => {
  const steps = ["Phone Number", "Personal Details", "ABHA Profile"];
  const [currentStep, setCurrentStep] = useState(0);

  const handleStepChange = (step) => {
    setCurrentStep(step);
  };

  return (
    <React.Fragment>
      <Stepper
        activeStep={currentStep}
        alternativeLabel
        sx={{
          width: { xs: "100%", md: "70%", lg:"30%"  },
          margin: {xs:"auto",md:"auto",lg:"auto"},
          left: { xs: "0%", md: "0%", lg: "0.7%" },
          marginTop: "10px",
          padding: "5px",
          postion: "relative",
          //   border:"1px solid red",
          backgroundColor: "lightblue",
        }}
      >
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Routes>
        <Route
          path="/*"
          element={<Login setCurrentStep={handleStepChange} />}
        />
        <Route
          path="/profile"
          element={<Profile setCurrentStep={handleStepChange} />}
        />
        <Route
          path="/abha"
          element={<Abha setCurrentStep={handleStepChange} />}
        />
        <Route path="/userSuggestions" element={<Usersuggestions />} />
        <Route path="/createpassword" element={<Createpassword />} />
      </Routes>
    </React.Fragment>
  );
};

export default MainRoutes;
