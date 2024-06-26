import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LoginPage from './components/LoginPage';
import MainPage from './components/MainPage';

function App() {
  const [userSecret, setUserSecret] = useState('');
  const [UserID, setUserID] = useState('');
  const [Username , setUsername] = useState('');
  if(!userSecret){
    return(
      <LoginPage setUsername={setUsername} setUserID={setUserID} setUserSecret={setUserSecret} />
    )
  }else{
    return(
      <MainPage Username={Username} UserID={UserID} userSecret={userSecret}/>
    )
  }
}

export default App
