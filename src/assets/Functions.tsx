import { SearchitemTypes } from "../components/Home/HomeTypes";

export const SearchFunction = (item: SearchitemTypes, searchValue: string) => {
  // поиск по инпуту
  if (searchValue === "") return true;
  if (item.fullName.indexOf(searchValue) > -1) return true;
  return false;
};
