import axios from "axios";
export const axiosJWT = axios.create();

export const signIn = async (data) => {
  let res = await axios.post(`${process.env.REACT_APP_API_BACK_END}user/sign-in`, data);
  return res.data;
};

export const getDetailUser = async (data) => {
  let res = await axios.get(`${process.env.REACT_APP_API_BACK_END}user/get-detail-user`, {
    headers: {
      email: data.email,
    },
  });
  return res.data;
};

export const refreshToken = async (data) => {
  let res = await axios.post(`${process.env.REACT_APP_API_BACK_END}user/refresh-token`, data.token);
  return res.data;
};

export const updateUser = async (data) => {
  let res = await axios.put(`${process.env.REACT_APP_API_BACK_END}user/update-profile`, data);
  return res.data;
};
