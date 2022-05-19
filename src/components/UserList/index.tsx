import { memo, useCallback, useContext } from "react";
import { UserContext } from "../../context";
import { UserRow } from "../UserRow";

export const UserList = memo(() => {
  const { removePreSelectedUser } = useContext(UserContext);

  return (
    <div style={{ marginTop: 25 }}>
      <UserContext.Consumer>
        {(users) =>
          users.preSelectedUsers.map((user, index) => {
            return (
              <UserRow
                key={index}
                {...user}
                isFirst={index === 0}
                isLast={index === users.preSelectedUsers.length - 1}
                showBorder={true}
                showDeleteIcon
                onDeleteClick={() => removePreSelectedUser(user.id)}
              />
            );
          })
        }
      </UserContext.Consumer>
    </div>
  );
});
