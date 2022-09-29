import styles from "@sass/pages/sign-in.module.scss";
import classNames from "classnames";
import { Form, Formik } from "formik";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import LOGO from "../assets/logo-light.png";
import * as Yup from "yup";
import { useSignUpMutation } from "../slices/authApiSlice";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [signUp] = useSignUpMutation();
  const navigate = useNavigate();
  const onSubmit = async (
    email: string,
    firstName: string,
    lastName: string,
    password: string,
  ) => {
    await signUp({ email, firstName, lastName, password });
    navigate("/login");
  };
  return (
    <div className={classNames("light", styles.signIn)}>
      <Formik
        initialValues={{
          email: "",
          firstName: "",
          lastName: "",
          password: "",
        }}
        validationSchema={Yup.object({
          email: Yup.string().required("Email is required"),
          firstName: Yup.string().required("First name is required"),
          lastName: Yup.string().required("Last name is required"),
          password: Yup.string().required("Password is required"),
        })}
        onSubmit={({ email, firstName, lastName, password }) =>
          onSubmit(email, firstName, lastName, password)
        }>
        {() => (
          <Form className={styles.form}>
            <img
              width={156}
              height={26}
              src={LOGO}
              alt="Logo"
              style={{ marginBottom: 20 }}
            />
            <TextInput fullWidth label="Email" name="email" />
            <TextInput fullWidth label="First name" name="firstName" />
            <TextInput fullWidth label="Last name" name="lastName" />
            <TextInput
              type="password"
              fullWidth
              label="Password"
              name="password"
            />
            <Button type="submit" fullWidth style={{ marginTop: 10 }}>
              Create account
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignIn;
