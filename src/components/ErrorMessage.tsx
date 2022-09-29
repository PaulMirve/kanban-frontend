import styles from "@sass/components/error-message.module.scss";
import { ErrorMessage as FormikErrorMessage } from "formik";

type Props = { name: string };

const ErrorMessage = ({ name }: Props) => {
  return (
    <FormikErrorMessage
      className={styles.errorMessage}
      name={name}
      component="p"></FormikErrorMessage>
  );
};

export default ErrorMessage;
