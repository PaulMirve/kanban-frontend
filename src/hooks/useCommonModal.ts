import { useDispatch, useSelector } from "react-redux";
import { commonModalActions } from "../helpers/CommonModal";
import { RootState } from "../store";
import { ModalName } from "../types/ModalName";

export const useCommonModal = <T extends ModalName>(name: T) => {
  const dispatch = useDispatch();
  const { status, ...data } = useSelector(
    (state: RootState) => state.modals[name],
  );
  const { setModal } = commonModalActions[name];
  const isVisible = status === "OPEN";
  return {
    isVisible,
    openModal: (data?: any) => dispatch(setModal({ status: "OPEN", ...data })),
    closeModal: () => dispatch(setModal({ status: "CLOSE" })),
    data,
  };
};
