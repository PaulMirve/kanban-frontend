import styles from "@sass/components/checkbox.module.scss";
import { HTMLProps, useState } from "react";
import Icon from "./Icon";
import classnames from "classnames";

type Props = {
  value: boolean;
  onChange?: (value: boolean) => void;
} & Omit<HTMLProps<HTMLDivElement>, "value" | "onClick" | "onChange">;

const Checkbox = ({ value, onChange, ...props }: Props) => {
  const [checked, setChecked] = useState<boolean>(value);
  return (
    <div
      {...props}
      onClick={() => {
        setChecked(!checked);
        onChange?.(!checked);
      }}
      className={classnames(styles.checkbox, { [styles.selected]: checked })}>
      {checked && <Icon className={styles.check} name="check" />}
    </div>
  );
};

export default Checkbox;
