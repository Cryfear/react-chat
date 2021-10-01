import React from "react";

import nonChecked from "../../../../../../assets/Check.svg";
import checkedSvg from "../../../../../../assets/double-check.svg";

interface ReadedCheckComponentTypes {
  checked: boolean;
}

export const ReadedCheckComponent = ({
  checked,
}: ReadedCheckComponentTypes) => {
  // компонент отвечающий за значок одной или двух галочек сообщения
  return (
    <img
      className="checked-message"
      src={checked ? checkedSvg : nonChecked}
      alt="checked-icon"
    />
  );
};
