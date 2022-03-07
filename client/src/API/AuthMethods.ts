import axios, { AxiosError } from "axios";
import { LoginData, UserInfoData, URL } from "../constants";

export const signUp = async (userInfo: UserInfoData) => {
  try {
    const response = await axios.post(`${URL}/auth/signUp`, {
      email: userInfo.email,
      password: userInfo.password,
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
    });

    if (response) {
      console.log(response);
      // if response exists - login API Call is run with the email and password given from signup form
      const newUserLoginInfo: LoginData = {
        email: userInfo.email,
        password: userInfo.password,
      };
      logIn(newUserLoginInfo);
    }
  } catch (e) {
    const err = e as AxiosError;
    if (err.response?.data?.statusCode > 399) {
      alert(err.response?.data?.message);
    }
  }
};

export const logIn = async (userInfo: LoginData) => {
  try {
    const response = await axios.post(`${URL}/auth/logIn`, {
      email: userInfo.email,
      password: userInfo.password,
    });
    if (response) {
      sessionStorage.setItem("authToken", response.data.accessToken);
    }
  } catch (e) {
    const err = e as AxiosError;
    if (err.response?.data?.statusCode > 399) {
      alert(err.response?.data.message);
    }
  }
};

export const logOut = async () => {
  try {
    sessionStorage.setItem("authToken", "");
  } catch (e) {
    const err = e as AxiosError;
    if (err.response?.data?.statusCode > 399) {
      alert(err.response?.data?.message);
    }
  }
};
