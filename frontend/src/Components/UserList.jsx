import React, { useEffect, useState } from 'react'
import { getUserList } from '../Utils/functions';
import Shimmer from './Schimmer';
import { Link } from 'react-router-dom';

const UserList = ({name}) => {
  const [users, setUsers] = useState([]);
  useEffect(()=>{
    getUsers('')
  },[name]);

  async function getUsers(name) {
    const data = await getUserList(name);
    setUsers(data);
  }
  
  if(users?.length == 0) {
    return (
      <Shimmer/>
    )
  }

  return (
    <div>
      {users?.map((user) => {
        return (
          <div key={user?._id} className="flex justify-between shadow-sm p-2 rounded-md mt-2 mb-2">
            <div className="flex gap-2 items-center">
              <div className="bg-gray-200 p-2 rounded-full">
              {user?.firstName?.substring(0,1)?.toUpperCase()+user?.lastName?.substring(0,1)?.toUpperCase()}
              </div>
              <div>{user?.firstName+ ' '+ user?.lastName}</div>
            </div>
            <Link to={`send?id=${user?._id}`}>
            <div className="bg-black rounded-lg p-2 text-white text-sm self-center cursor-pointer">
              Send Money
            </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default UserList;