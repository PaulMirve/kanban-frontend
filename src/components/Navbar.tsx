import styles from "@sass/components/navbar.module.scss";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useCommonModal } from "../hooks/useCommonModal";
import { RootState } from "../store";
import AddTaskModal from "./AddTaskModal";
import Button from "./Button";
import Icon from "./Icon";
import Menu from "./Menu";
import MenuItem from "./MenuItem";
import Typography from "./Typography";
import IMG_LOGO from "../assets/logo-icon.png";
import BoardMobileMenu from "./BoardMobileMenu";

const Navbar = () => {
  const [addTaskVisible, setAddTaskVisible] = useState(false);
  const boards = useSelector((state: RootState) => state.boards);
  const columns = useSelector((state: RootState) => state.columns);
  const { openModal } = useCommonModal("delete");
  const { boardId } = useParams<{ boardId: string }>();
  const currentBoardId = parseInt(boardId || "0");
  const navigate = useNavigate();

  const logout = () => {
    localStorage.setItem("token", "");
    navigate("/login");
  };

  return (
    <div className={styles.main}>
      <span className={styles.title}>
        <img className={styles.logo} src={IMG_LOGO} alt="Logo" />
        <Typography type="heading">Platform Launch</Typography>
        <BoardMobileMenu>
          <Icon className={styles.openMenu} name="chevron-down" />
        </BoardMobileMenu>
      </span>
      <span className={styles.actions}>
        <Button
          className={styles.button}
          disabled={!boards.length || !columns.length}
          onClick={() => setAddTaskVisible(true)}
          icon="plus">
          Add new task
        </Button>
        <Button
          onClick={() => setAddTaskVisible(true)}
          justIcon
          icon="plus"
          className={styles.mobileButton}
          disabled={!boards.length || !columns.length}
        />
        <Menu
          items={
            <>
              <MenuItem
                onClick={() => {
                  openModal({
                    type: "BOARD",
                    boardId: currentBoardId,
                  });
                }}
                icon="trash"
                variant="danger">
                Delete board
              </MenuItem>
              <MenuItem onClick={logout} icon="logout">
                Logout
              </MenuItem>
            </>
          }
          placement="bottomLeft">
          <Icon name="ellipsis-vertical" />
        </Menu>
      </span>
      <AddTaskModal
        title="Add task"
        menu
        onCancel={() => setAddTaskVisible(false)}
        visible={addTaskVisible}
      />
    </div>
  );
};

export default Navbar;
