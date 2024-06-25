import React, { useState } from 'react'
import axios from 'axios'

const LoginComponent = ({error,inputValues,setInputValues,Login,UserHasAnAccount,setUserHasAnAccount})=>{
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

      <p>don't have an account ? <a onClick={()=>{setUserHasAnAccount(false)}}>Sign Up</a></p>
    </div>
  )
}
const SignUpComponent = ({error,inputValues,setInputValues,Login,UserHasAnAccount,setUserHasAnAccount})=>{
  return (
    <div className='LoginBox'>

    <h1 className='loginTitle'>Sign Up </h1>

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

    <p>don't have an account ? <a onClick={()=>{setUserHasAnAccount(false)}}>Sign Up</a></p>
  </div>
  )
}

const LoginPage = ({setUserSecret}) => {
  
  const [error, setError] = useState({error:false,emailError:'',passworError:''});
  const [inputValues, setInputValues] = useState({username:'', password:''});
  const [UserHasAnAccount, setUserHasAnAccount] = useState(true)


  const Login = (UsernameOrEmail, password)=>{
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
    axios.get("/api/login/", config).then(res => {
    if(res.data.success){
      setError({error:false,emailError:'',passworError:''});
      setUserSecret(true);
      
    }else{
      setError({error:true,emailError:res.data.message.emailOrUsernameError,passworError:res.data.message.PasswordError})
    }
  })
  }
  if(UserHasAnAccount){
    return(<LoginComponent setUserHasAnAccount ={setUserHasAnAccount} UserHasAnAccount ={UserHasAnAccount} setInputValues={setInputValues} inputValues={inputValues} error={error} Login={Login}/>)
  }else{
    return(<SignUpComponent setUserHasAnAccount ={setUserHasAnAccount} UserHasAnAccount ={UserHasAnAccount} setInputValues={setInputValues} inputValues={inputValues} error={error} Login={Login}/>)
  }
  
}

export default LoginPage