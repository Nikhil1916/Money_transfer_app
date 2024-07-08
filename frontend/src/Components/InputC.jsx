import React from 'react';
const InputC = ({label , placeholder = "" , isRequired , i , itemRef}) => {
  console.log(itemRef?.current);
  return (
    <div className='flex flex-col p-2'>
        <label htmlFor={label} className='text-sm font-normal'>{label}</label>
        <input onChange={(e)=>{itemRef.current[i] = e.target.value}} className="p-1 pl-2 mt-1 border border-gray-300 rounded-sm text-sm" placeholder={placeholder} name={label}  />
    </div>
  )
}

export default InputC