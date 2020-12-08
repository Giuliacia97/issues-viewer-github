import axios from "axios";

const http = () => {
  const request = axios.create({
    baseURL: "https://api.github.com/repos/",
    headers: {
      "Content-Type": "application/json"
    }
  });

  return {
    request
  };
};

export default http;
