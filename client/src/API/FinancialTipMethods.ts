import axios, { AxiosError } from "axios";
import { URL } from "../constants";

export const getFinanceTips = async () => {
  try {
    const data = await axios
      .get(`${URL}/financeTips/getAllFinanceTips`)
      .then((res) => res.data);
    return data;
  } catch (e) {
    const err = e as AxiosError;
    if (err.response?.data?.statusCode > 401) {
      alert(err.response?.data?.message);
    }
  }
};
