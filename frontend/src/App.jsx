import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  useEffect(()=>{
    fetch('/api/login').then(res => res.json()).then(res => setCount(res))
  })
  return (
    <>
      testt {count}
    </>
  )
}

export default App
