import * as types from "./actionTypes";
import { appData, saveData } from "../../Component/LocalStorage";
const InitialState = {
  isLoading: false,
  isError: false,
  isAuth: false,
  token:appData("token")||"",
  msg: "",
  usersuggest:[],
  phonenumber:appData("phone")||"",
  adharnumber:appData("aadhar")||"",
  otp:appData("otp")||"123456",
  status: false,
  profileData: appData("profile") || [],
  password:appData("password") || "",
};
const reducer = (state = InitialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.PHONE_NUMBER_SUCCESS:
      const newPhone = saveData("phone", payload.phone);
      return {
        ...state,
        phonenumber: newPhone,
        token: saveData("token", payload.token),
        msg: payload.success,
      };
    case types.AADHAR_NUMBER_SUCCESS:
      const newAdhar = saveData("aadhar", payload.aadhar);
      return {
        ...state,
        adharnumber: newAdhar,
        token: saveData("token", payload.token),
        msg: payload.success,
      };
    case types.AADHAR_NUMBER_FAILURE:
      return {
        ...state,
        isError: true,
        msg: payload.error,
      };
    case types.PHONE_NUMBER_FAILURE:
      return {
        ...state,
        isError: true,
        msg: payload.error,
      };
    case types.OTP_SUCCESS:
      return {
        ...state,
        otp: saveData("otp", payload.otp),
        msg: payload.success,
      };
    case types.OTP_FAILURE:
      return {
        ...state,
        isError: true,
        msg: payload.error,
      };
    case types.PROFILE_SUCCESS:
      const newProfile = [...state.profileData, payload.profile];
      return {
        ...state,
        profileData: saveData("profile", newProfile),
        msg: payload.success,
      };
    case types.PROFILE_FAILURE:
      return {
        ...state,
        isError: true,
        msg: payload.error,
      };
    case types.USERSUGGEST:
      return {
        ...state,
        usersuggest: payload.newsuggest,
      };
    case types.CHANGE_PASSWORD:
      return {
        ...state,
        password: payload,
      };
    default:
      return state;
  }
};
export { reducer };
