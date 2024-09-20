/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { AxiosError, AxiosResponse } from 'axios';
import axios from 'axios';
import axiosRequest, { setAccessToken } from '../../features/api/axiosInstance';

import { AppContext } from '../../app/provider/AppContext';
import type { User } from '../../entities/User/types/user';

type UserResponse = {
  message: string;
  user: User;
  accessToken: string;
};

function RegistrationPage(): JSX.Element {
  const { setUser } = useContext(AppContext);
  const [name, setName] = useState<User['name']>('');
  const [email, setEmail] = useState<User['email']>('');
  const [password, setPassword] = useState<User['password']>('');
  const [check, setCheck] = useState<string>('');
  const [currency, setCurrency] = useState<User['currency']>('RUB');
  const [favoriteMeme, setFavoriteMeme] = useState<User['favoriteMeme']>('');
  const [errorMess, setErrorMess] = useState<string>('');
  const navigate = useNavigate();

  const onHandleSubmit = async (e: React.ChangeEvent<HTMLFormElement>): Promise<void> => {
    try {
      e.preventDefault();
      if (
        name.trim() === '' ||
        email.trim() === '' ||
        password.trim() === '' ||
        check.trim() === ''
      ) {
        setErrorMess('Fill in all the blanks!');
        return;
      }
      if (password === check) {
        const response: AxiosResponse<UserResponse> = await axiosRequest.post(
          '/auth/registration',
          {
            name,
            email,
            password,
            currency,
            favoriteMeme,
          },
        );
        if (response.status === 201) {
          setName('');
          setEmail('');
          setAccessToken(response.data.accessToken);
          setPassword('');
          setCheck('');
          setCurrency('');
          setFavoriteMeme('');
          setErrorMess('');
          setUser(response.data.user);
          navigate('/');
          return;
        }
      }
      setErrorMess("The passwords don't match!");
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
      <h1>Registration</h1>
      {errorMess && <p>{errorMess}</p>}
      <form onSubmit={onHandleSubmit} className="registration-form">
        <input
          type="text"
          value={name}
          maxLength={15}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter a name"
          className="registration-form__input"
        />
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
          minLength={3}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter a password"
          className="registration-form__input"
        />
        <input
          type="password"
          value={check}
          minLength={3}
          onChange={(e) => setCheck(e.target.value)}
          placeholder="Enter a password again"
          className="registration-form__input"
        />
        <label htmlFor="currency-select" className="registration-form__label">
          Select a currency:
          <select
            id="currency-select"
            onChange={(e) => setCurrency(e.target.value)}
            className="registration-form__select"
          >
            <option value="RUB">RUB</option>
          </select>
        </label>

        <input
          type="url"
          value={favoriteMeme}
          onChange={(e) => setFavoriteMeme(e.target.value)}
          placeholder="Enter your favorite meme"
          className="registration-form__input"
        />
        <button type="submit">Sign in</button>
      </form>
    </div>
  );
}

export default RegistrationPage;
