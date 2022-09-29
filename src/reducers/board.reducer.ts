import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Board } from "../types/Board";

const initialState: Board[] = [];

export const boardsSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    loadBoards: (state, { payload }: PayloadAction<Board[]>) => {
      return [...payload];
    },
    removeBoard: (state, { payload }: PayloadAction<number>) => {
      const newState = [...state];
      return newState.filter((board) => board.id !== payload);
    },
  },
});

export const { loadBoards, removeBoard } = boardsSlice.actions;

export default boardsSlice.reducer;
