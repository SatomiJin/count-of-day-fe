import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  firstName: "",
  lastName: "",
  phoneNumber: "",
  roleId: "user",
  access_token: "",
  refresh_token: "",

  gender: "",
  image: "",
};

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      const {
        email = "",
        firstName = "",
        lastName = "",
        phoneNumber = "",
        roleId = "",
        access_token = "",
        refresh_token = "",

        gender = "",
        image = "",
      } = action.payload;

      state.email = email ? email : state.email;
      state.firstName = firstName ? firstName : state.firstName;
      state.lastName = lastName ? lastName : state.lastName;
      state.phoneNumber = phoneNumber ? phoneNumber : state.phoneNumber;
      state.roleId = roleId ? roleId : state.roleId;
      state.access_token = access_token ? access_token : state.access_token;
      state.refresh_token = refresh_token ? refresh_token : state.refresh_token;
      state.gender = gender ? gender : state.gender;
      state.image = image ? image : state.image;
    },
    resetUser: (state) => {
      state.firstName = "";
      state.email = "";
      state.lastName = "";
      state.phoneNumber = "";
      state.roleId = "user";
      state.access_token = "";
      state.refresh_token = "";
      state.gender = "";
      state.image = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateUser, resetUser } = UserSlice.actions;

export default UserSlice.reducer;
