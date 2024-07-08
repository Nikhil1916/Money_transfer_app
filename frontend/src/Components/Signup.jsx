import { useEffect, useState } from 'react';
import Forms from "./Forms"
import {signupInputConfig} from '../Utils/config';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';


// add toastify to show error if some placeholder left not doing now as redux not there 
const Signup = () => {
  const [itemsVal, setItemsVal] = useState([]);
  const navigate = useNavigate();
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
    try {
      //we need to hash our password as well
      const data = await axios.post("http://localhost:3000/api/vi/user/signup", obj);
      console.log(data.data);
      localStorage.setItem("token",JSON.stringify(data.data.token));
      navigate("/dashboard");
    } catch(e) {
      console.warn(e.response.data);
    }

  }
  
  return (
    <div className='bg-gray-100'>
        <Forms heading={"Sign Up"}  subHeading={"Enter Your information to create an account"} inputConfig={signupInputConfig} valueSet={setItemsVal} SigninUpNavigator={SignInNavigation}  />
    </div>
  )
}

const SignInNavigation = () => {
  return (
    <p className="text-center text-sm mt-2"> 
      Already have an account? <Link to='/signin' className='underline'>Sign In</Link>
    </p>
  )
}

export default Signup