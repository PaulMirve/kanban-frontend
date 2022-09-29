import { useSelector } from "react-redux";
import { RootState } from "../store";

export const useAppSelector = <T>(value: (state: RootState) => T) =>
  useSelector(value);
