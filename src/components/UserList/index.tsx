import { memo, useContext } from "react";
import { UserContext } from "../../context";
import { UserRow } from "../UserRow";

export const UserList = memo(() => {
  const { removePreSelectedUser } = useContext(UserContext);

  return (
    <UserContext.Consumer>
      {(users) => (
        <div style={{ marginTop: users.preSelectedUsers.length > 0 ? 25 : 0 }}>
          {users.preSelectedUsers.map((user, index) => {
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
          })}
        </div>
      )}
    </UserContext.Consumer>
  );
});
