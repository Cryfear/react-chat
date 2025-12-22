import { changeUserSearch, getUsersBySearch } from "@/store/UsersList.model";
import loop from "@assets/loop.svg";
import { useEffect, useState } from "react";

export const SearchUsers = () => {
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    getUsersBySearch({ page: 0, searchText: searchText });
  }, [searchText]);

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
            if (e.target.value === "") changeUserSearch(false);
            else changeUserSearch(true);
          }}
        />
      </div>
    </div>
  );
};
