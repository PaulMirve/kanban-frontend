import { combineSlices } from "./combineSlices";
import { commonModalsSlice } from "../reducers/common-modals.reducer";

export const { reducers: modalReducers, actions: commonModalActions } =
  combineSlices([
    commonModalsSlice<{
      type: "TASK" | "BOARD";
      boardId?: number;
      taskId?: number;
    }>()("delete"),
  ]);
