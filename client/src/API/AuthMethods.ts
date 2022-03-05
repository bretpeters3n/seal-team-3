import axios, { AxiosError } from "axios";
import { LoginData, UserInfoData, URL } from "../constants";
import { useHistory } from "react-router-dom";

const history = useHistory();

export const signUp = async (userInfo: UserInfoData) => {
  try {
    const response = await axios.post(
      `${URL}/auth/signUp`,
      {
        email: userInfo.email,
        password: userInfo.password,
        first_name: userInfo.firstName,
        last_name: userInfo.lastName,
      },
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
        },
      }
    );
    sessionStorage.setItem("authToken", response.data.accessToken);
    if (response) {
      history.push("/");
    }
  } catch (e) {
    const err = e as AxiosError;
    console.log(err.response?.data?.message);
  }
};

export const logIn = async (userInfo: LoginData) => {
  try {
    const response = await axios.post(
      `${URL}/auth/logIn`,
      {
        email: userInfo.email,
        password: userInfo.password,
      },
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
        },
      }
    );
    sessionStorage.setItem("authToken", response.data.accessToken);
    if (response) {
      history.push("/");
    }
  } catch (e) {
    const err = e as AxiosError;
    console.log(err.response?.data?.message);
  }
};

export const logOut = async () => {
  try {
    sessionStorage.setItem("authToken", "");
    history.push("/login");
  } catch (e) {
    const err = e as AxiosError;
    console.log(err.response?.data?.message);
  }
};
