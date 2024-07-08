import Button from "./Button";
import InputC from "./InputC"
import React, { useEffect, useRef } from 'react';
const Forms = ({heading, subHeading, btnLabel="Sign Up" , inputConfig , valueSet}) => {
  const itemsRef = useRef([]);
  useEffect(() => {
    itemsRef.current = itemsRef.current.slice(0, inputConfig.length);
 }, [inputConfig]);
  const setRef = () => {
    if(itemsRef.current.length>0) {
      valueSet([...itemsRef.current]);
    }
  }
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="bg-white shadow-lg p-6 rounded-lg">
         {heading &&  <h1 className="text-center mb-2 font-bold text-2xl">{heading}</h1>}
         {subHeading && <h2 className="pl-2 mb-2 text-gray-600 text-lg">{subHeading}</h2>}
          {
            inputConfig?.map((input, i)=>{
              return <InputC label={input?.label} placeholder={input?.placeholder} key={i} 
                i={i} itemRef={itemsRef} />
            })
          }
          <Button btnName={btnLabel} onClick={setRef} />
      </div>
    </div>
  )
}

export default Forms