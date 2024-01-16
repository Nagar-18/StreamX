import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const TMDB_TOKEN = import.meta.env.VITE_APP_TMDB_TOKEN;

const options = {
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhN2NiMjBhNDc3ZTYwNGI2MTY4YmM4ZjNhYmE5MWJlNCIsInN1YiI6IjY1OThjY2JiN2Q1NTA0MDI2MTc5NTc3YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oGjJqhKZeg_sHkhlDdhbFnnGr6YOHBF4kDN626g8DOI",
  },
};

export const fetchDataFromAPI = async (url, params) => {
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3${url}`,
      options
    );
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
