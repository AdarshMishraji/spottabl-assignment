import { memo } from "react";
import { CloseIcon } from "../../assets";
import { UserType } from "../../types";

type Props = {
  item: UserType;
  onCloseClick: (item: UserType) => void;
};

export const SelectedItem = memo(({ item, onCloseClick }: Props) => {
  return (
    <div className="selected-item-container">
      <div>
        {item.first_name} {item.last_name}
      </div>
      <span className="icon" onClick={() => onCloseClick(item)}>
        <CloseIcon height={16} width={16} />
      </span>
    </div>
  );
});
