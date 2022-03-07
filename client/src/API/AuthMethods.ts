import axios, { AxiosError } from "axios";
import { LoginData, UserInfoData, URL } from "../constants";
import { useNavigate } from "react-router-dom";

const navigate = useNavigate();

export const signUp = async (userInfo: UserInfoData) => {
  try {
    const response = await axios.post(`${URL}/auth/signUp`, {
      email: userInfo.email,
      password: userInfo.password,
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
    });

    if (response) {
      // if response exists - login API Call is run with the email and password given from signup form
      const newUserLoginInfo: LoginData = {
        email: userInfo.email,
        password: userInfo.password,
      };
      logIn(newUserLoginInfo);
    }
  } catch (e) {
    const err = e as AxiosError;
    alert(err.response?.data?.message);
  }
};

export const logIn = async (userInfo: LoginData) => {
  try {
    const response = await axios.post(
      `${URL}/auth/logIn`,
      {
        email: userInfo.email,
        password: userInfo.password,
      }
      //  This needs to be included in all of our other methods with axios.
      // { withCredentials: true, headers: { 'Authorization': `Bearer ${sessionStorage.getItem('authToken')}` } }
    );
    sessionStorage.setItem("authToken", response.data.accessToken);
    if (response) {
      // write code to automatically push user to next page.
      // history.push('/');
      navigate("/");
    }
  } catch (e) {
    const err = e as AxiosError;
    if (err.response?.data?.status > 399) {
      alert(err.response?.data.message);
    }
  }
};

export const logOut = async () => {
  try {
    sessionStorage.setItem("authToken", "");
    navigate("/login");
  } catch (e) {
    const err = e as AxiosError;
    alert(err.response?.data?.message);
  }

  // A signout function that can be used to send user back to log-in page.
  // const signOut = () => {
  //   sessionStorage.setItem('authToken', '');
  //   history.push('/');
  // };

  // A function to use 'just in case' a user doesn't have an auth token.
  // if (!sessionStorage.getItem('authToken')) {
  //   history.push('/');
  // }
};
