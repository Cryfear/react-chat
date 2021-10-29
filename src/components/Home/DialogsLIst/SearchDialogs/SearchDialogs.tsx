import React, { useEffect, useState } from "react";

import "./SearchDialogs.scss";
import loop from "../../../../assets/loop.svg";
import { useDebounce } from "use-lodash-debounce";
import { createEffect } from "effector";
import { UsersApi } from "../../../../api/UsersApi";

export const getUsersBySearch = createEffect(
  async (values: { page: number; searchText: string }) => {
    try {
      if (values.searchText !== "") {
        return await UsersApi.getUsersByName(values);
      } else {
        return "close";
      }
    } catch (_) {
      return "close";
    }
  }
);

export const SearchDialogs = () => {
  const [searchText, setSearchText] = useState("");

  const debouncedValue = useDebounce(searchText, 500);

  useEffect(() => {
    getUsersBySearch({ page: 0, searchText: searchText });
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
