import styles from "@sass/components/button.module.scss";
import classnames from "classnames";
import { DetailedHTMLProps } from "react";
import { IconName } from "../types/IconName";
import Icon from "./Icon";
import Typography, { FontTypes } from "./Typography";

type Sizes = "default" | "small";
export type ButtonVariants = "primary" | "secondary" | "destructive";

type Props = {
  size?: Sizes;
  variant?: ButtonVariants;
  icon?: IconName;
  disabled?: boolean;
  fullWidth?: boolean;
  justIcon?: boolean;
} & DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const Button = ({
  variant = "primary",
  size = "default",
  icon,
  disabled,
  children,
  fullWidth,
  justIcon,
  ...props
}: Props) => {
  const font: { [key in Sizes]: FontTypes } = {
    default: "headline",
    small: "body",
  };
  return (
    <button
      {...props}
      className={classnames(
        styles.main,
        styles[variant],
        styles[size],
        {
          [styles.disabled]: disabled,
        },
        { [styles.fullwidth]: fullWidth },
        { [styles.justIcon]: justIcon },
        props.className,
      )}>
      {icon && <Icon className={styles.icon} name={icon} />}
      {!justIcon && (
        <Typography type={font[size]} bold>
          {children}
        </Typography>
      )}
    </button>
  );
};

export default Button;
