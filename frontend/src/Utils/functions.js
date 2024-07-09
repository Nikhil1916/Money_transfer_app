import axios from "axios";
export const getUserList = async (name='') => {
  const data  = await axios.get(
    `http://localhost:3000/api/vi/user/bulk?filter=${name || ""}`,
    {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    }
  );
  console.log(data);
  return data?.data?.users;
};

export const getUser = async () => {
    const data  = await axios.get(
      `http://localhost:3000/api/vi/user`,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      }
    );
    console.log(data);
    // return data?.data?.users;
  };
  
