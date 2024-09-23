import React from 'react';
import './ui/ErrorPage.css';

function ErrorPage(): JSX.Element {
  return (
    <div>
      <h1 className="error__title">404 - YOU BROKE THE SITE, ARE YOU HAPPY?</h1>
      <h2 className="error__subtitle">TO UNBLOCK ACCESS, TRANSFER MONEY TO KOSTIK`S CARD.</h2>
      <img
        className="error__img"
        src="https://i.pinimg.com/originals/42/1e/2d/421e2de455f0918a369f67daada3590d.jpg"
        alt="social credit"
      />
    </div>
  );
}

export default ErrorPage;
