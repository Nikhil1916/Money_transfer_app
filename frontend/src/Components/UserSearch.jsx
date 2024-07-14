import React, { useState } from 'react'
import InputC from './InputC'
import UserList  from './UserList'

const UserSearch = () => {
  const [userName, setUserName] = useState(null);
  return (
    <div className='mt-2'>
        <h1 className='font-bold text-lg'>Users</h1>
        <InputC leftPadding={false} placeholder='Search Users...' setState={setUserName} />
        <UserList name={userName}  />
    </div>
  )
}

export default UserSearch