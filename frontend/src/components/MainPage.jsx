import React from 'react'
import './mainPage.css';

const MainPage = ({userSecret,UserID,Username}) => {

  console.log(userSecret,UserID,Username);
  return (
    <div className="landing-page">
        <header>
          <div className="container">
            <a href="" className="logo">THE <b>CHICH START</b></a>
            <ul className="links">
              <li>Home</li>
              <li>Buy</li>
              <li>Sell</li>
              <li>Other</li>
              <li>My Account</li>
            </ul>
          </div>
        </header>
        <div className="content">
          <div className="container">
            <div className="info">
              <h1>Hey {Username}</h1>
              <p>How are you I heard you wanted to start the CHICH START journey. This platform is a cool way to buy and share products of your linkings. so what are you waiting for</p>
              <button>let's go to the shop</button>
            </div>
            <div className="image">
              <img src="./MainPagePic.png"/>
            </div>
          </div>
        </div>
      </div>
  )
}

export default MainPage