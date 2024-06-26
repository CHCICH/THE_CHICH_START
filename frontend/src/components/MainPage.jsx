import React from 'react'
import './mainPage.css';
import Header from './Header';

const MainPage = ({userSecret,UserID,Username}) => {

  console.log(userSecret,UserID,Username);
  return (
    <div className="landing-page">
       <Header/>
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