import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCommonModal } from "../hooks/useCommonModal";
import { removeBoard } from "../reducers/board.reducer";
import { useDeleteBoardMutation } from "../slices/boardApiSlice";
import { useDeleteTaskMutation } from "../slices/columnApiSlice";
import { RootState } from "../store";
import Modal from "./Modal";
import Typography from "./Typography";

const DeleteModal = () => {
  const { isVisible, closeModal, data } = useCommonModal("delete");
  const { type, boardId, taskId } = data as unknown as {
    type: "BOARD" | "TASK";
    boardId?: number;
    taskId?: number;
  };
  const [deleteBoard] = useDeleteBoardMutation();
  const [deleteTask] = useDeleteTaskMutation();
  const boards = useSelector((state: RootState) => state.boards);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const texts = {
    BOARD: {
      text: (
        <Typography>
          Are you sure you want to delete the{" "}
          <b>{boards.find((b) => b.id === boardId)?.name}</b> board? This action
          will remove all columns and tasks and cannot be reversed.
        </Typography>
      ),
      onDelete: async () => {
        if (!boardId) return;
        await deleteBoard(boardId);
        const filteredBoards = boards.filter((b) => b.id !== boardId);
        dispatch(removeBoard(boardId));
        if (filteredBoards.length === 0) {
          navigate("/");
        } else {
          navigate(`/${filteredBoards[filteredBoards.length - 1].id}`);
        }
        closeModal();
      },
    },
    TASK: {
      text: (
        <Typography>
          Are you sure you want to delete this task and its subtasks? This
          action cannot be reversed.
        </Typography>
      ),
      onDelete: () => {
        if (!taskId) return;
        deleteTask(taskId);
      },
    },
  };

  return (
    <Modal
      deleteButtonText="Delete"
      okButtonText="Cancel"
      visible={isVisible}
      onCancel={closeModal}
      onOk={closeModal}
      onDelete={() => {
        texts[type as "TASK" | "BOARD"]?.onDelete();
        closeModal();
      }}
      title={`Delete this ${type === "BOARD" ? "board" : "task"}?`}>
      {texts[type as "TASK" | "BOARD"]?.text}
    </Modal>
  );
};

export default DeleteModal;
