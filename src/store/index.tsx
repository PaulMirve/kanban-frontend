import { configureStore } from "@reduxjs/toolkit";
import { modalReducers } from "../helpers/CommonModal";
import boardsReducer from "../reducers/board.reducer";
import columnsReducer from "../reducers/columns.reducer";
import userReducer from "../reducers/user.reducer";
import { authApiSlice } from "../slices/authApiSlice";
import { boardApiSlice } from "../slices/boardApiSlice";
import { columnApiSlice } from "../slices/columnApiSlice";

export const store = configureStore({
  reducer: {
    boards: boardsReducer,
    columns: columnsReducer,
    modals: modalReducers,
    user: userReducer,
    [boardApiSlice.reducerPath]: boardApiSlice.reducer,
    [columnApiSlice.reducerPath]: columnApiSlice.reducer,
    [authApiSlice.reducerPath]: authApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(boardApiSlice.middleware)
      .concat(authApiSlice.middleware)
      .concat(columnApiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
