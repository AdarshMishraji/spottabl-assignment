import { useContext, useMemo } from "react";
import { Users } from "../../constants";
import { UserContext } from "../../context";
import { UsersType } from "../../types";

type Props = {
  selectedIds: Set<number>;
  searchText: string;
};

export const useDropdownItems = ({ selectedIds, searchText }: Props) => {
  const { preSelectedUsers } = useContext(UserContext);

  const preSelectedUserIdsSet = useMemo(() => {
    const set = new Set();
    preSelectedUsers.forEach((user) => {
      set.add(user.id);
    });
    return set;
  }, [preSelectedUsers]);

  return useMemo(() => {
    const loweredSearchText = searchText.toLowerCase();
    const searchResult: UsersType = [];
    const selectedItems: UsersType = [];

    Users.forEach((val) => {
      let isSelected = selectedIds?.has(val.id);
      let isPreSelected = preSelectedUserIdsSet?.has(val.id);
      if (
        !!searchText &&
        (val.email.toLowerCase().startsWith(loweredSearchText) ||
          val.first_name.toLowerCase().startsWith(loweredSearchText)) &&
        !isSelected &&
        !isPreSelected
      ) {
        searchResult.push(val);
      }
    });

    // following code only work if Users list is having id in one-based indexing
    // O(1)
    selectedIds?.forEach((id) => {
      selectedItems.push(Users[id - 1]);
    });

    // following code works for any order of data
    // O(n ^ 2)
    // selectedIds?.forEach((id) => {
    //   const userData = Users.find((user) => user.id === id);
    //   selectedItems.push(userData);
    // });

    return { searchResult, selectedItems };
  }, [searchText, selectedIds, preSelectedUserIdsSet]);
};
