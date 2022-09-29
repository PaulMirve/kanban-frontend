import styles from "@sass/components/text-input.module.scss";
import classnames from "classnames";
import { FieldHookConfig, useField } from "formik";
import { HTMLProps } from "react";
import { useInputHasErrors } from "../hooks/useInputHasErrors";
import ErrorMessage from "./ErrorMessage";
import Typography from "./Typography";

type Props = {
  name: string;
  label?: string;
  wrapperProps?: HTMLProps<HTMLDivElement>;
  fullWidth?: boolean;
} & HTMLProps<HTMLInputElement> &
  Omit<FieldHookConfig<string>, "onChange">;

const TextInput = ({ label, wrapperProps, fullWidth, ...props }: Props) => {
  const [field] = useField(props);
  const hasErrors = useInputHasErrors(props.name);

  return (
    <div
      {...wrapperProps}
      className={classnames(wrapperProps?.className, {
        [styles.fullwidth]: fullWidth,
      })}>
      {label && <Typography className={styles.label}>{label}</Typography>}
      <input
        {...field}
        {...props}
        className={classnames(
          styles.input,
          { [styles.error]: hasErrors },
          props.className,
        )}
      />
      <ErrorMessage name={props.name} />
    </div>
  );
};

export default TextInput;
