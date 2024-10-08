/* eslint-disable @typescript-eslint/no-misused-promises */
import axios from 'axios';
import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import type { AxiosError, AxiosResponse } from 'axios';
import { AppContext } from '../../app/provider/AppContext';
import axiosRequest from '../../features/api/axiosInstance';
import './ui/Navbar.css';

type LogoutResponse = {
  message: string;
};

function Navbar(): JSX.Element {
  const { user, setUser } = useContext(AppContext);
  const navigate = useNavigate();

  const onHandleLogout = async (): Promise<void> => {
    try {
      const response: AxiosResponse<LogoutResponse> = await axiosRequest.delete('/auth/logout');
      if (response.status === 200) {
        setUser(undefined);
        navigate('/');
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axios.isAxiosError(axiosError)) {
        throw new Error(axiosError.message);
      }
      throw new Error('Some error');
    }
  };

  return (
    <div>
      <ul className="navbar">
        <li className="navbar__link">
          <NavLink to="/">Home</NavLink>
        </li>
        {!user && (
          <li className="navbar__link">
            <NavLink to="/registration">Registration</NavLink>
          </li>
        )}
        {!user && (
          <li className="navbar__link">
            <NavLink to="/authorization">Authorization</NavLink>
          </li>
        )}
        {user && (
          <li className="navbar__link">
            <NavLink to="/converter">Currency Converter</NavLink>
          </li>
        )}
        {user && <li className="navbar__link">{`Welcome, ${user.name}!`}</li>}
        {user && (
          <li className="navbar__link">
            <button className='navbar__button' type="button" onClick={onHandleLogout}>
              Log out
            </button>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Navbar;
