import React, { useEffect, useState } from "react";

import "./SearchDialogs.scss";
import loop from "../../../../assets/loop.svg";
import { getUsersBySearch } from "../DialogsList.model";
import {useDebounce} from 'use-lodash-debounce';

export const SearchDialogs = () => {
  const [searchText, setSearchText] = useState("");

  const debouncedValue = useDebounce(searchText, 500);

  useEffect(() => {
    getUsersBySearch({ page: 0, searchText: searchText })
    // выключил варнинг потому что в данном случае лишь создает проблемы. 
    // eslint-disable-next-line
  }, [debouncedValue]);

  return (
    <div className="dialogs-search">
      <div className="dialogs-search__wrapper">
        <img src={loop} alt="" />
        <input
          type="text"
          placeholder="Search people..."
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />
      </div>
    </div>
  );
};
