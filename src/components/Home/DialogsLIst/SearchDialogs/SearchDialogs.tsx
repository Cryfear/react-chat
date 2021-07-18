import React, { useEffect, useState } from "react";

import "./SearchDialogs.scss";
import loop from "../../../../assets/loop.svg";
import { getUsersBySearch } from "../DialogsList.model";
import {useDebounce} from 'use-lodash-debounce';

export const SearchDialogs = () => {
  const [searchText, setSearchText] = useState("");

  const debouncedValue = useDebounce(searchText, 1000);

  useEffect(() => {
    getUsersBySearch({ page: 0, searchText: searchText })
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
