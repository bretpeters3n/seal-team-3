import axios from "axios";
import { LoginData, UserInfoData, URL } from "../constants";

export const signUp = async (userInfo: UserInfoData) => {
  try {
    await axios.post(`${URL}/auth/signUp`, {
      email: userInfo.email,
      password: userInfo.password,
      first_name: userInfo.firstName,
      last_name: userInfo.lastName,
    });
  } catch (e) {
    if (e.response.status > 399) {
      alert(e.response.data.message[0]);
    }
  }
};

export const logIn = async (userInfo: LoginData) => {
  try {
    const response = await axios.post(`${URL}/auth/logIn`, {
      email: userInfo.email,
      password: userInfo.password,
    },
      //  This needs to be included in all of our other methods with axios.
      // { withCredentials: true, headers: { 'Authorization': `Bearer ${sessionStorage.getItem('authToken')}` } }
    );
    sessionStorage.setItem('authToken', response.data.accessToken);
    if (response) {
      // write code to automatically push user to next page.
      // history.push('/');
    }
  } catch (e) {
    if (e.response.status > 399) {
      alert(e.response.data.message[0]);
    }
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
