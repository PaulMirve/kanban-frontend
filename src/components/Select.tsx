import { Select as AntdSelect, SelectProps } from "antd";
import classNames from "classnames";
import styles from "@sass/components/select.module.scss";
import Typography from "./Typography";

type Props = {
  label?: string;
} & SelectProps;

const Select = ({ label, ...props }: Props) => {
  return (
    <div>
      {label && <Typography className={styles.label}>{label}</Typography>}
      <AntdSelect
        {...props}
        className={classNames(styles.select, props.className)}
        popupClassName={classNames(styles.dropdown, "light")}
      />
    </div>
  );
};

export default Select;
