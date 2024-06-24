import React, { useState } from 'react'
import axios from 'axios'


const LoginPage = ({setUserSecret}) => {
  
  const [error, setError] = useState({error:false,emailError:'',passworError:''});
  const [inputValues, setInputValues] = useState({username:'', password:''})


  const Login = (UsernameOrEmail, password)=>{
    console.log(UsernameOrEmail,password)
    const config = {
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
      },
      data: {},
      params: {
          "UsernameOrEmail":UsernameOrEmail,
          "password":password
        }
  }
  axios.get("http://localhost:5000/api/login/", config).then(res => {
    console.log(res.data)
    if(res.data.success){
      setError({error:false,emailError:'',passworError:''});
      setUserSecret(true);
      
    }else{
      setError({error:true,emailError:res.data.message.emailOrUsernameError,passworError:res.data.message.PasswordError})
    }
  })
  }

  return (
    <div className='LoginBox'>

      <h1 className='loginTitle'>Log in </h1>

      <label className='inputLabels'>Username or Email</label>

      <p className='danger_error'>{error.emailError}</p>

      <input onChange={(e)=>{
        setInputValues({username:e.target.value,password:inputValues.password});
      }}
      className='inputholders' placeholder='enter your username or email' ></input>

      <label className='inputLabels'>Password</label>

      <p className='danger_error'>{error.passworError}</p>


      <input onChange={(e)=>{
        setInputValues({username:inputValues.username,password:e.target.value});
      }}
      className='inputholders' placeholder='enter your password '></input>

      <button className='inputholder' onClick={()=>Login(inputValues.username,inputValues.password)}>Log in</button>

      <p>don't have an account ? <a href=''>Sign Up</a></p>
    </div>
  )
}

export default LoginPage