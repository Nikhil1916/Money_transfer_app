import axios from 'axios';
import React, { useEffect, useState } from 'react'
import UserSearch from './UserSearch';

export const SubBody = () => {
  const [balance, setBalance] = useState(null);
  useEffect(()=>{
    getBalance();
  },[]);

  async function getBalance() {
    try {
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'http://localhost:3000/api/vi/accounts/balance',
        headers: { 
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      };
      
      await axios.request(config)
      .then((response) => {
        // console.log(JSON.stringify(response.data));
        setBalance(response.data.balance);
        // console.log(balance.current,response.data.balance);
      })
      .catch((error) => {
        console.log(error);
      });
      
    } catch(e) {
      console.warn(e);
    }
  }
  return (
    <div className='m-4 mt-4'>
    <h1 className='font-bold text-lg'>Your Balance: ₹ {balance}</h1>
    <UserSearch/>
  </div>
  )
}
