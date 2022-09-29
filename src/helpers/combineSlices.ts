import {
  CaseReducerActions,
  combineReducers,
  Reducer,
  Slice,
  SliceCaseReducers,
} from "@reduxjs/toolkit";
import { Modal } from "../reducers/common-modals.reducer";
import { ModalName } from "../types/ModalName";

export const combineSlices = <T extends Slice[]>(slices: T) => {
  const reducers = slices.reduce(
    (obj, slice) => ({
      ...obj,
      [slice.name]: slice.reducer,
    }),
    {} as {
      [name in ModalName]: Reducer<Modal<T>>;
    },
  );

  const actions = slices.reduce(
    (obj, reducer) => ({
      ...obj,
      [reducer.name]: reducer.actions,
    }),
    {} as { [name in ModalName]: CaseReducerActions<SliceCaseReducers<any>> },
  );
  return {
    reducers: combineReducers(reducers),
    actions,
  };
};
