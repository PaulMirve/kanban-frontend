import styles from "@sass/components/menu.module.scss";
import { Dropdown, DropdownProps, Menu as AntdMenu } from "antd";
import classNames from "classnames";
import { ReactNode } from "react";
import { useThemeContext } from "../hooks/useThemeContex";

type Props = { items?: ReactNode | ReactNode[] } & Omit<
  DropdownProps,
  "overlay"
>;

const Menu = ({ children, items, ...props }: Props) => {
  const { theme } = useThemeContext();
  return (
    <Dropdown
      overlay={<AntdMenu>{items}</AntdMenu>}
      trigger={["click"]}
      className={classNames(props.className)}
      overlayClassName={classNames(theme, styles.menu, props.overlayClassName)}>
      {children}
    </Dropdown>
  );
};

export default Menu;
