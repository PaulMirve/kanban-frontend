import styles from "@sass/components/text-area.module.scss";
import classnames from "classnames";
import { FieldHookConfig, useField } from "formik";
import { HTMLProps } from "react";
import { useInputHasErrors } from "../hooks/useInputHasErrors";
import ErrorMessage from "./ErrorMessage";
import Typography from "./Typography";

type Props = { name: string; label?: string } & HTMLProps<HTMLTextAreaElement> &
  Omit<FieldHookConfig<string>, "onChange">;

const TextArea = ({ label, ...props }: Props) => {
  const [field] = useField(props);
  const hasErrors = useInputHasErrors(props.name);
  return (
    <div>
      {label && <Typography className={styles.label}>{label}</Typography>}
      <textarea
        {...props}
        {...field}
        className={classnames(styles.textarea, {
          [styles.error]: hasErrors,
        })}></textarea>
      <ErrorMessage name={props.name} />
    </div>
  );
};

export default TextArea;
