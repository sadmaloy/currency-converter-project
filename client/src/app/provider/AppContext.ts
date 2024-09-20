import type { SetStateAction } from 'react';
import { createContext } from 'react';
import type { User } from '../../entities/User/types/user';

type InitialState = {
  user: User | undefined;
  setUser: (state: SetStateAction<User | undefined>) => void;
};

export const initialState: InitialState = {
  user: undefined,
  setUser: () => {},
};

export const AppContext = createContext(initialState);
