import { Logo } from "../../assets";
import { locale } from "../../constants";
import "./index.css";

type Props = {};

export const Header = ({}: Props) => {
  return (
    <div className="header">
      <img src={Logo} height={60} width={60} />
      <div>
        <div>{locale.headerTitleText}</div>
        <div>{locale.headerDescText}</div>
      </div>
    </div>
  );
};
