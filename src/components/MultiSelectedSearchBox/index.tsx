import {
  memo,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { SelectedItem } from "./SelectedItem";
import "./index.css";
import { locale } from "../../constants";
import { UserType } from "../../types";
import { OptionsContainer } from "./OptionsContainer";
import { useDropdownItems } from "./useDropdownItems";
import { UserContext } from "../../context";

export const MultiSelectSearchBox = memo(() => {
  const [searchText, setSearchText] = useState<string>("");
  const [inputFocused, setInputFocused] = useState(true);
  const [selectedIds, setSelectedIds] = useState<Set<number>>();

  const { addPreSelectedUsers } = useContext(UserContext);

  const searchTextRef = useRef<any>();
  const optionContainerRef = useRef<any>();

  const documentClickEventListener = useCallback((e: any) => {
    const container1 = document.querySelector(".search-list-field");
    const container2 = document.querySelector(".options-view-container");

    if (!(container1.contains(e.target) || container2.contains(e.target))) {
      optionContainerRef.current?.close();
    } else {
      optionContainerRef.current?.open();
    }
  }, []);

  useEffect(() => {
    document.addEventListener("click", documentClickEventListener);
    return () =>
      document.removeEventListener("click", documentClickEventListener);
  }, []);

  const onViewClicked = useCallback(
    (e: any) => {
      if (e.target.className === "search-list-field") {
        searchTextRef.current?.focus();
      }
    },
    [selectedIds]
  );

  const onSelected = useCallback(
    (item: UserType) => {
      const set = new Set(selectedIds);
      set.add(item.id);
      setSelectedIds(set);
    },
    [selectedIds]
  );

  const onDeselected = useCallback(
    (item: UserType) => {
      const set = new Set(selectedIds);
      set.delete(item.id);
      setSelectedIds(set);
    },
    [selectedIds]
  );

  const { searchResult, selectedItems } = useDropdownItems({
    selectedIds,
    searchText,
  });

  const onAddCSM = useCallback(() => {
    if (selectedItems.length > 0) {
      addPreSelectedUsers(selectedItems);
      setSelectedIds(null);
      setSearchText("");
    }
  }, [selectedItems]);

  return (
    <div className="search-box-container" onClick={onViewClicked}>
      <div style={{ width: "100%" }}>
        <div
          className="search-list-field"
          style={{
            borderColor: inputFocused ? "var(--voilet)" : "var(--greyColor)",
          }}
        >
          {selectedItems?.map((item, index) => {
            return (
              <SelectedItem
                key={index}
                item={item}
                onCloseClick={onDeselected}
              />
            );
          })}
          <input
            onFocus={() => setInputFocused(true)}
            onBlur={() => setInputFocused(false)}
            ref={searchTextRef}
            style={{
              width:
                searchText.length > 5 ? `${searchText.length + 2}ch` : "5ch",
            }}
            value={searchText}
            autoFocus
            className="search-input"
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
        <div className="options-view-container">
          <OptionsContainer
            options={searchResult}
            onSelected={onSelected}
            isVisible={!!searchText}
            ref={optionContainerRef}
          />
        </div>
      </div>
      <div className="search-button-container">
        <button className="search-button" onClick={onAddCSM}>
          <p>{locale.addCSM}</p>
        </button>
      </div>
    </div>
  );
});
