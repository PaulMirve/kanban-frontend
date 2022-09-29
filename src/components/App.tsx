import styles from "@sass/components/app.module.scss";
import classnames from "classnames";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate, useRoutes } from "react-router-dom";
import { useAppSelector } from "../hooks/useAppSelector";
import { useThemeContext } from "../hooks/useThemeContex";
import { loadBoards } from "../reducers/board.reducer";
import { loadUser } from "../reducers/user.reducer";
import { routes } from "../router/routes";
import { useIsAuthenticatedQuery } from "../slices/authApiSlice";
import { useGetBoardsQuery } from "../slices/boardApiSlice";
import DeleteModal from "./DeleteModal";
import LoadingSpinner from "./LoadingSpinner";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import LOGO_LIGHT from "../assets/logo-light.png";
import LOGO_DARK from "../assets/logo-dark.png";

const App = () => {
  const { data: user, isLoading: authLoading } = useIsAuthenticatedQuery();
  const { data, isLoading: boardsLoading } = useGetBoardsQuery();
  const boards = data || [];
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loggedUser = useAppSelector((state) => state.user);
  const routing = useRoutes(routes(!!loggedUser));
  const { theme } = useThemeContext();

  useEffect(() => {
    if (!boardsLoading) {
      dispatch(loadBoards(boards));
      if (boards.length > 0) {
        navigate(`/${boards[0].id}`);
      }
    }
  }, [boards]);

  useEffect(() => {
    if (user) dispatch(loadUser(user));
  }, [user]);

  if (authLoading) {
    return (
      <div
        style={{
          height: "100vh",
          width: "100%",
          display: "grid",
          placeItems: "center",
        }}>
        <span
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
          }}>
          <img
            width={156}
            height={26}
            src={theme === "light" ? LOGO_LIGHT : LOGO_DARK}
            alt="Logo"
          />
          <LoadingSpinner width="30px" />
        </span>
      </div>
    );
  }

  return <>{routing}</>;
};

export const Layout = () => {
  const { theme } = useThemeContext();

  return (
    <div className={classnames(styles.main, [theme])}>
      <Sidebar />
      <div className={styles.container}>
        <Navbar />
        <div className={styles.content}>
          <Outlet />
        </div>
      </div>
      <DeleteModal />
    </div>
  );
};

export default App;
