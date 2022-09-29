import styles from "@sass/components/task-detail-modal.module.scss";
import classnames from "classnames";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useCommonModal } from "../hooks/useCommonModal";
import {
  useGetTaskQuery,
  useUpdateSubtaskMutation,
  useUpdateTaskMutation,
} from "../slices/columnApiSlice";
import { RootState } from "../store";
import Checkbox from "./Checkbox";
import ClickToEdit from "./ClickToEdit";
import LoadingSpinner from "./LoadingSpinner";
import MenuItem from "./MenuItem";
import Modal, { ModalProps } from "./Modal";
import Select from "./Select";
import TaskDetailSkeleton from "./TaskDetailSkeleton";
import Typography from "./Typography";

type Props = { taskId: number } & ModalProps;

const TaskDetailModal = ({ taskId, ...props }: Props) => {
  const { data: task, isLoading, isFetching } = useGetTaskQuery(taskId);
  const [updateSubtask] = useUpdateSubtaskMutation();
  const [updateTask] = useUpdateTaskMutation();
  const columns = useSelector((state: RootState) => state.columns);
  const [status, setStatus] = useState(columns[0].id);
  const { openModal } = useCommonModal("delete");

  const menu = (
    <MenuItem
      onClick={() => {
        openModal({ type: "TASK", taskId });
        props.onCancel();
      }}
      icon="trash"
      variant="danger">
      Delete task
    </MenuItem>
  );

  const content = (
    <>
      <ClickToEdit
        value={task?.description || ""}
        component="textarea"
        rows={5}
        labelClassName={styles.grey}
        onConfirm={(description) =>
          updateTask({ id: taskId, body: { description } })
        }
      />
      <Typography
        style={{ marginTop: 24, marginBottom: 16 }}
        className={styles.grey}
        type="body2">
        Subtasks ({task?.subtasks.filter((s) => s.completed).length} of{" "}
        {task?.subtasks.length})
      </Typography>
      <div className={styles.subtasks}>
        {task?.subtasks.map(({ id, description, completed }) => (
          <div
            key={id}
            className={classnames(styles.subtask, {
              [styles.completed]: completed,
            })}>
            <Checkbox
              value={completed}
              onChange={(completed) =>
                updateSubtask({ id, body: { completed } })
              }
            />
            <ClickToEdit
              value={description}
              style={{ color: "var(--dark-grey)" }}
              type="body2"
              fullWidth
              disabled={completed}
              onConfirm={(description) =>
                updateSubtask({ id, body: { description } })
              }
            />
          </div>
        ))}
      </div>
      <Typography
        style={{ marginTop: 24, marginBottom: 16 }}
        className={styles.grey}
        type="body2">
        Current status
      </Typography>
      <Select
        value={status}
        options={columns.map(({ id, name }) => ({
          label: name,
          value: id,
        }))}
        onChange={(value) => {
          setStatus(value);
          updateTask({ id: taskId, body: { column: value } });
        }}
      />
    </>
  );

  return (
    <Modal
      {...props}
      okButton={false}
      deleteButton={false}
      menu
      menuContent={menu}
      titleEditable
      onTitleEditConfirm={(title) =>
        updateTask({ id: taskId, body: { title } })
      }
      title={task?.title}>
      {isLoading || isFetching ? (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "grid",
            placeItems: "center",
          }}>
          <TaskDetailSkeleton />
        </div>
      ) : (
        content
      )}
    </Modal>
  );
};

export default TaskDetailModal;
