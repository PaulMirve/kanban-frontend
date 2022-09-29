import styles from "@sass/pages/login.module.scss";
import classnames from "classnames";
import { Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import LOGO_LIGHT from "../assets/logo-light.png";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import Typography from "../components/Typography";
import { loadBoards } from "../reducers/board.reducer";
import { loadUser } from "../reducers/user.reducer";
import {
  useLazyIsAuthenticatedQuery,
  useLoginMutation,
} from "../slices/authApiSlice";
import { useLazyGetBoardsQuery } from "../slices/boardApiSlice";

const Login = () => {
  const [login] = useLoginMutation();
  const [isAuthenticated] = useLazyIsAuthenticatedQuery();
  const [getBoards] = useLazyGetBoardsQuery();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onSubmit = async (email: string, password: string) => {
    try {
      const { access } = await login({ email, password }).unwrap();
      localStorage.setItem("token", access);
      const user = await isAuthenticated().unwrap();
      dispatch(loadUser(user));
      const boards = await getBoards().unwrap();
      dispatch(loadBoards(boards));
      navigate(!boards.length ? "/" : `/${boards[0].id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={classnames(styles.main, "light")}>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={({ email, password }) => onSubmit(email, password)}
        validationSchema={Yup.object({
          email: Yup.string().required("Email is required"),
          password: Yup.string().required("Password is required"),
        })}>
        {() => (
          <Form className={styles.form}>
            <img width={156} height={26} src={LOGO_LIGHT} alt="Logo" />
            <TextInput name="email" fullWidth label="Email" />
            <TextInput
              name="password"
              fullWidth
              label="Password"
              type="password"
            />
            <Button style={{ marginTop: "1rem" }} fullWidth>
              Login
            </Button>
            <Typography>
              Don&apos;t have an account?{" "}
              <Link to={"/sign-in"}>Click here!</Link>
            </Typography>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
