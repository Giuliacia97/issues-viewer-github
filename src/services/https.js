import axios from "axios";

const http = () => {
  const request = axios.create({
    baseURL: "https://api.github.com/repos/",
    headers: {
      "Content-Type": "application/json",
      Authorization:"5ad6ef6cfaa2d810e5ff8d0274d250b9cbf0b2ca"
    }
  });

  return {
    request
  };
};

export default http;
