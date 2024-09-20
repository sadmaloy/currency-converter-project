import React, { Suspense, useEffect, useMemo, useState } from 'react';
import './App.css';
import type { AxiosError, AxiosResponse } from 'axios';
import axios from 'axios';
import AppRouters from './provider/AppRouters';
import Navbar from '../widgets/navbar/Navbar';
import type { User } from '../entities/User/types/user';
import { AppContext } from './provider/AppContext';
import axiosRequest, { setAccessToken } from '../features/api/axiosInstance';

type TokenResponse = {
  message: string;
  user: User;
  accessToken: string;
};

function App(): JSX.Element {
  const [user, setUser] = useState<User | undefined>(undefined);

  const checkUser = async (): Promise<void> => {
    try {
      const response: AxiosResponse<TokenResponse> = await axiosRequest.get('/tokens/refresh');
      if (response.status === 200) {
        setUser(response.data.user);
        setAccessToken(response.data.accessToken);
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axios.isAxiosError(axiosError)) {
        throw new Error(axiosError.message);
      }
      throw new Error('Some error');
    }
  };

  useEffect(() => {
    void checkUser();
  }, []);

  const state = useMemo(
    () => ({
      user,
      setUser,
    }),
    [user],
  );
  return (
    <AppContext.Provider value={state}>
      <Navbar />
      <Suspense fallback={<div>Loading...</div>}>
        <AppRouters />
      </Suspense>
    </AppContext.Provider>
  );
}

export default App;
