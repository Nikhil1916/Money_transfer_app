import React, { useEffect, useState } from 'react';
import Forms from './Forms';
import { singInConfig } from '../Utils/config';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
const Signin = () => {
  const [itemsVal, setItemsVal] = useState([]);
  const navigate = useNavigate();
  // console.log(1);
  useEffect(()=>{
    if(itemsVal.length>0) {
      // console.log(2);
      const obj = {};
      singInConfig?.forEach((item, i)=>{
        obj[item.slug] = itemsVal[i]
      })
      console.log(obj); 
      onSubmit(obj);
    }
  },[itemsVal]);

  const onSubmit = async(obj) => {
    // console.log(obj);
    try {
      const data = await axios.post("http://localhost:3000/api/vi/user/signin", obj);
      console.log(data.data);
      navigate("/dashboard");
      localStorage.setItem("token",JSON.stringify(data.data.token));
      localStorage.setItem("user",JSON.stringify(data.data.user));
    } catch(e) {
      console.warn(e);
    }

  }
  return (
    <div className='bg-gray-100'>
        <Forms heading={"Sign In"}  subHeading={"Enter Your Credentials to access your account"} inputConfig={singInConfig} valueSet={setItemsVal} SigninUpNavigator={SignUpNavigation}  />
    </div>
  )
}

const SignUpNavigation = () => {
  return (
    <p className="text-center text-sm mt-2"> 
      Don&apos;t have an account? <Link to='/signup' className='underline'>Sign Up</Link>
    </p>
  )
}

export default Signin