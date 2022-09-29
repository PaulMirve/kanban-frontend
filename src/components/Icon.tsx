/// <reference types="vite-plugin-svgr/client" />
import { FunctionComponent, SVGProps } from "react";
import { ReactComponent as Moon } from "../assets/icons/moon.svg";
import { ReactComponent as Sunny } from "../assets/icons/sunny.svg";
import { ReactComponent as EllipsisVertical } from "../assets/icons/ellipsis-vertical.svg";
import { ReactComponent as Plus } from "../assets/icons/add.svg";
import { ReactComponent as Grid } from "../assets/icons/grid.svg";
import { ReactComponent as EyeOffOutline } from "../assets/icons/eye-off-outline.svg";
import { ReactComponent as Eye } from "../assets/icons/eye.svg";
import { ReactComponent as ChevronDown } from "../assets/icons/chevron-down.svg";
import { ReactComponent as ChevronUp } from "../assets/icons/chevron-up.svg";
import { ReactComponent as Close } from "../assets/icons/close.svg";
import { ReactComponent as Check } from "../assets/icons/checkmark.svg";
import { ReactComponent as Trash } from "../assets/icons/trash.svg";
import { ReactComponent as Logout } from "../assets/icons/log-out-outline.svg";
import { IconName } from "../types/IconName";

type Props = { name: IconName } & SVGProps<SVGSVGElement>;

const icons: {
  [name in IconName]: FunctionComponent<SVGProps<SVGSVGElement>>;
} = {
  moon: Moon,
  sunny: Sunny,
  "ellipsis-vertical": EllipsisVertical,
  plus: Plus,
  grid: Grid,
  eye: Eye,
  "eye-off-outline": EyeOffOutline,
  "chevron-down": ChevronDown,
  "chevron-up": ChevronUp,
  close: Close,
  check: Check,
  trash: Trash,
  logout: Logout,
};

const Icon = ({ name, ...props }: Props) => {
  const Icon = icons[name];
  return <Icon {...props} />;
};

export default Icon;
