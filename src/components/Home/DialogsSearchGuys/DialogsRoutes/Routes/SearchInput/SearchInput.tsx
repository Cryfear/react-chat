import React from "react";
import { Input } from "antd";
const { Search } = Input;

interface SearchInputTypes {
  setValue: Function;
}

const SearchInput = (props: any) => {
  return (
    <div className="dialogs__search">
      <div className="search__input">
        <Search
          placeholder="Поиск"
          onSearch={value => {
            props.setValue(value);
          }}
        />
      </div>
    </div>
  );
};

export default SearchInput;
