import React from 'react'
import './mainPage.css';

const Header = () => {
  return (
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
  )
}

export default Header