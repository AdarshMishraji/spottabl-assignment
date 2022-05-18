export type UserType = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  description: string;
};

export type UsersType = Array<UserType>;
