import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ModalStatus = "OPEN" | "CLOSED";

type InitialState = { status: ModalStatus };
export type Modal<T = void> = { status: ModalStatus; data: T };

const INITIAL_STATE: InitialState = { status: "CLOSED" };

export const commonModalsSlice =
  <T>(initialData: T | void) =>
  <Name extends string>(name: Name) => {
    const reducer = (state: unknown, action: PayloadAction<Modal<T>>) =>
      action.payload;
    return createSlice<Modal<T>, { setModal: typeof reducer }, Name>({
      name,
      initialState: { ...INITIAL_STATE, ...initialData } as any,
      reducers: {
        setModal: reducer,
      },
    });
  };
