import { createSlice } from "@reduxjs/toolkit";
import { User } from "../types/User";

const initialState: User | null = null;

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    loadUser: (state, { payload }) => {
      return payload;
    },
  },
});

export const { loadUser } = userSlice.actions;

export default userSlice.reducer;
