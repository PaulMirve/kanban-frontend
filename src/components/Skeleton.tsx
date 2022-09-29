import styles from "@sass/components/skeleton.module.scss";
import classNames from "classnames";
import { HTMLProps } from "react";

type Props = {
  shape?: "rounded" | "squared";
} & HTMLProps<HTMLDivElement>;

const Skeleton = ({
  height = 10,
  width = "100%",
  shape = "rounded",
  style,
  className,
  ...props
}: Props) => {
  return (
    <div
      {...props}
      style={{ ...style, height, width }}
      className={classNames(styles.skeleton, styles[shape], className)}
    />
  );
};

export default Skeleton;
