import axios from "axios";
const url = `${process.env.REACT_APP_API_URL}/groups/`;

export const fetch_user_groups = async (token) => {
  try {
    const data = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    return error.message;
  }
};
