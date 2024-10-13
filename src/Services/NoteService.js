import axios from "axios";

export const getAllMessage = async (data) => {
  let res = await axios.get(`${process.env.REACT_APP_API_BACK_END}note/get-all-note`, {
    headers: {
      email: data.email,
    },
  });
  return res.data;
};

export const createMessage = async (data) => {
  let res = await axios.post(`${process.env.REACT_APP_API_BACK_END}note/create-note`, data);
  return res.data;
};
