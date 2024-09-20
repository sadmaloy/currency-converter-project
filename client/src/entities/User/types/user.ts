export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  currency: string;
  favoriteMeme: string;
};

export type UserWithoutId = Omit<User, 'id'>;

export type UserId = User['id'];
