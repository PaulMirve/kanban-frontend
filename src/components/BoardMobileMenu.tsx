import { Dropdown, Menu } from "antd";
import styles from "@sass/components/board-mobile-menu.module.scss";
import { ReactNode } from "react";
import Typography from "./Typography";
import classNames from "classnames";
import { useThemeContext } from "../hooks/useThemeContex";
import { useAppSelector } from "../hooks/useAppSelector";
import Icon from "./Icon";
import { useNavigate, useParams } from "react-router-dom";
import Toggle from "./Toggle";
import { useCreateBoardMutation } from "../slices/boardApiSlice";

type Props = {
  children: ReactNode | ReactNode[];
};

const Item = Menu.Item;

const BoardMobileMenu = ({ children }: Props) => {
  const { theme, setTheme } = useThemeContext();
  const boards = useAppSelector((state) => state.boards);
  const [createBoard] = useCreateBoardMutation();
  const navigate = useNavigate();
  const { boardId } = useParams<{ boardId: string }>();
  const currentBoardId = parseInt(boardId || "0");

  return (
    <Dropdown
      placement="bottom"
      className={styles.mobileMenu}
      overlayClassName={styles.dropdown}
      overlay={
        <Menu className={classNames(theme)}>
          <div className={styles.menu}>
            <Typography className={styles.title} type="label" capitalized>
              All boards ({boards.length})
            </Typography>
            <div className={styles.boards}>
              {boards.map(({ id, name }) => (
                <Item
                  key={id}
                  onClick={() => navigate(`/${id}`)}
                  className={classNames(styles.menuItem, {
                    [styles.active]: currentBoardId === id,
                  })}>
                  <Icon name="grid" className={styles.icon} />
                  <Typography type="headline">{name}</Typography>
                </Item>
              ))}
              <Item onClick={() => createBoard()} className={styles.menuItem}>
                <Icon
                  style={{ fill: "var(--primary)" }}
                  className={styles.icon}
                  name="grid"
                />
                <Icon
                  name="plus"
                  className={styles.icon}
                  style={{ marginRight: -8, color: "var(--primary)" }}
                />
                <Typography style={{ color: "var(--primary)" }} type="headline">
                  Create new board
                </Typography>
              </Item>
            </div>
            <div className={styles.theme}>
              <Icon name="sunny" />
              <Toggle
                value={theme === "dark"}
                onChange={(value) => {
                  setTheme(value ? "dark" : "light");
                }}
              />
              <Icon name="moon" />
            </div>
          </div>
        </Menu>
      }>
      {children}
    </Dropdown>
  );
};

export default BoardMobileMenu;
