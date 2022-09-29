import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Column } from "../types/Column";

type ColumnsState = Column[];

const initialState: ColumnsState = [];

export const columnsSlice = createSlice({
  name: "columns",
  initialState,
  reducers: {
    loadColumns: (
      state,
      { payload }: PayloadAction<Column[]>,
    ): ColumnsState => {
      return [...payload];
    },
  },
});

export const { loadColumns } = columnsSlice.actions;

export default columnsSlice.reducer;
