import React from "react";

interface SearchUsersTypes {
  users: Array<Object>;
}

const SearchUsers = (props: SearchUsersTypes) => {
  return <div>{props.users}</div>;
};

export default SearchUsers;
