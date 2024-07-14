import { useEffect, useState } from "react";

const useDebounce = (name, fnc) => {
    const [data, setData] = useState(null);
    useEffect(()=>{
    const timeoutId = setTimeout(async()=>{
        const data = await fnc(name);
        setData(data);
      },400);
      return ()=> {
        clearTimeout(timeoutId);
      }
    },[name, fnc])
    return data;
}

export default useDebounce