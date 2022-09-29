import styles from "@sass/components/menu-item.module.scss";
import { Menu, MenuItemProps } from "antd";
import classnames from "classnames";
import { IconName } from "../types/IconName";
import Icon from "./Icon";
import Typography from "./Typography";

type Props = {
  icon?: IconName;
  variant?: "default" | "danger";
} & MenuItemProps;

const colors = {
  default: "grey",
  danger: "danger",
};

const MenuItem = ({
  icon,
  variant = "default",
  className,
  children,
  ...props
}: Props) => {
  return (
    <Menu.Item {...props}>
      <div className={classnames(styles.menuItem, className)}>
        {icon && (
          <Icon
            style={{
              color: `var(--${colors[variant]})`,
              fill: `var(--${colors[variant]})`,
            }}
            className={styles.icon}
            name={icon}
          />
        )}
        <Typography style={{ color: `var(--${colors[variant]})` }}>
          {children}
        </Typography>
      </div>
    </Menu.Item>
  );
};

export default MenuItem;
