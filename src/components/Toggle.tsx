import styles from "@sass/components/toggle.module.scss";
import classnames from "classnames";

type Props = {
  value: boolean;
  onChange?: (value: boolean) => void;
};

const Toggle = ({ value, onChange }: Props) => {
  return (
    <div
      onClick={() => onChange?.(!value)}
      className={classnames(styles.main, { [styles.active]: value })}></div>
  );
};

export default Toggle;
