import { UsersType } from "../types";

const localStorageKeys = {
  PRE_SELECTED_ITEMS: "PRE_SELECTED_ITEMS",
};

export const setLocalStorageSelectedItems = (items: UsersType) => {
  localStorage.setItem(
    localStorageKeys.PRE_SELECTED_ITEMS,
    JSON.stringify(items)
  );
};

export const getLocalStorageSelectedItems = (): UsersType => {
  const data = localStorage.getItem(localStorageKeys.PRE_SELECTED_ITEMS);
  return !!data ? JSON.parse(data) : [];
};

export const deleteLocalStorageSelectedItems = () => {
  localStorage.removeItem(localStorageKeys.PRE_SELECTED_ITEMS);
};
