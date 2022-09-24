import axios from "axios";
const url = `${process.env.REACT_APP_API_URL}/upload`;

export const uploadImages = async (formData, path, token) => {
  try {
    const { data } = await axios.post(url, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "multipart/form-data",
      },
    });
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};
