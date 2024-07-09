import React from 'react'
import InputC from './InputC'
import UserList  from './UserList'

const UserSearch = () => {
  return (
    <div className='mt-2'>
        <h1 className='font-bold text-lg'>Users</h1>
        <InputC leftPadding={false} placeholder='Search Users...'/>
        <UserList />
    </div>
  )
}

export default UserSearch