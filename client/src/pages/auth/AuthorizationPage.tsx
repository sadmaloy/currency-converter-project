/* eslint-disable @typescript-eslint/no-misused-promises */
import axios from 'axios';
import type { AxiosError, AxiosResponse } from 'axios';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosRequest, { setAccessToken } from '../../features/api/axiosInstance';
import { AppContext } from '../../app/provider/AppContext';
import type { User } from '../../entities/User/types/user';

type UserResponse = {
  message: string;
  user: User;
  accessToken: string;
};

function AuthorizationPage(): JSX.Element {
  const { setUser } = useContext(AppContext);
  const [email, setEmail] = useState<User['email']>('');
  const [password, setPassword] = useState<User['password']>('');
  const [errorMess, setErrorMess] = useState<string>('');
  const navigate = useNavigate();

  const onHandleSubmit = async (e: React.ChangeEvent<HTMLFormElement>): Promise<void> => {
    try {
      e.preventDefault();
      if (email.trim() === '' || password.trim() === '') {
        setErrorMess('Fill in all the blanks!');
        return;
      }
      const response: AxiosResponse<UserResponse> = await axiosRequest.post('/auth/authorization', {
        email,
        password,
      });
      if (response.status === 200) {
        setEmail('');
        setAccessToken(response.data.accessToken);
        setPassword('');
        setErrorMess('');
        setUser(response.data.user);
        navigate('/');
      }
      setErrorMess("The passwords or email don't match!");
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axios.isAxiosError(axiosError)) {
        setErrorMess(axiosError.message);
        throw new Error(axiosError.message);
      }
      throw new Error('Some error');
    }
  };
  return (
    <div>
      <h1>Authorization</h1>
      {errorMess && <p>{errorMess}</p>}
      <form onSubmit={onHandleSubmit} className="registration-form">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter a email"
          className="registration-form__input"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter a password"
          className="registration-form__input"
        />
        <button type="submit">Sign in</button>
      </form>
    </div>
  );
}

export default AuthorizationPage;
