import styles from "@sass/pages/main.module.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button";
import Column from "../components/Column";
import Icon from "../components/Icon";
import LoadingSpinner from "../components/LoadingSpinner";
import Typography from "../components/Typography";
import { loadColumns } from "../reducers/columns.reducer";
import {
  useCreateBoardMutation,
  useGetBoardQuery,
} from "../slices/boardApiSlice";
import {
  useCreateColumnMutation,
  useGetColumnsQuery,
  useUpdateTaskMutation,
} from "../slices/columnApiSlice";
import { RootState } from "../store";
import { Task } from "../types/Task";
const Main = () => {
  const [createColumn] = useCreateColumnMutation();
  const [createBoard] = useCreateBoardMutation();
  const { boardId } = useParams<{ boardId: string }>();
  const currentBoardId = parseInt(boardId || "0");
  const { data: currentBoard, isLoading: boardLoading } =
    useGetBoardQuery(currentBoardId);
  const { data, isLoading: columnsLoading } =
    useGetColumnsQuery(currentBoardId);
  const dispatch = useDispatch();
  const columns = data || [];
  const [updateTask] = useUpdateTaskMutation();
  const navigate = useNavigate();
  const boards = useSelector((state: RootState) => state.boards);

  const [grabbedTask, setGrabbedTask] = useState<Task | null>(null);
  const [hoveredColumn, setHoveredColumn] = useState<number | null>(null);

  useEffect(() => {
    if (boards.length > 0) {
      navigate(`/${boards[0].id}`);
    }
  }, [boards]);

  useEffect(() => {
    if (!currentBoard && !boardLoading) {
      navigate("/");
    }
  }, [currentBoard, boardLoading]);

  const onDragEnd = () => {
    if (!hoveredColumn || !grabbedTask) return;
    const task = { ...grabbedTask };
    task.column = hoveredColumn;
    updateTask({ id: grabbedTask.id, body: task });
  };

  const create = async () => {
    if (!boards.length) {
      const board = await createBoard().unwrap();
      navigate(`/${board.id}`);
    } else {
      createColumn(currentBoardId);
    }
  };

  useEffect(() => {
    dispatch(loadColumns(data || []));
  }, [data]);

  if (boardLoading || columnsLoading) {
    return (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "grid",
          placeItems: "center",
        }}>
        <LoadingSpinner />
      </div>
    );
  }
  return (
    <>
      {columns.length === 0 ? (
        <div className={styles.main}>
          <span>
            <Typography type="headline">
              {!boards.length
                ? "You don't have any board. Create one to start managing your tasks."
                : "This board is empty. Create a new column to get started."}
            </Typography>
            <Button onClick={create} style={{ marginTop: 32 }} icon="plus">
              {!boards.length ? "Create new board" : "Add new column"}
            </Button>
          </span>
        </div>
      ) : (
        <div
          style={{
            gridTemplateColumns: `repeat(${columns.length + 1}, 28rem)`,
          }}
          className={styles.columns}>
          {columns.map((column, index) => (
            <Column
              key={index}
              column={column}
              getHoveredColumnId={(id) => {
                setHoveredColumn(id);
              }}
              setGrabbedTask={setGrabbedTask}
              onDragEnd={() => {
                if (hoveredColumn !== grabbedTask?.column) {
                  onDragEnd();
                }
              }}
            />
          ))}
          <div onClick={create} className={styles.newColumn}>
            <Icon name="plus" />
            <Typography className={styles.newColumnText} type="heading">
              New column
            </Typography>
          </div>
        </div>
      )}
    </>
  );
};

export default Main;
