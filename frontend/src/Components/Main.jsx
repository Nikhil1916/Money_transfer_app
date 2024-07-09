import React from 'react'
import Header from './Header'
import { Outlet, useNavigate } from 'react-router-dom'

const Main = () => {
   const navigate =  useNavigate();
  if(!localStorage.getItem('token')) {
    console.log("ok");
    navigate("/signin");
  }
  return (
    <div>
        <Header/>
        <Outlet/>
    </div>
  )
}

export default Main