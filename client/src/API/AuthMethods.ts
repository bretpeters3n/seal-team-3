import axios from "axios";
import { LoginData, UserInfoData, URL } from "./Constants";

export const signUp = async (userInfo: UserInfoData) => {
  try {
    await axios.post(`${URL}/auth/signUp`, {
      email: userInfo.email,
      password: userInfo.password,
      first_name: userInfo.firstName,
      last_name: userInfo.lastName,
    });
  } catch (e: any) {
    // Will need to research more on how to better type the error
    if (e.response.status > 399) {
      alert(e.response.data.message[0]);
    }
  }
};

export const logIn = async (userInfo: LoginData) => {
  try {
    await axios.post(`${URL}/auth/logIn`, {
      email: userInfo.email,
      password: userInfo.password,
    });
  } catch (e: any) {
    if (e.response.status > 399) {
      alert(e.response.data.message[0]);
    }
  }
};
