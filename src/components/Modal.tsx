import styles from "@sass/components/modal.module.scss";
import classnames from "classnames";
import { ReactNode } from "react";
import Button, { ButtonVariants } from "./Button";
import ClickToEdit from "./ClickToEdit";
import Icon from "./Icon";
import Menu from "./Menu";
import Typography from "./Typography";

export type ModalProps = {
  visible: boolean;
  onCancel: () => void;
  title?: string;
  menu?: boolean;
  okButtonText?: string;
  deleteButtonText?: string;
  okButton?: boolean;
  deleteButton?: boolean;
  okButtonVariant?: ButtonVariants;
  deleteButtonVariant?: ButtonVariants;
  children?: ReactNode | ReactNode[];
  onOk?: () => void;
  onDelete?: () => void;
  menuContent?: ReactNode | ReactNode[];
  titleEditable?: boolean;
  onTitleEditConfirm?: (value: string) => void;
};

const Modal = ({
  visible,
  onCancel,
  title,
  menu,
  okButton = true,
  deleteButton = true,
  okButtonText = "Accept",
  deleteButtonText = "Cancel",
  okButtonVariant = "secondary",
  deleteButtonVariant = "destructive",
  onDelete,
  onOk,
  menuContent,
  children,
  titleEditable,
  onTitleEditConfirm,
}: ModalProps) => {
  return (
    <div
      className={classnames(styles.wrapper, { [styles.visible]: visible })}
      onClick={onCancel}>
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        <div className={styles.heading}>
          {title &&
            (titleEditable ? (
              <ClickToEdit
                fullWidth
                value={title}
                type="subheading"
                onConfirm={(value) => onTitleEditConfirm?.(value)}
              />
            ) : (
              <Typography type="subheading">{title}</Typography>
            ))}
          {menu && (
            <Menu items={menuContent as any}>
              <div className={styles.menuWrapper}>
                <Icon className={styles.menu} name="ellipsis-vertical" />
              </div>
            </Menu>
          )}
        </div>
        <div className={styles.content}>{children}</div>
        <div className={styles.actions}>
          {deleteButton && (
            <Button
              onClick={onDelete}
              fullWidth
              variant={deleteButtonVariant}
              size="small">
              {deleteButtonText}
            </Button>
          )}
          {okButton && (
            <Button
              type="submit"
              onClick={onOk}
              fullWidth
              variant={okButtonVariant}
              size="small">
              {okButtonText}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
