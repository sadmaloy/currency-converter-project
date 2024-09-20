import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const RegistrationPage = lazy(() => import('../../pages/auth/RegistrationPage'));
const AuthorizationPage = lazy(() => import('../../pages/auth/AuthorizationPage'));
const ConverterPage = lazy(() => import('../../pages/converter/ConverterPage'));
const MainPage = lazy(() => import('../../pages/main/MainPage'));

function AppRouters(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/registration" element={<RegistrationPage />} />
      <Route path="/authorization" element={<AuthorizationPage />} />
      <Route path="/converter" element={<ConverterPage />} />
    </Routes>
  );
}

export default AppRouters;
