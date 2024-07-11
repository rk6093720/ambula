import React from 'react';
import Box from "@mui/material/Box";
import { Button, InputLabel, InputAdornment, TextField, ListItem, ToggleButtonGroup, ToggleButton } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { getUserSuggest } from '../Redux/Auth/action';
import { useNavigate } from 'react-router-dom';
const Usersuggestions = () => {
     const [alignment, setAlignment] = React.useState("");
     const handleAlignment = (e) => {
       setAlignment(e.target.value);
     };
     const phone = useSelector((state) => state?.Auth?.phonenumber)|| JSON.parse(localStorage.getItem("phone"));
     const suggestlist = useSelector((state) => state?.Auth?.usersuggest);
     const dispatch = useDispatch();
     const navigate = useNavigate();
     const getusersuggest=()=>{
        dispatch(getUserSuggest({phone}))
        .then((r)=>{
            console.log(r)
        })
     }
      const handleContinue=()=>{
        if(alignment && true){
            navigate("/createpassword");
        }
      };
     React.useEffect(()=>{
        getusersuggest()
     },[])
  return (
    <Box
      sx={{
        backgroundColor: "lightblue",
        // border: "1px solid red",
        margin: "auto",
        left: { base: "0%", md: "0%", lg: "34.6%" },
        height: "480px",
        position: "absolute",
        overflow: "scroll",
        overflowX: "hidden",
        width: { base: "100%", md: "100%", lg: "30.8%" },
      }}
    >
      <Box sx={{ width: { base: "100%", md: "100%", lg: "100%" } }}>
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
      <hr style={{ border: "5px solid teal", marginTop: "45px" }} />
      <Box
        sx={{
          //   border: "1px solid red",
          width: "100%",
        }}
      >
        <p style={{ textAlign: "start" }}>Create your ABHA address</p>
        <Box sx={{ width: "100%" }}>
          <InputLabel
            sx={{
              width: "100%",
              marginTop: "5px",
              marginLeft: "0.1px",
              height: "80px",
              border: "1px solid lightblue",
            }}
          >
            <TextField
              type="text"
              value={alignment}
              sx={{
                width: "100%",
                border: "1px solid lightblue",
                textAlign: "center",
              }}
              placeholder="Abha address"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">@abha</InputAdornment>
                ),
              }}
            />
          </InputLabel>
          <ListItem
            sx={{
              color: "green",
              marginTop: "-25px",
              fontSize: "18px",
              fontWeight: "bold",
            }}
          >
            This ABHA address is available
          </ListItem>
          <Box>
            <ListItem
              sx={{
                color: "grey",
                marginTop: "25px",
                fontSize: "18px",
                fontWeight: "bold",
              }}
            >
              Suggestions
            </ListItem>
            <ToggleButtonGroup
              value={alignment}
              exclusive
              onChange={handleAlignment}
              aria-label="text alignment"
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "10px",
                padding: "10px",
              }}
            >
              {suggestlist.map((item, index) => (
                <ToggleButton
                  sx={{
                    width: "100px",
                    height: "50px",
                  }}
                  key={index}
                  value={item.text}
                  aria-label={item.text}
                >
                  {item.text}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Box>
        </Box>
        <Button
          sx={{ width: "100%" }}
          onClick={handleContinue}
          variant="contained"
        >
          {" "}
          Continue
        </Button>
      </Box>
    </Box>
  );
}

export default Usersuggestions;
