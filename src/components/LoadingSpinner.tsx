import { RotatingLines } from "react-loader-spinner";

type Props = {
  width?: string;
};

const LoadingSpinner = ({ width }: Props) => {
  return <RotatingLines width={width} strokeColor={"#635fc7"} />;
};

export default LoadingSpinner;
