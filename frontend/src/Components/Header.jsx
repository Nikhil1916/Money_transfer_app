import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  useEffect(()=>{
    setUser(JSON.parse(localStorage.getItem('user')));
    console.log(JSON.parse(localStorage.getItem('user')));
  },[]);

  const handleSignOut = () => {
    localStorage.clear();
    navigate("/");
  }
  return (
    <div className='flex justify-between items-center shadow-lg p-3 pr-6'>
        <h1 className='font-bold text-lg'>Payments App</h1>
        <div className='flex gap-2 items-center'>
            <p>Hello, User</p>
            <div className='relative flex items-center cursor-pointer' onMouseEnter={()=>setShowDropdown(true)} onMouseLeave={()=>setShowDropdown(false)}>
              <div className='bg-gray-200 p-2 rounded-full min-w-[38px] flex justify-center items-center'>
                  {user?.firstname?.substring(0,1)?.toUpperCase()+user?.lastname?.substring(0,1)?.toUpperCase()}
              </div>
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3 cursor-pointer">
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            </div>
            <div>
            {showDropdown && (
              <div className="absolute top-10 right-[-10px] p-1 w-[7.5rem] shadow-lg bg-white" onMouseLeave={()=>setShowDropdown(false)}>
                <div className="flex flex-col">
                  <button
                    className="font-bold text-black p-1"
                    onClick={()=>{
                      handleSignOut();
                      // dispatch(resetState());
                    }}
                  >
                    {'Sign Out'}
                  </button>
                  
                  
                </div>
              </div>
            )}
            </div>
            </div>
            
        </div>
    </div>
  )
}

export default Header