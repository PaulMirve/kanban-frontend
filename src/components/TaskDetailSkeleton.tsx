import styles from "@sass/components/task-detail-skeleton.module.scss";
import Skeleton from "./Skeleton";

const TaskDetailSkeleton = () => {
  return (
    <div className={styles.taskDetailSkeleton}>
      <Skeleton shape="squared" height={70} />
      <Skeleton
        shape="squared"
        height={15}
        width={90}
        style={{ marginTop: 24 }}
      />
      <Skeleton shape="squared" height={40} style={{ marginTop: 16 }} />
      <Skeleton shape="squared" height={40} style={{ marginTop: 8 }} />
      <Skeleton shape="squared" height={60} style={{ marginTop: 8 }} />
      <Skeleton
        shape="squared"
        height={15}
        width={90}
        style={{ marginTop: 24 }}
      />
      <Skeleton shape="squared" height={40} style={{ marginTop: 8 }} />
    </div>
  );
};

export default TaskDetailSkeleton;
