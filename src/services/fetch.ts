import axios from "axios";

const FetchApi = async (url: string) => {
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (err) {
    console.log("FetchApi error", err);
    throw err;
  }
};

export default FetchApi;
