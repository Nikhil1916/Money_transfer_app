import React, { useEffect, useRef, useState } from "react";
import InputC from "./InputC";
import { getUser } from "../Utils/functions";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
const Send = () => {
  const [sendTo, setSendTo] = useState(null);
  const [sendFrom, setSendFrom] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isAccountBalaceLow, setIsAccountBalaceLow] = useState(null);
  const itemRef = useRef([]);
  const navigate = useNavigate();
  useEffect(() => {
    init();
    itemRef.current = [];
  }, []);
  async function init() {
    setSendFrom(await getUser());
    setSendTo(await getUser(searchParams.get("id")));
  }



  if (!sendTo) {
    return (
      <div className=" w-screen h-screen flex justify-center">
        <div className="animate-pulse space-y-4 w-[30%] h-[30%] mt-32">
          {Array(1)
            .fill("")
            .map((_, index) => (
              <div key={index}>
                <div className="h-48 bg-gray-300 rounded w-full"></div>
              </div>
            ))}
        </div>
      </div>
    );
  }

  async function onSubmit() {
    // console.log(itemRef.current[0], sendFrom , sendTo);
    if(itemRef.current[0]>sendFrom?.account?.amount) {
      setIsAccountBalaceLow(sendFrom?.account?.amount);
      return;
    }
    setIsAccountBalaceLow(null);
    await axios.post("http://localhost:3000/api/vi/accounts/transfer",    
    {
      amount: itemRef.current[0],
      to: searchParams.get("id")
    }, 
    {
      headers: {
        Authorization: 'Bearer '+ localStorage.getItem('token')
      }
    }
  );

  // ṭo show success message here
  navigate("/");
  }

  return (
    <div className="bg-gray-200 w-screen h-screen flex justify-center items-center">
      <div className="bg-white p-4 w-96  shadow-md rounded-lg mt-[-90px]">
        <h1 className="font-bold text-2xl mb-6 text-center">Send Money</h1>
        <div className="flex gap-2 justify-center items-center">
          <div className="bg-gray-200 p-2 rounded-full min-w-[38px] flex justify-center items-center mb-2">
            {sendTo?.firstname?.substring(0, 1)?.toUpperCase() +
              sendTo?.lastname?.substring(0, 1)?.toUpperCase()}
          </div>
          <div className="pb-2">
            {sendTo?.firstname + " " + sendTo?.lastname}
          </div>
        </div>

        <div>
          <p className="pl-2">Amount (in Rs)</p>
          <InputC placeholder="Enter amount"  itemRef={itemRef} i={0} type="number" />
          <div onClick={onSubmit} className={`bg-green-400 text-white ml-2 rounded-md p-1 w-[340px] text-center cursor-pointer`}>
            Initiate Transfer
          </div>
          {
            isAccountBalaceLow && <p className="pl-2 text-red-600 font-bold text-sm">Balance is low ${isAccountBalaceLow}</p>
          }
        </div>
      </div>
    </div>
  );
};

export default Send;
