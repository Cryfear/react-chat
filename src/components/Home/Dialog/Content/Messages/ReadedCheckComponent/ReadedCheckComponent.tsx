import nonChecked from "@assets/Check.svg";
import checkedSvg from "@assets/double-check.svg";

export const ReadedCheckComponent = ({ checked }: { checked: boolean }) => {
  return <img className="checked-message" src={checked ? checkedSvg : nonChecked} alt="checked-icon" />;
};
