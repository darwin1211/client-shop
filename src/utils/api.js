import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL;
const token = localStorage.getItem("token");

const getHeaders = (isAuth = true) => {
  const headers = {
    "Content-Type": "application/json",
  };

  if (isAuth && token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return { headers };
};

// GET
export const fetchDataFromApi = async (url) => {
  try {
    const { data } = await axios.get(`${BASE_URL}${url}`, getHeaders());
    return data;
  } catch (error) {
    console.error("GET Error:", error.response?.data || error.message);
    throw error;
  }
};

// POST
export const postData = async (url, formData, isAuth = true) => {
  try {
    const { data } = await axios.post(`${BASE_URL}${url}`, formData, getHeaders(isAuth));
    return data;
  } catch (error) {
    console.error("POST Error:", error.response?.data || error.message);
    throw error;
  }
};

// PUT
export const editData = async (url, updatedData) => {
  try {
    const { data } = await axios.put(`${BASE_URL}${url}`, updatedData, getHeaders());
    return data;
  } catch (error) {
    console.error("PUT Error:", error.response?.data || error.message);
    throw error;
  }
};

// DELETE
export const deleteData = async (url) => {
  try {
    const { data } = await axios.delete(`${BASE_URL}${url}`, getHeaders());
    return data;
  } catch (error) {
    console.error("DELETE Error:", error.response?.data || error.message);
    throw error;
  }
};

// ✅ IMAGE UPLOAD (multipart/form-data)
export const uploadImage = async (url, formData) => {
  try {
    const { data } = await axios.post(`${BASE_URL}${url}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.error("UPLOAD Error:", error.response?.data || error.message);
    throw error;
  }
};
