import axios, { AxiosError } from "axios";
import React from "react";
import { NavigateFunction } from "react-router";
import { LoginData, UserInfoData, URL } from "../constants";

export const logIn = async (
  userInfo: LoginData,
  navigate: NavigateFunction,
  setUser: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    const response = await axios.post(`${URL}/auth/logIn`, {
      email: userInfo.email,
      password: userInfo.password,
    });
    if (response) {
      sessionStorage.setItem("authToken", response.data.accessToken);
      navigate("/");
      setUser(true);
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

export const signUp = async (
  userInfo: UserInfoData,
  navigate: NavigateFunction,
  setUser: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    const response = await axios.post(`${URL}/auth/signUp`, {
      email: userInfo.email,
      password: userInfo.password,
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
    });

    if (response) {
      const newUserLoginInfo: LoginData = {
        email: userInfo.email,
        password: userInfo.password,
      };
      logIn(newUserLoginInfo, navigate, setUser);
    }
  } catch (e) {
    const err = e as AxiosError;
    if (err.response?.data?.statusCode > 399) {
      alert(err.response?.data?.message);
    }
  }
};
