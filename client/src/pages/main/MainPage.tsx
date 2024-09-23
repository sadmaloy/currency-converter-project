import React, { useState } from 'react';
import './ui/MainPage.css';

function MainPage(): JSX.Element {
  return (
    <div>
      <h1 className="main__title">Come in, feel free to change currency!</h1>
      <img className="main__img" src="https://www.meme-arsenal.com/memes/20601702338e764109c5cbb06e80940c.jpg" alt="" />
    </div>
  );
}

export default MainPage;
