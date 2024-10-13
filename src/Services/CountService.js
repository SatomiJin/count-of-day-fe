import axios from "axios";

export const getDay = async (data) => {
  let res = await axios.post(`${process.env.REACT_APP_API_BACK_END}count/get-day`);
  return res.data;
};

export const plusCount = async (data) => {
  let res = await axios.post(`${process.env.REACT_APP_API_BACK_END}count/plus-count`, data);
  return res.data;
};
