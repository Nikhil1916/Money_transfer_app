import React, { useEffect, useRef } from 'react'

const Header = () => {
  const user = useRef(null);
  useEffect(()=>{
    user.current = JSON.parse(localStorage.getItem('user'));
  },[]);
  return (
    <div className='flex justify-between items-center shadow-lg p-3'>
        <h1 className='font-bold text-lg'>Payments App</h1>
        <div className='flex gap-2 items-center'>
            <p>Hello, User</p>
            <div className='bg-gray-200 p-2 rounded-full'>
                {user?.current?.firstname?.substring(0,1)?.toUpperCase()+user?.current?.lastname?.substring(0,1)?.toUpperCase()}
            </div>
        </div>
    </div>
  )
}

export default Header