import { createContext, useCallback, useEffect, useState } from "react";
import { UsersType } from "../types";
import {
  getLocalStorageSelectedItems,
  setLocalStorageSelectedItems,
} from "../utils";

type DefaultType = {
  preSelectedUsers: UsersType;
  addPreSelectedUsers: (users: UsersType) => void;
  removePreSelectedUser: (userId: number) => void;
};

const defaultValue = {
  preSelectedUsers: [],
  addPreSelectedUsers: () => {},
  removePreSelectedUser: () => {},
};

export const UserContext = createContext<DefaultType>(defaultValue);

export const UserContextProvider = ({ children }: any) => {
  const [preSelectedItems, setPreSelectedItems] = useState<UsersType>([]);

  useEffect(() => {
    setPreSelectedItems(getLocalStorageSelectedItems());
  }, []);

  const addPreSelectedUsers = (users: UsersType) => {
    const data = [...preSelectedItems];
    users.forEach((user) => {
      data.push(user);
    });
    setPreSelectedItems(data);
    setLocalStorageSelectedItems(data);
  };

  const removePreSelectedUser = (userId: number) => {
    const data = preSelectedItems.filter((val) => val.id !== userId);
    setPreSelectedItems(data);
    setLocalStorageSelectedItems(data);
  };
  return (
    <UserContext.Provider
      value={{
        preSelectedUsers: preSelectedItems,
        addPreSelectedUsers,
        removePreSelectedUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
