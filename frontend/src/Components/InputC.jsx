import React from 'react';
const InputC = ({label , placeholder = "" , leftPadding=true , i , itemRef, type="text", setState, onChangeText}) => {
  console.log(itemRef?.current, onChangeText);
  return (
    <div className={`flex flex-col p-2 ${leftPadding ? '':'pl-0' }`}>
        <label htmlFor={label} className='text-sm font-normal'>{label}</label>
        <input  type={type} onWheel={(e) => e.target.blur()} onChange={(e)=>{
          if(onChangeText) {
            const allowForward = onChangeText(e.target.value, e);
            if(!allowForward) {
              const t = e.target.value;
              e.target.value =  (t.indexOf(".") >= 0) ? (t.substr(0, t.indexOf(".")) + t.substr(t.indexOf("."), 3)) : t;
            }
          }
          if(itemRef) {
            itemRef.current[i] = e.target.value
          } 
          if(setState) {
            setState(e.target.value);
          }
          
          }} className={`number-input p-1 pl-2 mt-1 border border-gray-300 rounded-sm text-sm`} placeholder={placeholder} name={label}  />
    </div>
  )
}

export default InputC