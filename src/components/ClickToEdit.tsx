import styles from "@sass/components/click-to-edit.module.scss";
import classNames from "classnames";
import { HTMLProps, KeyboardEvent, useState } from "react";
import Typography, { FontTypes } from "./Typography";

type CommonProps = {
  value: string;
  onConfirm?: (value: string) => void;
  capitalized?: boolean;
  type?: FontTypes;
  fullWidth?: boolean;
  labelClassName?: string;
  disabled?: boolean;
};

type InputProps = { component?: "input" } & CommonProps;

type TextAreaProps = {
  component?: "textarea";
} & HTMLProps<HTMLTextAreaElement> &
  CommonProps;

type Props = InputProps | TextAreaProps;

const ClickToEdit = ({
  value,
  onConfirm,
  type = "body",
  capitalized,
  fullWidth,
  component = "input",
  labelClassName,
  disabled,
  ...props
}: Props) => {
  const [editable, setEditable] = useState(false);
  const [textValue, setTextValue] = useState(value);

  const onCancel = () => {
    setEditable(false);
    setTextValue(value);
  };

  const handleConfirm = () => {
    setEditable(false);
    onConfirm?.(textValue);
  };

  const handleOnBlur = () => {
    handleConfirm();
  };

  const handleKeyDownEvent = (
    event: KeyboardEvent<HTMLInputElement> | KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleConfirm();
    } else if (event.key === "Escape") {
      event.preventDefault();
      onCancel();
    }
  };

  if (editable) {
    if (component === "input") {
      return (
        <input
          autoFocus
          value={textValue}
          onChange={(e) => setTextValue(e.currentTarget.value)}
          onKeyDown={handleKeyDownEvent}
          onBlur={handleOnBlur}
          className={classNames(
            styles.input,
            styles[type],
            {
              [styles.capitalized]: capitalized,
            },
            { [styles.fullWidth]: fullWidth },
          )}
        />
      );
    } else {
      return (
        <textarea
          {...props}
          autoFocus
          value={textValue}
          onChange={(e) => setTextValue(e.currentTarget.value)}
          className={classNames(
            styles.textarea,
            styles[type],
            {
              [styles.capitalized]: capitalized,
            },
            { [styles.fullWidth]: fullWidth },
          )}
          onKeyDown={handleKeyDownEvent}
          onBlur={handleOnBlur}
        />
      );
    }
  } else {
    return (
      <Typography
        onClick={() => {
          !disabled && setEditable(true);
        }}
        capitalized={capitalized}
        className={classNames(styles.textLabel, labelClassName, {
          [styles.disabled]: disabled,
        })}
        type={type}>
        {value}
      </Typography>
    );
  }
};

export default ClickToEdit;
