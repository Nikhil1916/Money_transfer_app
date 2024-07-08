import React, { useEffect, useState } from 'react';
import Forms from './Forms';
import { singInConfig } from '../Utils/config';
import axios from 'axios';
const Signin = () => {
  const [itemsVal, setItemsVal] = useState([]);
  console.log(1);
  useEffect(()=>{
    if(itemsVal.length>0) {
      console.log(2);
      const obj = {};
      singInConfig?.forEach((item, i)=>{
        obj[item.slug] = itemsVal[i]
      })
      console.log(obj); 
      onSubmit(obj);
    }
  },[itemsVal]);

  const onSubmit = async(obj) => {
    console.log(obj);
    const data = await axios.post("http://localhost:3000/api/vi/user/signin", obj);
    console.log(data.data);
  }
  return (
    <div>
      <div>
        <Forms heading={"Sign In"}  subHeading={"Enter Your Credentials to access your account"} inputConfig={singInConfig} valueSet={setItemsVal}  />
    </div>
    </div>
  )
}

export default Signin