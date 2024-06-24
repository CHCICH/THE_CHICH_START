import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LoginPage from './components/LoginPage';
import MainPage from './components/MainPage';

function App() {
  const [userSecret, setUserSecret] = useState('');
  console.log(userSecret)
  if(!userSecret){
    return(
      <LoginPage setUserSecret={setUserSecret} />
    )
  }else{
    return(
      <MainPage/>
    )
  }
}

export default App
