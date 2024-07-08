import React, { useEffect, useState } from 'react';
import Forms from "./Forms"
import {signupInputConfig} from '../Utils/config';
import axios from 'axios';


// add toastify to show error if some placeholder left not doing now as redux not there 
const Signup = () => {
  const [itemsVal, setItemsVal] = useState([]);
  useEffect(()=>{
    if(itemsVal.length > 0) {
      
      const obj = {};
      signupInputConfig?.forEach((item, i)=>{
        obj[item.slug] = itemsVal[i]
      })
      console.log(obj); 
      onSubmit(obj);
    }
  },[itemsVal]);

  const onSubmit = async(obj) => {
    console.log(obj);
    //we need to hash our password as well
    const data = await axios.post("http://localhost:3000/api/vi/user/signup", obj);
    console.log(data.data);
  }
  
  return (
    <div>
        <Forms heading={"Sign Up"}  subHeading={"Enter Your information to create an account"} inputConfig={signupInputConfig} valueSet={setItemsVal}  />
    </div>
  )
}

export default Signup