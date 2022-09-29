import styles from "@sass/components/sidebar.module.scss";
import classnames from "classnames";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import LOGO_DARK from "../assets/logo-dark.png";
import LOGO_LIGHT from "../assets/logo-light.png";
import { useThemeContext } from "../hooks/useThemeContex";
import {
  useCreateBoardMutation,
  useUpdateBoardMutation,
} from "../slices/boardApiSlice";
import { RootState } from "../store";
import ClickToEdit from "./ClickToEdit";
import Icon from "./Icon";
import Toggle from "./Toggle";
import Typography from "./Typography";

const Sidebar = () => {
  const [createBoard] = useCreateBoardMutation();
  const { theme, setTheme } = useThemeContext();
  const [hidden, setHidden] = useState(
    (localStorage.getItem("sidebarHidden") == "true" ? true : false) || false,
  );
  const { boardId } = useParams<{ boardId: string }>();
  const boards = useSelector((state: RootState) => state.boards);
  const navigate = useNavigate();
  const [updateBoard] = useUpdateBoardMutation();

  return (
    <>
      <div className={classnames(styles.sidebar, { [styles.hidden]: hidden })}>
        <div className={styles.title}>
          <img
            src={theme === "light" ? LOGO_LIGHT : LOGO_DARK}
            alt="Logo light"
            style={{ marginLeft: 34, marginTop: 32 }}
          />
        </div>
        <Typography
          type="label"
          capitalized
          style={{ marginBottom: 19, marginLeft: 32 }}>
          All boards ({boards.length})
        </Typography>
        <div className={styles.list}>
          {boards.map(({ id, name }) => (
            <div
              key={id}
              onClick={() => navigate(`/${id}`)}
              className={classnames(styles.item, {
                [styles.selected]: id === parseInt(boardId || ""),
              })}>
              <Icon name="grid" />
              <ClickToEdit
                value={name}
                type="headline"
                onConfirm={(name) => updateBoard({ id, body: { name } })}
              />
            </div>
          ))}
          <div
            onClick={async () => {
              const board = await createBoard().unwrap();
              navigate(`/${board.id}`);
            }}
            className={classnames(styles.createNewBoard)}>
            <Icon name="grid" />
            <span>
              <Icon name="plus" />
              <Typography type="headline">Create new board</Typography>
            </span>
          </div>
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
        <div
          className={styles.hide}
          onClick={() => {
            setHidden(true);
            localStorage.setItem("sidebarHidden", "true");
          }}>
          <Icon name="eye-off-outline" />
          <Typography type="headline">Hide Sidebar</Typography>
        </div>
      </div>
      {hidden && (
        <div
          onClick={() => {
            setHidden(false);
            localStorage.setItem("sidebarHidden", "false");
          }}
          className={styles.show}>
          <Icon name="eye" />
        </div>
      )}
    </>
  );
};

export default Sidebar;
