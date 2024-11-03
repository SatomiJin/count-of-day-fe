import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  countOfDay: {},
};

export const CountSlice = createSlice({
  name: "count",
  initialState,
  reducers: {
    updateCount: (state, action) => {
      const { countOfDay = {} } = action.payload;
      state.data = countOfDay ? countOfDay : state.countOfDay;
    },
    plusCount: (state, action) => {
      const { countOfDay } = action.payload;
      let currentDate = new Date().toISOString();
      let oldDate = countOfDay.time.toISOString();

      let currentDateNew = new Date(currentDate);
      let oldDateNew = new Date(oldDate);

      if (
        currentDateNew.getFullYear() >= oldDateNew.getFullYear() &&
        currentDateNew.getMonth() >= oldDateNew.getMonth() &&
        currentDateNew.getDate() >= oldDateNew.getDate()
      ) {
      }
    },
  },
});

export const {} = CountSlice.actions;

export default CountSlice.reducer;
