import styles from "@sass/components/column.module.scss";
import { useState } from "react";
import {
  useDeleteColumnMutation,
  useUpdateColumnMutation,
} from "../slices/columnApiSlice";
import { Column as ColumnType, ColumnColors } from "../types/Column";
import { Task } from "../types/Task";
import ClickToEdit from "./ClickToEdit";
import Icon from "./Icon";
import Menu from "./Menu";
import MenuItem from "./MenuItem";
import TaskDetailModal from "./TaskDetailModal";
import Typography from "./Typography";

type Props = {
  column: ColumnType;
  getHoveredColumnId?: (id: number) => void;
  onDragEnd?: () => void;
  setGrabbedTask?: (task: Task) => void;
};

const Column = ({
  column,
  getHoveredColumnId,
  onDragEnd,
  setGrabbedTask,
}: Props) => {
  const { id, name, tasks } = column;
  const [updateColumn] = useUpdateColumnMutation();
  const [deleteColumn] = useDeleteColumnMutation();
  const [selectedTask, setSelectedTask] = useState<number | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const onEditionFinished = (name: string) => {
    updateColumn({ id: id, body: { name } });
  };

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDragEnter={() => getHoveredColumnId?.(id)}
      onDrop={() => onDragEnd?.()}
      className={styles.column}>
      <div className={styles.title}>
        <Menu
          overlayClassName={styles.dotsMenu}
          items={
            <div className={styles.dots}>
              {Object.keys(ColumnColors).map((color, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor:
                      ColumnColors[
                        parseInt(color) as keyof typeof ColumnColors
                      ],
                  }}
                  className={styles.dot}
                  onClick={() =>
                    updateColumn({ id, body: { color: parseInt(color) } })
                  }
                />
              ))}
            </div>
          }>
          <div
            style={{
              backgroundColor:
                ColumnColors[column.color as keyof typeof ColumnColors],
            }}
            className={styles.dot}
          />
        </Menu>

        <ClickToEdit
          capitalized
          value={name}
          onConfirm={onEditionFinished}
          type="label"
        />
        <Menu
          placement="bottom"
          items={
            <MenuItem
              onClick={() => {
                deleteColumn(id);
              }}
              variant="danger"
              icon="trash">
              Delete board
            </MenuItem>
          }>
          <Icon name="ellipsis-vertical" className={styles.titleMenu} />
        </Menu>
      </div>
      <div className={styles.cards}>
        {tasks.map((task, index) => (
          <div
            onClick={() => {
              setSelectedTask(task.id);
              setIsDetailModalOpen(true);
            }}
            draggable
            className={styles.card}
            key={index}
            onDragStart={() => setGrabbedTask?.(task)}>
            <Typography className={styles.title} type="headline">
              {task.title}
            </Typography>
            <Typography
              style={{ color: "var(--grey)", marginTop: 8 }}
              type="body2">
              {task.subtasks.filter((s) => s.completed).length} of{" "}
              {task.subtasks.length} subtasks
            </Typography>
          </div>
        ))}
      </div>
      {selectedTask && (
        <TaskDetailModal
          taskId={selectedTask}
          visible={isDetailModalOpen}
          onCancel={() => setIsDetailModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Column;
