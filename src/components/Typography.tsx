import { HTMLProps } from "react";
import classnames from "classnames";
import styles from "@sass/components/typography.module.scss";

export type FontTypes =
  | "heading"
  | "subheading"
  | "headline"
  | "label"
  | "body"
  | "body2";

type Props = {
  type?: FontTypes;
  capitalized?: boolean;
  bold?: boolean;
} & HTMLProps<HTMLParagraphElement>;

const Typography = ({
  children,
  className,
  type = "body",
  capitalized,
  bold,
  ...props
}: Props) => {
  return (
    <p
      {...props}
      className={classnames(
        styles[type],
        { [styles.capitalized]: capitalized },
        { [styles.bold]: bold },
        className,
      )}>
      {children}
    </p>
  );
};

export default Typography;
