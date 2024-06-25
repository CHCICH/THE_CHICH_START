import React, { useState } from 'react'
import axios from 'axios'

const LoginComponent = ({LoginError,inputValues,setInputValues,Login,UserHasAnAccount,setUserHasAnAccount})=>{
  return (
    <div className='LoginBox'>

      <h1 className='loginTitle'>Log in </h1>

      <label className='inputLabels'>Username or Email</label>

      <p className='danger_error'>{LoginError.emailError}</p>

      <input onChange={(e)=>{
        setInputValues({username:e.target.value,password:inputValues.password});
      }}
      className='inputholders' placeholder='enter your username or email' ></input>

      <label className='inputLabels'>Password</label>

      <p className='danger_error'>{LoginError.passworError}</p>


      <input onChange={(e)=>{
        setInputValues({username:inputValues.username,password:e.target.value});
      }}
      className='inputholders' placeholder='enter your password '></input>

      <button className='inputholder' onClick={()=>Login(inputValues.username,inputValues.password)}>Log in</button>

      <p>don't have an account ? <a onClick={()=>{setUserHasAnAccount(false)}}>Sign Up</a></p>
    </div>
  )
}

const SignUpComponent = ({SignUpError,SignUpInputValues,setSignUpInputValues,SignUp,UserHasAnAccount,setUserHasAnAccount})=>{
  return (
    <div className='LoginBox'>

    <h1 className='loginTitle'>Sign Up </h1>

    <label className='inputLabels'>Username</label>

    <p className='danger_error'>{SignUpError.usernameError}</p>

    <input onChange={(e)=>{
      setSignUpInputValues({username:e.target.value,password:SignUpInputValues.password,email:SignUpInputValues.email});
    }}
    
    className='inputholders' placeholder='enter your username or email' ></input>

    <label className='inputLabels'>Email</label>

    <p className='danger_error'>{SignUpError.emailError}</p>

    <input onChange={(e)=>{
      setSignUpInputValues({username:SignUpInputValues.username,password:SignUpInputValues.password,email:e.target.value});
    }}
    
    className='inputholders' placeholder='enter your username or email' ></input>

    <label className='inputLabels'>Password</label>

    <p className='danger_error'>{SignUpError.passwordError}</p>


    <input onChange={(e)=>{
      setSignUpInputValues({password:e.target.value,username:SignUpInputValues.username,email:SignUpInputValues.email});
    }}
    className='inputholders' placeholder='enter your password '></input>

    <button className='inputholder' onClick={()=>SignUp(SignUpInputValues.username,SignUpInputValues.email,SignUpInputValues.password)}>Sign Up</button>

    <p>don't have an account ? <a onClick={()=>{setUserHasAnAccount(true)}}>Sign Up</a></p>
  </div>
  )
}

const LoginPage = ({setUserSecret}) => {
  const [SignUpError,setSignUpError ] = useState({error:false,emailError:'',passwordError:'',usernameError:''})
  const [LoginError, loginSetError] = useState({error:false,emailError:'',passworError:''});
  const [inputValues, setInputValues] = useState({username:'', password:''});
  const [SignUpInputValues, setSignUpInputValues] = useState({username:'',email:'', password:''});
  const [UserHasAnAccount, setUserHasAnAccount] = useState(true);


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
      loginSetError({error:false,emailError:'',passworError:''});
      setUserSecret(true);
      
    }else{
      loginSetError({error:true,emailError:res.data.message.emailOrUsernameError,passworError:res.data.message.PasswordError})
    }
  })
  }

  const SignUp = (username,email,password)=>{
    const config = {
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
      }
    };

    axios.post("/api/signup/",{
      newEmail:email,
      newUsername:username,
      password:password
    },config).then(res =>{
      console.log(res)
      if(res.data.success){
      loginSetError({error:false,emailError:'',passwordError:'',usernameError:''});
      setUserSecret(true);
      }else{
      setSignUpError({error:true ,emailError:res.data.message.emailError,passwordError:res.data.message.passwordError,usernameError:res.data.message.usernameError});

      }
    })
  }
  if(UserHasAnAccount){
    return(<LoginComponent setUserHasAnAccount ={setUserHasAnAccount} UserHasAnAccount ={UserHasAnAccount} setInputValues={setInputValues} inputValues={inputValues} LoginError={LoginError} Login={Login}/>)
  }else{
    return(<SignUpComponent setUserHasAnAccount ={setUserHasAnAccount} UserHasAnAccount ={UserHasAnAccount} setSignUpInputValues={setSignUpInputValues} SignUpInputValues={SignUpInputValues} SignUpError={SignUpError} SignUp={SignUp}/>)
  }
  
}

export default LoginPage