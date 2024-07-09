import React, { useEffect, useState } from "react";
import InputC from "./InputC";
import { getUser } from "../Utils/functions";
import { useSearchParams } from "react-router-dom";
const Send = () => {
  const [sendTo, setSendTo] = useState(null);
  const [sendFrom, setSendFrom] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(()=>{
    init();
  },[]);
  async function init() {

  }
  if (!sendTo) {
    return (
      <div className=" w-screen h-screen flex justify-center items-center">
        <div className="animate-pulse space-y-4 w-[30%] h-[30%]">
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
  return (
    <div className="bg-gray-200 w-screen h-screen flex justify-center items-center">
      <div className="bg-white p-4 w-96  shadow-md rounded-lg">
        <h1 className="font-bold text-2xl mb-6 text-center">Send Money</h1>
        <div className="flex gap-2 justify-center items-center">
          <div className="bg-gray-200 p-2 rounded-full mb-2 ">
            {/* {user?.firstname?.substring(0,1)?.toUpperCase()+user?.lastname?.substring(0,1)?.toUpperCase()} */}
            {"UU"}
          </div>
          <div className="pb-2">Nikhil Chawla</div>
        </div>

        <div>
          <p className="pl-2">Amount (in Rs)</p>
          <InputC placeholder="Enter amount" />
          <div className="bg-green-400 text-white ml-2 rounded-md p-1 w-[340px] text-center cursor-pointer">
            Initiate Transfer
          </div>
        </div>
      </div>
    </div>
  );
};

export default Send;
