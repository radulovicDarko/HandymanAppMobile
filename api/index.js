import axios from "axios";

export const getEvents = async () => {
  try {
    const data = await axios.get(
      `https://presentation20230416191218.azurewebsites.net/user/all`,
      {
        headers: {
          "Access-Control-Allow-Origin": "*"
        },
      }
    );
    
    return data;
  } catch (error) {
    return null;
  }
};
