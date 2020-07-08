import React, { useState } from "react";
import DialogItem from "../DialogItem/DialogItem";
import { DialogsTypes } from "../../../HomeTypes";
import SearchInput from "./SearchInput/SearchInput";

const Dialogs = (props: DialogsTypes) => {
  const wrapperRef: any = React.useRef(null); // ссылка на обертку блока где лежат юзеры
  const [searchValue, setValue] = useState(""); // поисковая строка
  console.log(searchValue);
  return (
    <div className="dialogs__items-wrapper" ref={wrapperRef}>
      <SearchInput setValue={setValue} />
      <DialogItem
        avatar="https://sun1.beltelecom-by-minsk.userapi.com/c845323/v845323310/181d46/JP_q_sNhiH0.jpg?ava=1"
        username="Alexander Kit"
        isOnline={true}
        date={new Date()}
        lastMessage={"hiii"}
        unreadedCount={2}
      />
    </div>
  );
};

export default Dialogs;
