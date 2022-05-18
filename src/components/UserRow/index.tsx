import { memo } from "react";
import { AccountIcon, DeleteIcon } from "../../assets";
import { UserType } from "../../types";
import { Avatar } from "../Avatar";
import "./index.css";

interface Props extends UserType {
  isLast?: boolean;
  isFirst?: boolean;
  showBorder?: boolean;
  onSelected?: () => void;
  onDeleteClick?: () => void;
  showDeleteIcon?: boolean;
  showDescIcon?: boolean;
  showEmail?: boolean;
}

export const UserRow = memo(
  ({
    first_name,
    last_name,
    description,
    email,
    isLast,
    onSelected,
    showDeleteIcon,
    isFirst,
    showBorder,
    onDeleteClick,
    showEmail,
    showDescIcon,
  }: Props) => {
    return (
      <div
        className="user-row"
        onClick={onSelected}
        style={{
          borderWidth: showBorder ? "1px" : "0px",
          borderTopWidth: showBorder && isFirst ? "1px" : "0px",
          borderTopRightRadius: showBorder && isFirst ? "5px" : "0px",
          borderTopLeftRadius: showBorder && isFirst ? "5px" : "0px",
          borderBottomRightRadius: showBorder && isLast ? "5px" : "0px",
          borderBottomLeftRadius: showBorder && isLast ? "5px" : "0px",
        }}
      >
        <div
          style={{ borderBottomWidth: isLast || showBorder ? "0px" : "1px" }}
        >
          <div className="avatar-icon">
            <Avatar name={`${first_name} ${last_name}`} size={50} />
          </div>
          <div className="user-row-sub-container user-row-mq">
            <div className="user-row-title">
              {first_name} {last_name}
            </div>
            <div className="user-row-desc">
              <div className="user-row-desc-text">
                {showDescIcon && <AccountIcon height={16} width={16} />}
                <div className="text">{description}</div>
              </div>
              {showEmail && (
                <div className="user-row-desc-text">
                  {showDescIcon && <div className="dot" />}
                  <div className="text">{email}</div>
                </div>
              )}
            </div>
          </div>
          {showDeleteIcon && (
            <div className="delete-icon" onClick={onDeleteClick}>
              <DeleteIcon height={25} width={25} />
            </div>
          )}
        </div>
      </div>
    );
  }
);
