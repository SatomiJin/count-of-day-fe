import { createSlice } from "@reduxjs/toolkit";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
const initialState = {
  newMess: "",
  data: [],
};

export const NoteSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    updateMessageNote: (state, action) => {
      const { data = [] } = action.payload;

      state.data = data ? data : state.data;
    },

    addNewMessage: (state, action) => {
      let { note } = action.payload;

      state.data.push(note);
    },
    resetMessageNote: (state) => {
      state.data = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateMessageNote, addNewMessage, resetMessageNote } = NoteSlice.actions;

export default NoteSlice.reducer;
