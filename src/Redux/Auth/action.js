import * as types from "./actionTypes";
const getPhone=(payload)=>async(dispatch)=>{
    const {phone}=payload;
  if(!/^\d{10}$/.test(phone)) {
    return  await dispatch({
        type: types.PHONE_NUMBER_FAILURE,
        payload: { error: "Phone number must be exactly 10 digits." },
      });
        }
  const token = generateToken(phone);
 return await dispatch({type:types.PHONE_NUMBER_SUCCESS,payload:{phone:`+91${phone}`,token,success:"Registration Successfully",isAuthPhone:true}})
} 
const getAadhar = (payload) => async (dispatch) => {
  const { aadhar } = payload;
  if (!/^\d{12}$/.test(aadhar)) {
    return await dispatch({
      type: types.AADHAR_NUMBER_FAILURE,
      payload: { error: "Aadhar number must be exactly 12 digits." },
    });
  }
  const token = generateToken(aadhar);
  return await dispatch({
    type: types.AADHAR_NUMBER_SUCCESS,
    payload: {
      aadhar: aadhar,
      token,
      success: "Registration Successfully",
      isAuthAadhar: true,
    },
  });
}; 
const getOtp =(payload)=>async(dispatch)=>{
    const { otp } = payload;
    const otpcode = "123456";

    try {
      if (!/^\d{6}$/.test(otp)) {
        return dispatch({
          type: types.OTP_FAILURE,
          payload: { error: "OTP does not match" },
        });
      }

      if (otp === otpcode) {
        return dispatch({
          type: types.OTP_SUCCESS,
          payload: { otp, success: "OTP Matched successfully" },
        });
      } else {
        return dispatch({
          type: types.OTP_FAILURE,
          payload: { error: "Incorrect OTP entered" },
        });
      }
    } catch (error) {
      console.error("Error while verifying OTP:", error);
      return dispatch({
        type: types.OTP_FAILURE,
        payload: { error: "Error while verifying OTP" },
      });
    }

}
const addProfile =(payload)=>async(dispatch)=>{
  const {
    firstName,
    lastName,
    year,
    day,
    month,
    gender,
    phone,
    email,
    address,
    pincode,
    selectedState,
    selectedDistrict,
  } = payload;
  if(firstName==="" || lastName === "" || year==="" || day==="" || month==="" || gender==="" || phone==="" || email==="" || address==="" || pincode==="" || selectedState==="" || selectedDistrict==="" ){
    return await dispatch({type:types.PROFILE_FAILURE,payload:{error:"Field are empty ..."}})
  }else{
    return await dispatch({
      type: types.PROFILE_SUCCESS,
      payload: {
        profile: {
          firstName,
          lastName,
          year,
          day,
          month,
          gender,
          phone,
          email,
          address,
          pincode,
          selectedState,
          selectedDistrict,
        },
        success:"You have  Successfully created your ABHA number"
      },
    });
  }
}

const getUserSuggest=(payload)=>async(dispatch)=>{
  const {phone}=payload;
  const number = phone?.length ;
  const newsuggest = generateRandomSuggestions(number);
  return await dispatch({type:types.USERSUGGEST,payload:{newsuggest}})
}
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getRandomText(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  return result;
}
function generateRandomSuggestions(numberOfSuggestions) {
  const suggestions = [];

  for (let i = 0; i < numberOfSuggestions; i++) {
    const randomNumber = getRandomNumber(1, 100); // Random number between 1 and 100
    const randomText = getRandomText(10); // Random text of length 10
    suggestions.push({
      number: randomNumber,
      text: randomText,
    });
  }

  return suggestions;
}

function generateToken(payload) {
  // Base64 encode the payload (you can use a library like base64url to handle URL-safe encoding)
  const encodedPayload = btoa(payload);
  // Simple approach: use a prefix to distinguish it's a token
  return `myCustomTokenPrefix.${encodedPayload}`;
}

const createpassword = (payload) => async(dispatch)=>{
  return await dispatch({type:types.CHANGE_PASSWORD,payload})
}
export { getPhone,getAadhar, getOtp, addProfile, getUserSuggest, createpassword };